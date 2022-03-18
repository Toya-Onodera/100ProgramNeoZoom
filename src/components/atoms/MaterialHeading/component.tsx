import React from "react";
import { Typography } from "@mui/material";

type Props = {
  text: string;
};

export const MaterialH1: React.VFC<Props> = ({ text }) => {
  return (
    <Typography component="h1" variant="h5">
      {text}
    </Typography>
  );
};
