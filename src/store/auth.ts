import { create } from 'zustand'
import { authType, StoreActions, User } from '../types/auth'
import { devtools, persist } from 'zustand/middleware'
import { emailLogin, emailSignUp, googleSignIn, googleSignUp, logOut } from '../utils/firebase/firebaseAuth'
import { createChat, getChats } from '../utils/firebase/firebaseChat'
import { format } from '@formkit/tempo'
import { Chat } from '../types/chat'

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
                        setTodayChat(todayChat)
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
                createTodayChat: async (emotion) => {
                    const { user, setTodayChat } = get()

                    const createdChat = await createChat(user.uuid ?? "", emotion)

                    if (createdChat) {
                        setTodayChat({
                            ...createdChat
                        })
                    }

                },
            }),
            { name: "authStore" }
        )
    )
)