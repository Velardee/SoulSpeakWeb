import Grid from "@mui/material/Grid2";
import LoginForm from "../../components/Login/LoginForm";
import { Card, CardContent } from "@mui/material";

const Login = () => {
  return (
    <Grid
      height={"100vh"}
      alignItems="center"
      justifyContent="center"
      container
      spacing={1}
    >
      <Grid size={{ xs: 10, sm: 8, md: 6, lg: 4, xl: 3 }}>
        <Card sx={{ borderRadius: "15px" }}>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
