export interface Login {
    email: string,
    password: string,
}

export interface Register {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export type authType = {
    user: User,
    token: string | undefined
}

export type AuthActions = {
    reset: () => void
    setUser: (user: User) => void
    setToken: (token: string) => void
    signUp: (user: Register) => Promise<void>
    googleRegister: () => Promise<void>
    login: (user: Login) => Promise<void>
    googleLogin: () => Promise<void>
}

export type User = {
    uuid: string | undefined,
    username: string | undefined,
    email: string | undefined,
    photoURL?: string | undefined,
    provider: string | undefined
}

//this will be used in login and google register
export type UserLogged = {
    user: User,
    token: string
}

export type FirebaseAuthErrorCode =
    | 'auth/email-already-in-use'
    | 'auth/invalid-email'
    | 'auth/invalid-credential'
    | 'auth/popup-closed-by-user'
    ;
