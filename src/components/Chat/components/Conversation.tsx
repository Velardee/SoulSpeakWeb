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
    <Box width="100%" paddingTop={1}>
      {messages.map((message, index) => {
        if (message.sendedBy === UserType.user) {
          return (
            <section style={{ marginBottom: "30px" }} key={index}>
              <CardMessage message={message.message} from={UserType.user} />
            </section>
          );
        }
        if (message.sendedBy === UserType.ia) {
          return (
            <section style={{ marginBottom: "30px" }} key={index}>
              <CardMessage message={message.message} from={UserType.ia} />
            </section>
          );
        }
      })}
    </Box>
  );
};

export default Conversation;
