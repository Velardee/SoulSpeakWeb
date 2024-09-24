import { Avatar, Button, CircularProgress, Typography } from "@mui/material";

import GoogleLogo from "../assets/Icons/googleLogo.svg";
import { FunctionComponent, useState } from "react";
import { useAuthStore } from "../store/auth";

interface GoogleButtonProps {
  type: "Login" | "Register";
}

const GoogleButton: FunctionComponent<GoogleButtonProps> = ({ type }) => {
  const { googleRegister, googleLogin } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    googleLogin()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const handleClickRegister = () => {
    setIsLoading(true);
    googleRegister()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      disabled={isLoading}
      onClick={() => {
        if (type === "Login") {
          handleGoogleLogin();
        }
        if (type === "Register") {
          handleClickRegister();
        }
      }}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "25px",
        color: "#000",
        textTransform: "none",
        height: "50px",
      }}
      startIcon={
        isLoading ? (
          <CircularProgress sx={{ color: "#000" }} size={20} />
        ) : (
          <Avatar sx={{ width: "30px", height: "30px" }} src={GoogleLogo} />
        )
      }
      fullWidth
    >
      <Typography
        variant="subtitle1"
        color="initial"
        sx={{ fontWeight: "600" }}
      >
        Continuar con Google
      </Typography>
    </Button>
  );
};

export default GoogleButton;
