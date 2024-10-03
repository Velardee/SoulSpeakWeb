import { useState } from "react";

import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useAuthStore } from "../../../store/auth";

const InputMessage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const todayChat  = useAuthStore(state => state.todayChat);

  const isTodayChatEmpty = Object.keys(todayChat).length === 0;

  const handleSendMessage = () => {
    setIsLoading(true);
  };

  return (
    <Tooltip
      title={`${
        !isTodayChatEmpty ? "Selecciona una emoción para continuar" : ""
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
        disabled={!isTodayChatEmpty}
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
                disabled={!isTodayChatEmpty}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <SendOutlinedIcon sx={{ color: "#C0C0C0" }} />
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
