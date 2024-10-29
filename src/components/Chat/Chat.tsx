import { Box } from "@mui/material";
import InputMessage from "./components/InputMessage";
import NewChatInfo from "./components/NewChatInfo";

const Chat = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height="calc(100vh - 64px)"
      overflow={"hidden"}
    >
      <Box flexGrow={1} overflow="auto">
        <NewChatInfo />
      </Box>
      <Box position="sticky" bottom={0}>
        <InputMessage />
      </Box>
    </Box>
  );
};

export default Chat;
