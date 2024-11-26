import { Timestamp } from "firebase/firestore"

export interface Chat {
    uuid: string | undefined
    emotion: string | undefined
    userUuid: string | undefined
    messages: Message[] | []
    firstMessage: string | undefined
    createdAt: Timestamp | undefined
    isToday?: boolean
}

export type ChatActions = {
    setUserChats: (chats: Chat[]) => void
    getUserChats: () => Promise<void>
    findTodayChat: (chats: Chat[]) => void
    setTodayChat: (chat: Chat) => void
    setPartialSelectedChat: (chat: Partial<Chat>) => void
    createTodayChat: (message: string) => Promise<void>
    setSelectedChatUuid: (uuid: string) => void
    sendMessage: (message: string, user: UserType) => Promise<void>
    addMessageTochat: (message: Message) => void
    getSelectedChat: () => Chat | undefined
    getAIResponse: (message: string) => void
}

export type Message = {
    uuid?: string
    message: string
    createdAt: unknown
    sendedBy: UserType
}

export enum UserType {
    user = "USER",
    ia = "IA"
}