import { Avatar, Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useAuthStore } from "../../../store/auth";
import { UserType } from "../../../types/chat";


interface CardMessageProps {
  message: string;
  from: UserType;
}

const CardMessage: FunctionComponent<CardMessageProps> = ({ message, from }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <Box
      display={"flex"}
      flexDirection={from == UserType.user ? "row" : "row-reverse"}
      justifyContent={from == UserType.user ? "flex-end" : "flex-end"}
      gap={3}
      sx={{ width: "100%" }}
    >
      <Box
        sx={{
          backgroundColor: "#1E1F21",
          borderRadius: "12px",
          padding: "15px",
          maxWidth: "70%",
        }}
      >
        <Typography variant="body1" sx={{ textWrap: "wrap", color: "white" }}>
          {message}
        </Typography>
      </Box>
      <div>
        <Avatar
          sx={{ width: 40, height: 40 }}
          alt={`${user.username}`}
          src={user.photoURL}
        />
      </div>
    </Box>
  );
};

export default CardMessage;
