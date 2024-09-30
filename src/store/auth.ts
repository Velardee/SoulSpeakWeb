import { create } from 'zustand'
import { authType, StoreActions, User } from '../types/auth'
import { devtools, persist } from 'zustand/middleware'
import { emailLogin, emailSignUp, googleSignIn, googleSignUp, logOut } from '../utils/firebase/firebaseAuth'
import { getChats } from '../utils/firebase/firebaseChat'

export const initialUser: User = {
    uuid: undefined,
    username: undefined,
    email: undefined,
    photoURL: undefined,
    provider: undefined,
}

const initialState: authType = {
    user: initialUser,
    chats: [],
    todayChat: undefined,
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
                    set({ user: { ...get().user, ...user } }, false, 'Auth/partialUser')
                },
                setToken: (token: string) => {
                    set({ token }, false, 'Auth/setToken')
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
                    set({
                        chats: chats
                    }, false, 'chats/setChats')
                },
                getUserChats: async () => {
                    const { user, setUserChats, chats } = get()

                    if (!user) return

                    const newChats = await getChats(user.uuid ?? "")

                    if (newChats && JSON.stringify(newChats) !== JSON.stringify(chats)) {
                        setUserChats(newChats);
                    }
                },
                setTodayChat: (chat) => {
                    set({
                        todayChat: chat
                    }, false, 'chats/SetTodayChat')
                },
            }),
            { name: "authStore" }
        )
    )
)