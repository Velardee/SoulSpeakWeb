import { Box } from "@mui/material";
import { Message, UserType } from "../../../types/chat";
import { FunctionComponent, useEffect } from "react";
import CardMessage from "./CardMessage";

interface ConversationProps {
  messages: Message[];
}

const Conversation: FunctionComponent<ConversationProps> = ({ messages }) => {
  useEffect(() => {}, [messages]);

  return (
    <Box width="100%">
      {messages.map((message, index) => {
        if (message.sendedBy === UserType.user) {
          return (
            <Box key={index}>
              <CardMessage message={message.message} from={UserType.user} />
            </Box>
          );
        }
        if (message.sendedBy === UserType.ia) {
          return (
            <Box key={index}>
              <CardMessage message={message.message} from={UserType.ia} />
            </Box>
          );
        }
      })}
    </Box>
  );
};

export default Conversation;
