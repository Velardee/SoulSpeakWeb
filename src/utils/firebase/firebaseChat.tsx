import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Chat } from "../../types/chat";

export const getChats = async (userUuid: string): Promise<Chat[] | null> => {
  try {
    const q = query(
      collection(db, "chats"),
      where("userUuid", "==", `${userUuid}`)
    );
    const querySnapshot = await getDocs(q);
    const chats = querySnapshot.docs.map((doc) => doc.data() as Chat);

    console.log("Chats", chats);

    return chats;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createChat = async (
  userUuid: string,
  emotion: string
): Promise<Chat | null> => {
  try {
    const query = collection(db, "chats");

    const docRef = await addDoc(query, {
      userUuid,
      emotion,
      createdAt: serverTimestamp(),
    });

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        uuid: docSnap.data().id,
        userUuid: docSnap.data().userUuid,
        emotion: docSnap.data().emotion,
        createdAt: docSnap.data().createdAt.toDate(),
        messages: [],
        firstMessage: undefined,
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
