// import Grid from "@mui/material/Grid2";
import Chat from "../../components/Chat";
import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import Grid from "@mui/material/Grid2";

const Home = () => {
  const getUserChats = useAuthStore((state) => state.getUserChats);

//TODO: Cuando la pagina se refresca el selectedChat se pierde

  useEffect(() => {
    getUserChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={0} justifyContent={"center"}>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 6 }}>
        <Chat />
      </Grid>
    </Grid>
  );
};

export default Home;
