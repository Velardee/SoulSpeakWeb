import { useState } from "react";
import {
  Box,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { VisibilityOffOutlined } from "@mui/icons-material";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";

import Logo from "../../assets/logo";
import LoadingButton from "../../customComponents/Loadingbutton";
import GoogleButton from "../../customComponents/GoogleButton";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { Register } from "../../types/auth";
import { enqueueSnackbar } from "notistack";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    username: yup.string().required("Tu nombre es requerido"),
    email: yup
      .string()
      .email("Ingresa un correo electrónico válido.")
      .required("El correo electrónico es obligatorio."),
    password: yup
      .string()
      .min(6, "La contraseña debe contener al menos 6 caracteres.")
      .required("La contraseña es obligatoria."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Las contraseña no coincide"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });

  const { signUp } = useAuthStore();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleRegister = (data: unknown) => {
    setIsLoading(true);
    signUp(data as Register)
      .then(() => {
        setIsLoading(false);
        reset();
        enqueueSnackbar("Registro exitoso", {
          variant: "success",
          autoHideDuration: 1500,
          preventDuplicate: true,
        });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Grid2
      container
      direction="column"
      alignContent="center"
      justifyContent="center"
      spacing={3}
    >
      <Grid2 size={{ xs: 10 }}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          paddingY={3}
        >
          <Logo />
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 10 }}>
        <form>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="Nombre de usuario"
              variant="outlined"
              autoComplete="off"
              type="email"
              sx={{
                ".MuiOutlinedInput-root": {
                  borderRadius: 5,
                },
              }}
              {...register("username")}
              error={errors.username && true}
              helperText={errors.username ? errors.username.message : ""}
            />
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
            <TextField
              fullWidth
              label="Confirmar contraseña"
              variant="outlined"
              autoComplete="off"
              type={showConfirmPassword ? "text" : "password"}
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
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffOutlined sx={{ color: "#C0C0C0" }} />
                      ) : (
                        <VisibilityOutlined sx={{ color: "#C0C0C0" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("confirmPassword")}
              error={errors.confirmPassword && true}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1} paddingTop={2}>
            <LoadingButton
              color="#0089dc"
              text="Registrarse"
              loading={isLoading}
              onClick={handleSubmit(handleRegister)}
            />
            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Lines />
              <Typography variant="subtitle1" sx={{ color: "#C0C0C0" }}>
                O
              </Typography>
              <Lines />
            </Box>
            <GoogleButton type="Register" />
            <Link
              to={"/"}
              style={{ textDecorationColor: "white", color: "white" }}
            >
              <Typography variant="subtitle1" textAlign="center" paddingY={1}>
                ¿Ya tienes cuenta? <b>Inicia sesion</b>
              </Typography>
            </Link>
          </Box>
        </form>
      </Grid2>
    </Grid2>
  );
};

const Lines = () => {
  return (
    <div
      style={{ height: "0.5px", borderTop: "1px solid #C0C0C0", width: "100%" }}
    ></div>
  );
};

export default RegisterForm;
