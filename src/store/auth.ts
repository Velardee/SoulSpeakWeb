import { create } from 'zustand'
import { authType, StoreActions, User } from '../types/auth'
import { devtools, persist } from 'zustand/middleware'
import { emailLogin, emailSignUp, googleSignIn, googleSignUp, logOut } from '../utils/firebase/firebaseAuth'
import { createChat, getChats, sendMessageFirebase } from '../utils/firebase/firebaseChat'
import { format } from '@formkit/tempo'
import { Chat, UserType } from '../types/chat'

export const initialUser: User = {
    uuid: undefined,
    username: undefined,
    email: undefined,
    photoURL: undefined,
    provider: undefined,
}

export const initialSelectedChat: Chat = {
    uuid: undefined,
    emotion: "",
    messages: [],
    userUuid: "",
    firstMessage: undefined,
    createdAt: undefined,
    isToday: false
}

const initialState: authType = {
    user: initialUser,
    chats: [],
    selectedChat: initialSelectedChat,
    token: undefined,
}

export const useAuthStore = create<authType & StoreActions>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,
                //Actions
                reset() {
                    set(initialState)
                },
                setUser(user) {
                    set({ user }, false, 'Auth/setUser')
                },
                setPartialUser(user) {
                    set(() => {
                        return {
                            user: {
                                ...get().user,
                                ...user
                            }
                        }
                    }, false, 'Auth/partialUser')
                },
                setToken: (token: string) => {
                    set((state) => ({
                        ...state,
                        token
                    }), false, "Auth/setToken")
                },
                signUp: async (user) => {
                    const { setUser } = get()
                    const newUser = await emailSignUp(user)

                    if (newUser) {
                        setUser(newUser)
                    } else {
                        throw new Error("Registro fallido");
                    }
                },
                googleRegister: async () => {
                    const { setUser, setToken } = get()

                    const newUser = await googleSignUp()

                    if (newUser) {
                        const { user, token } = newUser;
                        setUser(user)
                        setToken(token)
                    }
                },
                login: async (user) => {
                    const { setUser, setToken } = get()
                    const userLogin = await emailLogin(user)

                    if (userLogin) {
                        const { user, token } = userLogin
                        setUser(user)
                        setToken(token)
                    }
                },
                googleLogin: async () => {
                    const { setUser, setToken, setPartialUser } = get()
                    const userLogin = await googleSignIn()

                    if (userLogin) {
                        const { user, token, photo } = userLogin
                        setUser(user)
                        setPartialUser({
                            photoURL: photo
                        })
                        setToken(token)
                    }
                },
                signOut: async () => {
                    const { reset } = get()

                    await logOut()

                    reset()
                },
                setUserChats(chats) {
                    set((state) => ({
                        ...state,
                        chats: [
                            ...chats
                        ]
                    }), false, 'chats/setChats')
                },
                getUserChats: async () => {
                    const { user, chats, findTodayChat } = get()

                    if (!user) return

                    const newChats = await getChats(user.uuid ?? "")

                    if (newChats && JSON.stringify(newChats) !== JSON.stringify(chats)) {
                        set((state) => ({
                            ...state,
                            chats: [...newChats]
                        }))
                        findTodayChat(newChats ?? [])
                    }

                },
                findTodayChat: (chats) => {
                    const { setTodayChat } = get()
                    //get Today 
                    const date = new Date()
                    const today = format(date, "YYYY-MM-DD", "en")

                    const todayChat = chats.find((chat) => {
                        const { createdAt } = chat;
                        if (createdAt !== undefined) {
                            const firebaseTime = createdAt;
                            const formatedChatDate = format(firebaseTime.toDate(), "YYYY-MM-DD", "en");
                            return today === formatedChatDate;
                        }

                    });

                    if (todayChat) {
                        todayChat.isToday = true;
                        setTodayChat(todayChat)
                    }
                },
                setTodayChat: (chat) => {
                    set(
                        (state) => {
                            return {
                                ...state,
                                selectedChat: chat
                            }
                        }, false, 'chats/SetTodayChat'
                    )
                },
                setPartialSelectedChat(chat) {
                    set(
                        (state) => ({
                            ...state,
                            selectedChat: { ...get().selectedChat, ...chat }
                        }),
                        false, 'chats/setPartialTodayChat'
                    )
                },
                createTodayChat: async (message) => {
                    const { user, setTodayChat, selectedChat } = get()

                    if (!user.uuid || !selectedChat.emotion) {
                        return
                    }

                    const createdChat = await createChat(user.uuid, selectedChat.emotion, message)

                    if (createdChat) {
                        createdChat.isToday = true
                        setTodayChat({
                            ...createdChat
                        })
                    }

                },
                setSelectedChatUuid: (uuid: string) => {
                    set((state) => ({
                        ...state,
                        selectedChatUuid: uuid
                    }), false, "Auth/setSelectedChat")
                },
                sendMessage: async (message) => {
                    const { addMessageTochat, createTodayChat, selectedChat } = get()

                    if (!selectedChat.uuid || selectedChat.uuid !== "") {
                        createTodayChat(message)
                        return
                    }

                    try {
                        const newMessage = await sendMessageFirebase(message, selectedChat.uuid, UserType.user)
                        addMessageTochat(newMessage)
                    } catch (error) {
                        console.log(error)
                    }
                },
                addMessageTochat: (message) => {
                    const { selectedChat, setPartialSelectedChat } = get()

                    //* user only can send messages if selected chat is today chat
                    if (selectedChat.uuid) {
                        setPartialSelectedChat({
                            messages: [
                                ...(selectedChat.messages || []),
                                message
                            ]
                        })
                    }

                },
                getSelectedChat: () => {
                    const { selectedChat, chats } = get()

                    //find selectedChat in chats
                    const findedChat = chats.find((chat) => chat.uuid === selectedChat.uuid)

                    return findedChat
                },
            }),
            { name: "authStore" }
        )
    )
)