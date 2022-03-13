import React from "react";
import { MeetingRoom } from "@mui/icons-material";

// Components
import { AvatarIcon } from "../../atoms/AvatarIcon";
import { MaterialH1 } from "../../atoms/MaterialHeading";

type Props = {
  text: string;
};

export const MaterialIconHeading: React.VFC<Props> = ({ text }) => {
  return (
    <>
      <AvatarIcon>
        <MeetingRoom />
      </AvatarIcon>

      <MaterialH1 text={text} />
    </>
  );
};
