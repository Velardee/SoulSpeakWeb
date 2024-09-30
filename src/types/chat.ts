export interface Chat {
    uuid: string | undefined
    mood: string | undefined
    userUuid: string | undefined
    messages: Mesagge[] | []
    firstMessage: string | undefined
    createdAt: unknown | undefined
}

export type ChatActions = {
    setUserChats: (chats: Chat[]) => void
    getUserChats: () => Promise<void>
    setTodayChat: (chat: Chat) => void
}

export type Mesagge = {
    uuid: string
    text: string
    createdAt: unknown
}