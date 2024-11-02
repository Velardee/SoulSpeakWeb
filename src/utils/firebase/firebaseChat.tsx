import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Chat, Message, UserType } from "../../types/chat";

export const getChats = async (userUuid: string): Promise<Chat[] | null> => {
  try {
    const q = query(
      collection(db, "chats"),
      where("userUuid", "==", `${userUuid}`)
    );
    const querySnapshot = await getDocs(q);
    const chatsWithMessages = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const chatData = doc.data() as Chat;

        // Obtener la subcolección "messages" de cada chat
        const messagesSnapshot = await getDocs(collection(doc.ref, "messages"));
        const messages = messagesSnapshot.docs.map(
          (messageDoc) => messageDoc.data() as Message
        );

        return {
          ...chatData,
          messages, // Agrega los mensajes al chat
        };
      })
    );

    console.log("Chats with messages", chatsWithMessages);

    return chatsWithMessages;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createChat = async (
  userUuid: string,
  emotion: string,
  message: string
): Promise<Chat | null> => {
  try {
    const query = collection(db, "chats");

    const docRef = await addDoc(query, {
      userUuid,
      emotion,
      createdAt: serverTimestamp(),
      firstMessage: message,
    });

    await updateDoc(docRef, { chatUuid: docRef.id });

    const messageRef = collection(db, "chats", docRef.id, "messages");

    await addDoc(messageRef, {
      message: message,
      createdAt: serverTimestamp(),
      sendedBy: "USER",
    });

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Obtener mensajes de la subcolección "messages"
      const messagesSnapshot = await getDocs(messageRef);
      const messages = messagesSnapshot.docs.map((msgDoc) => ({
        ...(msgDoc.data() as Message),
      }));

      return {
        uuid: docRef.id,
        userUuid: docSnap.data().userUuid,
        emotion: docSnap.data().emotion,
        firstMessage: message,
        createdAt: docSnap.data().createdAt.toDate(),
        messages: messages,
      };
    } else {
      console.log("No se pudo crear el chat");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const sendMessageFirebase = async (
  message: string,
  chatUuid: string,
  sendedBy: UserType
): Promise<Message> => {
  try {
    //TODO[]: create message type and add enum to sendedBy

    const chatRef = collection(db, "chats", chatUuid, "messages");

    await addDoc(chatRef, {
      message: message,
      createdAt: serverTimestamp(),
      sendedBy: sendedBy,
    });

    return {
      message,
      sendedBy,
      createdAt: new Date(),
    };
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo enviar el mensaje a Firebase.");
  }
};
