"use client";

import { Container } from "@mui/material";
import { useTheme } from "@mui/material";
import Action from "./components/Action";

export default function Actions() {
  let theme = useTheme();
  return (
    <Container
      sx={{
        marginTop: theme.spacing(8),
      }}
    >
      <h3 className="text-3xl py-8 font-bold">Actions</h3>

      <div className="flex flex-col gap-4">
        <Action />
      </div>
    </Container>
  );
}
