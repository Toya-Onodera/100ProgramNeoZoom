import React from "react";

// MUI
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LooksOne from "@mui/icons-material/LooksOne";
import LooksTwo from "@mui/icons-material/LooksTwo";
import Looks3 from "@mui/icons-material/Looks3";
import Looks4 from "@mui/icons-material/Looks4";

// Constants
import { SEAT_NUMBERS } from "../../../constants/SEAT_NUMBERS";

type Props = {
  number: number;
};

export const LookNumbers: React.VFC<Props> = ({ number }) => {
  switch (number) {
    case SEAT_NUMBERS.ONE:
      return <LooksOne />;
    case SEAT_NUMBERS.TWO:
      return <LooksTwo />;
    case SEAT_NUMBERS.THREE:
      return <Looks3 />;
    case SEAT_NUMBERS.HOUR:
      return <Looks4 />;
    default:
      return <HelpCenterIcon />;
  }
};
