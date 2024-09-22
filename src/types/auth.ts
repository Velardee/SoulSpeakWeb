export interface Login {
    email: string,
    password: string,
}

export interface Register {
    name: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export type authType = {
    user: User,
    token?: string
}

export type AuthActions = {
    setUser: (user: User) => void
    setToken: (token: string) => void
    signUp: (user: Register) => Promise<void>
}

export type User = {
    uuid: string | undefined,
    name: string | undefined,
    lastname: string | undefined,
    email: string | undefined,
    photoURL?: string | undefined,
    provider: string | undefined
}

export type FirebaseAuthErrorCode =
    | 'auth/email-already-in-use'
    | 'auth/invalid-email'
    ;
