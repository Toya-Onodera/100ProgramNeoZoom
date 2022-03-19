import React from "react";

// MUI
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LooksOne from "@mui/icons-material/LooksOne";
import LooksTwo from "@mui/icons-material/LooksTwo";
import Looks3 from "@mui/icons-material/Looks3";
import Looks4 from "@mui/icons-material/Looks4";

type Props = {
  number: number;
};

const LOOKS_NUMBERS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  HOUR: 4,
};

export const LookNumbers: React.VFC<Props> = ({ number }) => {
  switch (number) {
    case LOOKS_NUMBERS.ONE:
      return <LooksOne />;
    case LOOKS_NUMBERS.TWO:
      return <LooksTwo />;
    case LOOKS_NUMBERS.THREE:
      return <Looks3 />;
    case LOOKS_NUMBERS.HOUR:
      return <Looks4 />;
    default:
      return <HelpCenterIcon />;
  }
};
