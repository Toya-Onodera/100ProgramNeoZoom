import React from "react";

// MUI
import { Box, Dialog, DialogTitle } from "@mui/material";

type Props = {
  isOpen: boolean;
  title: string;
  onClose?: () => {};
};

export const MaterialDialog: React.FC<Props> = ({
  isOpen,
  title,
  onClose,
  children,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
};
