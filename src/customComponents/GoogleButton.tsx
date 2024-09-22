import { Avatar, Button, Typography } from "@mui/material";

import GoogleLogo from "../assets/Icons/googleLogo.svg";

const GoogleButton = () => {
  return (
    <Button
      sx={{
        backgroundColor: "#fff",
        borderRadius: "25px",
        color: "#000",
        textTransform: "none",
        height: "50px"
      }}
      startIcon={<Avatar sx={{ width: "30px", height: "30px" }} src={GoogleLogo} />}
      fullWidth
    >
      <Typography variant="subtitle1" color="initial" sx={{ fontWeight: "600" }}>
        Continuar con Google
      </Typography>
    </Button>
  );
};

export default GoogleButton;
