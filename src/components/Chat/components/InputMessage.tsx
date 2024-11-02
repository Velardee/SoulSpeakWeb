import { ChangeEvent, useState } from "react";

import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useAuthStore } from "../../../store/auth";
import { enqueueSnackbar } from "notistack";

const InputMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const todayChat = useAuthStore((state) => state.todayChat);

  const sendMessage = useAuthStore((state) => state.sendMessage);

  const isTodayChatEmpty = todayChat.emotion === "";

  const handleChangeMesagge = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSendMessage = () => {
    setIsLoading(true);
    sendMessage(message)
      .then(() => {
        setIsLoading(false);
        setMessage("");
      })
      .catch((error) => {
        enqueueSnackbar(error || "Error al enviar el mensaje", {
          variant: "error",
          autoHideDuration: 2000,
          preventDuplicate: true,
        });
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Tooltip
      title={`${
        isTodayChatEmpty ? "Selecciona una emoción para continuar" : ""
      }`}
      arrow
      followCursor
    >
      <TextField
        id="outlined-textarea"
        variant="outlined"
        label="Mensaje"
        multiline
        maxRows={5}
        fullWidth
        disabled={isTodayChatEmpty}
        onChange={handleChangeMesagge}
        value={message}
        onKeyDown={handleKeyDown}
        sx={{
          ".MuiOutlinedInput-root": {
            borderRadius: 5,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={handleSendMessage}
                disabled={isTodayChatEmpty}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <SendOutlinedIcon sx={{ color: "#C0C0C0", cursor: "pointer" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Tooltip>
  );
};

export default InputMessage;
