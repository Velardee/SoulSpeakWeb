import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";

interface EmotionCardProps {
  title: string;
  icon: ReactNode;
}

const EmotionCard: FunctionComponent<EmotionCardProps> = ({ title, icon }) => {
  const theme = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} >
      <Card
        sx={{
          [theme.breakpoints.down("md")]: {
            minWidth: "180px",
          },
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
            <div>{icon}</div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmotionCard;
