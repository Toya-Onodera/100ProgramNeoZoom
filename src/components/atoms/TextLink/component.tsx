import React from "react";
import Link from "@mui/material/Link";

export const TextLink: React.FC = ({ children }) => {
  return (
    <Link color="inherit" href="#">
      {children}
    </Link>
  );
};
