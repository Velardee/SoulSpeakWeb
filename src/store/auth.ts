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

export const initialTodayChat: Chat = {
    uuid: undefined,
    emotion: "",
    messages: [],
    userUuid: "",
    firstMessage: undefined,
    createdAt: undefined
}

const initialState: authType = {
    user: initialUser,
    chats: [],
    todayChat: initialTodayChat,
    selectedChatUuid: "",
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
                    const { setTodayChat, setSelectedChatUuid } = get()
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
                        setTodayChat(todayChat)
                        setSelectedChatUuid(todayChat.uuid ?? "")
                    }
                },
                setTodayChat: (chat) => {
                    set(
                        (state) => {
                            return {
                                ...state,
                                todayChat: chat
                            }
                        }, false, 'chats/SetTodayChat'
                    )
                },
                setPartialTodayChat(chat) {
                    set(
                        (state) => ({
                            ...state,
                            todayChat: { ...get().todayChat, ...chat }
                        }),
                        false, 'chats/setPartialTodayChat'
                    )
                },
                createTodayChat: async (message) => {
                    const { user, setTodayChat, todayChat, setSelectedChatUuid } = get()

                    if (!user.uuid || !todayChat.emotion) {
                        return
                    }

                    const createdChat = await createChat(user.uuid, todayChat.emotion, message)

                    if (createdChat) {
                        setTodayChat({
                            ...createdChat
                        })
                        setSelectedChatUuid(createdChat.uuid ?? "")
                    }

                },
                setSelectedChatUuid: (uuid: string) => {
                    set((state) => ({
                        ...state,
                        selectedChatUuid: uuid
                    }), false, "Auth/setSelectedChat")
                },
                sendMessage: async (message) => {
                    const { selectedChatUuid, addMessageTochat, createTodayChat } = get()

                    if (!selectedChatUuid) {
                        createTodayChat(message)
                        return
                    }

                    try {
                        const newMessage = await sendMessageFirebase(message, selectedChatUuid, UserType.user)
                        addMessageTochat(newMessage)
                    } catch (error) {
                        console.log(error)
                    }
                },
                addMessageTochat: (message) => {
                    const { todayChat, selectedChatUuid, setPartialTodayChat } = get()

                    //* user only can send messages if selected chat is today chat
                    if (selectedChatUuid === todayChat.uuid) {
                        setPartialTodayChat({
                            messages: [
                                ...(todayChat.messages || []),
                                message
                            ]
                        })
                    }

                },
                getSelectedChat: () => {
                    const { selectedChatUuid, chats } = get()

                    //find selectedChat in chats
                    const findedChat = chats.find((chat) => chat.uuid === selectedChatUuid)

                    return findedChat
                },
            }),
            { name: "authStore" }
        )
    )
)