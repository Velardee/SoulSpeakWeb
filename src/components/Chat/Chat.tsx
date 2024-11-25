import { Box } from "@mui/material";
import InputMessage from "./components/InputMessage";
import NewChatInfo from "./components/NewChatInfo";
import { useAuthStore } from "../../store/auth";
import Conversation from "./components/Conversation";
import { useEffect } from "react";

const Chat = () => {
  const selectedChat = useAuthStore((state) => state.selectedChat);

  useEffect(() => {
    console.log("selected", selectedChat);
  }, [selectedChat]);

  useEffect(() => {
    renderChat()
  }, []);

  //* primer idea para el chat
  function renderChat() {
    if (selectedChat.messages.length === 0) {
      return <NewChatInfo />;
    }

    if (selectedChat.messages.length > 0) {
      return <div>{<Conversation messages={selectedChat.messages} />}</div>;
    }
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height="calc(100vh - 64px)"
      overflow={"hidden"}
      paddingBottom={"30px"}
      sx={{
        width: "100%",
      }}
    >
      <Box flexGrow={1} overflow="auto">
        {renderChat()}
      </Box>
      <Box position="sticky" bottom={0}>
        <InputMessage />
      </Box>
    </Box>
  );
};

export default Chat;
