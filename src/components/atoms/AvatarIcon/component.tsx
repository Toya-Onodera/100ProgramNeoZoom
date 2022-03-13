import React from "react";

import { Avatar } from "@mui/material";

export const AvatarIcon: React.FC = ({ children }) => {
  return <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>{children}</Avatar>;
};
