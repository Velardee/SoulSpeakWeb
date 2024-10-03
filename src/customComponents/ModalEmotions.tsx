import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/system";
import EmotionCard from "./EmotionCard";
import Happy from "../assets/Icons/Happy";
import Motivated from "../assets/Icons/Motivated";
import Excited from "../assets/Icons/Excited";
import Proud from "../assets/Icons/Proud";
import Calm from "../assets/Icons/Calm";
import Grateful from "../assets/Icons/Grateful";
import Sad from "../assets/Icons/negative/Sad";
import Frustrated from "../assets/Icons/negative/Frustrated";
import Stressed from "../assets/Icons/negative/Stressed";
import Anxious from "../assets/Icons/negative/Anxious";
import Angry from "../assets/Icons/negative/Angry";
import Tired from "../assets/Icons/negative/Tired";
import Confused from "../assets/Icons/mixed/Confused";
import Concerned from "../assets/Icons/mixed/Concerned";
import Nostalgic from "../assets/Icons/mixed/Nostalgic";
import NotSure from "../assets/Icons/mixed/NotSure";
import Neutral from "../assets/Icons/Neutral";
import Pensive from "../assets/Icons/neutral/Pensive";
import Calmed from "../assets/Icons/neutral/Calmed";
import { useAuthStore } from "../store/auth";
import { useShallow } from "zustand/shallow";

interface ModalEmotionsProps {
  open: boolean;
  type: string;
  onClose: () => void;
}

type Emotion = {
  title: string;
  icon: ReactNode;
};

const ModalEmotions: FunctionComponent<ModalEmotionsProps> = ({
  open,
  type,
  onClose,
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const setPartialTodayChat = useAuthStore(
    useShallow(
      (state) => state.setPartialTodayChat
    )
  );

  const handleSelectEmotion = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    console.log(emotion);
  };

  const handleConfirmSelection = () => {
    if (selectedEmotion) {
      setPartialTodayChat({
       emotion: selectedEmotion.title
      });
      onClose();
    }
  };

  useEffect(() => {
    if (!open) {
      setSelectedEmotion(null);
    }
  }, [open]);

  const positiveEmotions = [
    {
      title: "Feliz",
      icon: <Happy width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Agradecido",
      icon: <Grateful width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Motivado",
      icon: (
        <Motivated width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />
      ),
    },
    {
      title: "Tranquilo",
      icon: <Calm width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Emocionado",
      icon: <Excited width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Orgulloso",
      icon: <Proud width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
  ];

  const negativeEmotions = [
    {
      title: "Triste",
      icon: <Sad width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Frustrado",
      icon: (
        <Frustrated width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />
      ),
    },
    {
      title: "Ansioso",
      icon: <Anxious width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Estresado",
      icon: <Stressed width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Enojado",
      icon: <Angry width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Cansado",
      icon: <Tired width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
  ];

  const neutralEmotions = [
    {
      title: "Neutral",
      icon: <Neutral width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Pensativo",
      icon: <Pensive width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Calmado",
      icon: <Calmed width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
  ];

  const mixedEmotions = [
    {
      title: "Confundido",
      icon: <Confused width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
    {
      title: "Preocupado",
      icon: (
        <Concerned width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />
      ),
    },
    {
      title: "Nostalgico",
      icon: (
        <Nostalgic width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />
      ),
    },
    {
      title: "No lo sé",
      icon: <NotSure width={isMobile ? 45 : 64} height={isMobile ? 45 : 64} />,
    },
  ];

  function renderEmotions(): ReactNode {
    switch (type) {
      case "POSITIVE":
        return (
          <Grid container spacing={3} paddingY={2}>
            {positiveEmotions.map((action, index) => (
              <Grid
                component={"div"}
                key={index}
                display={"flex"}
                justifyContent={"center"}
                size={{ xs: 12, sm: 10, md: 6, lg: 3, xl: 3 }}
                onClick={() => handleSelectEmotion(action)}
              >
                <EmotionCard title={action.title} icon={action.icon} />
              </Grid>
            ))}
          </Grid>
        );
      case "NEGATIVE":
        return (
          <Grid container spacing={3} paddingY={2}>
            {negativeEmotions.map((action, index) => (
              <Grid
                component={"div"}
                key={index}
                display={"flex"}
                justifyContent={"center"}
                size={{ xs: 12, sm: 10, md: 6, lg: 3, xl: 3 }}
                onClick={() => handleSelectEmotion(action)}
              >
                <EmotionCard title={action.title} icon={action.icon} />
              </Grid>
            ))}
          </Grid>
        );
      case "NEUTRAL":
        return (
          <Grid container spacing={3} paddingY={2}>
            {neutralEmotions.map((action, index) => (
              <Grid
                component={"div"}
                key={index}
                display={"flex"}
                justifyContent={"center"}
                size={{ xs: 12, sm: 10, md: 6, lg: 3, xl: 3 }}
                onClick={() => handleSelectEmotion(action)}
              >
                <EmotionCard title={action.title} icon={action.icon} />
              </Grid>
            ))}
          </Grid>
        );
      case "OTHER":
        return (
          <Grid container spacing={3} paddingY={2}>
            {mixedEmotions.map((action, index) => (
              <Grid
                component={"div"}
                key={index}
                display={"flex"}
                justifyContent={"center"}
                size={{ xs: 12, sm: 10, md: 6, lg: 3, xl: 3 }}
                onClick={() => handleSelectEmotion(action)}
              >
                <EmotionCard title={action.title} icon={action.icon} />
              </Grid>
            ))}
          </Grid>
        );
      default:
        <></>;
        break;
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={"alert-dialog-title"}
      fullWidth={true}
      maxWidth={"md"}
      PaperProps={{
        style: {
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle id={"alert-dialog-title"}>
        Selecciona una emoción
      </DialogTitle>
      <DialogContent>{renderEmotions()}</DialogContent>
      <DialogActions>
        <Button
          disabled={selectedEmotion === null}
          color="info"
          onClick={handleConfirmSelection}
        >
          Aceptar
        </Button>
        <Button color="error" onClick={onClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEmotions;
