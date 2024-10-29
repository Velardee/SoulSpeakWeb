// import Grid from "@mui/material/Grid2";
import Chat from "../../components/Chat";
import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import { Box } from "@mui/material";

const Home = () => {
  const getUserChats = useAuthStore((state) => state.getUserChats);

  useEffect(() => {
    getUserChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
      <Box maxWidth={800}>
        <Chat />
      </Box>
    </Box>
  );
};

export default Home;
