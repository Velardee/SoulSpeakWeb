import { Box } from "@mui/material";
import InputMessage from "./components/InputMessage";
import NewChatInfo from "./components/NewChatInfo";
import { useAuthStore } from "../../store/auth";
import Conversation from "./components/Conversation";

const Chat = () => {
  const todayChat = useAuthStore((state) => state.todayChat);
  const selectedChatUuid = useAuthStore((state) => state.selectedChatUuid);


  //* primer idea para el chat
  function renderChat() {
    if (
      (todayChat.uuid === selectedChatUuid &&
        todayChat.messages.length === 0) ||
      selectedChatUuid == ""
    ) {
      return <NewChatInfo />;
    }

    if (todayChat.uuid === selectedChatUuid && todayChat.messages.length > 0) {
      return <div>{<Conversation messages={todayChat.messages} />}</div>;
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
        width: "100%"
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
