import { useState } from "react";

import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const InputMessage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    setIsLoading(true);
    console.log("send message");
  };

  return (
    <TextField
      id="outlined-textarea"
      variant="outlined"
      label="Mensaje"
      multiline
      maxRows={5}
      fullWidth
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
  );
};

export default InputMessage;
