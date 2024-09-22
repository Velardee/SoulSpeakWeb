import { create } from 'zustand'
import { AuthActions, authType, User } from '../types/auth'
import { devtools, persist } from 'zustand/middleware'
import { emailSignUp } from '../utils/firebase/firebaseAuth'

export const initialUser: User = {
    uuid: undefined,
    name: undefined,
    lastname: undefined,
    email: undefined,
    photoURL: undefined,
    provider: undefined,
}

const initialState: authType = {
    user: initialUser,
    token: undefined
}

export const useAuthStore = create<authType & AuthActions>()(
    devtools(
        persist(
            (set, get) => ({
                ...initialState,
                //Actions
                setUser(user) {
                    set({ user }, false, 'Auth/setUser')
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
                }
            }),
            { name: "authStore" }
        )
    )
)