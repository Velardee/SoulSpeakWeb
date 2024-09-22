import Grid from "@mui/material/Grid2";
import { Card, CardContent } from "@mui/material";
import RegisterForm from "../../components/Register/RegisterForm";

const Register = () => {
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
            <RegisterForm />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;
