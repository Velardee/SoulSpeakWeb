import Grid from "@mui/material/Grid2";
import Chat from "../../components/Chat";
import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";

const Home = () => {

  const { user, getUserChats } = useAuthStore();

  useEffect(() => {
    if (user) {
      getUserChats()
    }
  },[user, getUserChats])

  return (
    <Grid alignItems="center" justifyContent="center" container spacing={1} paddingTop={2}>
      <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 5 }}>
        <Chat />
      </Grid>
    </Grid>
  );
};

export default Home;
