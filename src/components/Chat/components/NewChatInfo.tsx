import EmotionCard from "../../../customComponents/EmotionCard";
import Grid from "@mui/material/Grid2";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAuthStore } from "../../../store/auth";
import { motion } from "framer-motion";

import Positive from "../../../assets/Icons/Positive";
import Negative from "../../../assets/Icons/Negative";
import Neutral from "../../../assets/Icons/Neutral";
import Other from "../../../assets/Icons/Other";
import { useState } from "react";
import ModalEmotions from "../../../customComponents/ModalEmotions";
import { useShallow } from "zustand/shallow";

const NewChatInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");

  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const text = "¿Comó te sientes el dia de hoy?".split(" ");

  const cardActions = [
    {
      title: "Positivo",
      icon: <Positive width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
      type: "POSITIVE",
    },
    {
      title: "Negativo",
      icon: <Negative width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
      type: "NEGATIVE",
    },
    {
      title: "Neutral",
      icon: <Neutral width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
      type: "NEUTRAL",
    },
    {
      title: "Otro",
      icon: <Other width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
      type: "OTHER",
    },
  ];

  const handleSetModalType = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // setModalType("");
    setIsModalOpen(false);
  };

  return (
    <Grid container justifyContent={"center"} spacing={2} paddingY={2}>
      <Grid size={{ xs: 12 }}>
        <Box paddingBottom={1}>
          <Typography
            variant="h3"
            sx={{
              [theme.breakpoints.down("md")]: {
                fontSize: "22px",
              },
            }}
          >
            Hola {user.username}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              [theme.breakpoints.down("md")]: {
                fontSize: "22px",
              },
            }}
          >
            {text.map((el, index) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: index / 10,
                }}
                key={index}
              >
                {el}{" "}
              </motion.span>
            ))}
          </Typography>
        </Box>
      </Grid>
      {cardActions.map((action, index) => (
        <Grid
          key={index}
          display={"flex"}
          justifyContent={"center"}
          size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}
        >
          <EmotionCard
            title={action.title}
            icon={action.icon}
            onClick={() => handleSetModalType(action.type)}
          />
        </Grid>
      ))}
      <ModalEmotions
        open={isModalOpen}
        onClose={handleCloseModal}
        type={modalType}
      />
    </Grid>
  );
};

export default NewChatInfo;
