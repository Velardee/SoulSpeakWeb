import { Timestamp } from "firebase/firestore"

export interface Chat {
    uuid: string | undefined
    emotion: string | undefined
    userUuid: string | undefined
    messages: Mesagge[] | []
    firstMessage: string | undefined
    createdAt: Timestamp | undefined
}

export type ChatActions = {
    setUserChats: (chats: Chat[]) => void
    getUserChats: () => Promise<void>
    findTodayChat: (chats: Chat[]) => void
    setTodayChat: (chat: Chat) => void
    setPartialTodayChat: (chat: Partial<Chat>) => void
}

export type Mesagge = {
    uuid: string
    text: string
    createdAt: unknown
}