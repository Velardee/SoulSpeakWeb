import { Box } from "@mui/material";
import InputMessage from "./components/InputMessage";
import NewChatInfo from "./components/NewChatInfo";

const Chat = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} height="80vh">
      <Box flexGrow={1}>
        <NewChatInfo />
      </Box>
      <Box>
        <InputMessage />
      </Box>
    </Box>
  );
};

export default Chat;
