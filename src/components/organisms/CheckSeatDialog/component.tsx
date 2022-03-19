import React from "react";

// MUI
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Components
import { MaterialDialog } from "../../molecules/MaterialDialog";
import { LookNumbers } from "../../molecules/LookNumbers";

type Props = {
  isOpen: boolean;
  seats: number[];
  onClick: (number: number) => void;
};

export const CheckSeatDialog: React.VFC<Props> = ({
  isOpen,
  seats,
  onClick,
}) => {
  return (
    <MaterialDialog isOpen={isOpen} title="座る座席を選んでください">
      <List sx={{ pt: 0 }}>
        {seats.map((value, i) => (
          <ListItem
            button
            key={`CheckSeatDialogListItem-${i}`}
            onClick={() => onClick(value)}
          >
            <ListItemIcon>
              <LookNumbers number={value} />
            </ListItemIcon>
            <ListItemText primary={value} />
          </ListItem>
        ))}
      </List>
    </MaterialDialog>
  );
};
