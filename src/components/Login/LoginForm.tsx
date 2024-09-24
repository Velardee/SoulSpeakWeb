import { useState } from "react";

import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

import Logo from "../../assets/logo";
import LoadingButton from "../../customComponents/Loadingbutton";
import GoogleButton from "../../customComponents/GoogleButton";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Login } from "../../types/auth";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    email: yup
      .string()
      .email("Ingresa un correo electrónico válido.")
      .required("El correo electrónico es obligatorio."),
    password: yup
      .string()
      .min(6, "La contraseña debe contener al menos 6 caracteres.")
      .required("La contraseña es obligatoria."),
  });

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { login } = useAuthStore();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = (data: Login) => {
    setIsLoading(true);
    login(data)
      .then(() => {
        // reset()
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      justifyContent="center"
      spacing={3}
    >
      <Grid size={{ xs: 10 }}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          paddingY={3}
        >
          <Logo />
        </Box>
      </Grid>
      <Grid size={{ xs: 10 }}>
        <form>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="Correo electronico"
              variant="outlined"
              autoComplete="off"
              type="email"
              sx={{
                ".MuiOutlinedInput-root": {
                  borderRadius: 5,
                },
              }}
              {...register("email")}
              error={errors.email && true}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              fullWidth
              label="Contraseña"
              variant="outlined"
              autoComplete="off"
              type={showPassword ? "text" : "password"}
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
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined sx={{ color: "#C0C0C0" }} />
                      ) : (
                        <VisibilityOutlined sx={{ color: "#C0C0C0" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password")}
              error={errors.password && true}
              helperText={errors.password ? errors.password.message : ""}
            />
            <Typography variant="subtitle1">
              ¿Olvidaste tu contraseña?
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={1} paddingTop={2}>
            <LoadingButton
              color="#0089dc"
              text="Iniciar sesion"
              loading={isLoading}
              onClick={handleSubmit(handleLogin)}
            />
            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Lines />
              <Typography variant="subtitle1" sx={{ color: "#C0C0C0" }}>
                O
              </Typography>
              <Lines />
            </Box>
            <GoogleButton type="Login" />
            <Link
              to={"/Register"}
              style={{ textDecorationColor: "white", color: "white" }}
            >
              <Typography variant="subtitle1" textAlign="center" paddingY={1}>
                ¿Aún no tienes cuenta? <b>Registrate</b>
              </Typography>
            </Link>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

const Lines = () => {
  return (
    <div
      style={{ height: "0.5px", borderTop: "1px solid #C0C0C0", width: "100%" }}
    ></div>
  );
};

export default LoginForm;
