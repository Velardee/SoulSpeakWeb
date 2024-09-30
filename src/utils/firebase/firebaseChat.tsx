import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
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
