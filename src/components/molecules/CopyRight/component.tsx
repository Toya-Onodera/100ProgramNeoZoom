import React, { useMemo } from "react";
import { Typography } from "@mui/material";

// Components
import { TextLink } from "../../atoms/TextLink";

export const CopyRight: React.VFC = () => {
  const nowYearText = useMemo(() => " " + new Date().getFullYear() + ".", []);

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <TextLink>
        {/*  TODO: チーム名が決まったら書き換える  */}
        Neo Zoom
      </TextLink>
      {nowYearText}
    </Typography>
  );
};
