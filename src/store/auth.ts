import { create } from 'zustand'
import { AuthActions, authType, User } from '../types/auth'
import { devtools, persist } from 'zustand/middleware'
import { emailLogin, emailSignUp, googleSignIn, googleSignUp, logOut } from '../utils/firebase/firebaseAuth'

export const initialUser: User = {
    uuid: undefined,
    username: undefined,
    email: undefined,
    photoURL: undefined,
    provider: undefined,
}

const initialState: authType = {
    user: initialUser,
    token: undefined,
}

export const useAuthStore = create<authType & AuthActions>()(
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
            }),
            { name: "authStore" }
        )
    )
)