import { Button, CircularProgress } from "@mui/material";
import { FunctionComponent } from "react";

interface LoadingButtonProps {
  text: string;
  color: string;
  loading: boolean;
  onClick: () => void;
}

const LoadingButton: FunctionComponent<LoadingButtonProps> = ({
  text,
  color,
  loading,
  onClick,
}) => {
  return (
    <Button
      disabled={loading}
      sx={{
        backgroundColor: `${color}`,
        borderRadius: "25px",
        color: "#fff",
        textTransform: "none",
        height: "50px",
      }}
      onClick={onClick}
      startIcon={
        loading ? <CircularProgress color="inherit" size={20} /> : null
      }
      fullWidth
    >
      {text}
    </Button>
  );
};

export default LoadingButton;
