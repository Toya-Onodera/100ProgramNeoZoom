import React, { MutableRefObject, Ref, useRef } from "react";

import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  TextField,
  ThemeProvider,
} from "@mui/material";

// Components
import { CopyRight } from "../CopyRight";
import { MaterialIconHeading } from "../MaterialIconHeading";

const theme = createTheme();

type Props = {
  headingText: string;
  buttonText: string;
  inputRef: MutableRefObject<HTMLInputElement | undefined>;
  onClick?: () => void;
};

export const InputForm: React.VFC<Props> = ({
  headingText,
  buttonText,
  inputRef,
  onClick,
}) => {
  // const inputRef = useRef<HTMLInputElement>();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MaterialIconHeading text={headingText} />

          <Box sx={{ mt: 1, width: 300 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="roomId"
              label="Room Ids"
              name="roomId"
              autoFocus
              inputRef={inputRef}
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 4 }}
              onClick={onClick}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>

        <CopyRight />
      </Container>
    </ThemeProvider>
  );
};
