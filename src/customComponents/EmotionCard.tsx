import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";
// import { useAuthStore } from "../store/auth";

interface EmotionCardProps {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
  selectedEmotion?: {
    title: string,
    icon: ReactNode,
  } | null
}

const EmotionCard: FunctionComponent<EmotionCardProps> = ({
  title,
  icon,
  onClick,
  selectedEmotion,
}) => {
  const theme = useTheme();

  return (
    <motion.div
      onClick={() => {
        if (onClick) onClick();
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Card
        sx={{
          [theme.breakpoints.down("md")]: {
            minWidth: "180px",
          },
          backgroundColor: `${selectedEmotion && selectedEmotion.title == title && "#313538"}`,
          minWidth: "150px",
          maxWidth: "170px",
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              gap: 2,
            }}
          >
            <Typography variant="h6">{title}</Typography>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: 0.1
              }}
            >
              {icon}
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmotionCard;
