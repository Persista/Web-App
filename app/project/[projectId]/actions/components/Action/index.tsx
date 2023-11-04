"use client";

import { useState } from "react";
import { Card, CardContent, CardActions, Button, TextField } from "@mui/material";

interface Action {
  id: string | null;
  name: string;
  pitch: string;
  firstResponse: string;
}

export default function Action() {
  let [action, setAction] = useState<Action>({
    id: null,
    name: "",
    pitch: "",
    firstResponse: "",
  });

  let [defaultIdValue, setDefaultIdValue] = useState<string>("");

  return (
    <Card>
      <CardContent className="flex flex-col gap-6">
        <h4 className="m-0 font-semibold">{action.name || "Untitled Action"}</h4>
        <TextField
          value={action.name}
          onChange={(e) => {
            if (action.id === null) {
              setDefaultIdValue(e.target.value.trim().toLowerCase().replace(/\s/g, "-"));
            }
            setAction({ ...action, name: e.target.value });
          }}
          label="Action Name"
          size="small"
        />
        <TextField
          key={defaultIdValue}
          value={action.id === null ? defaultIdValue : action.id}
          onChange={(e) => {
            setAction({ ...action, id: e.target.value });
          }}
          label="Action ID"
          size="small"
        />
        <TextField
          value={action.pitch}
          onChange={(e) => {
            setAction({ ...action, pitch: e.target.value });
          }}
          label="Pitch"
          size="small"
          multiline
          maxRows={6}
          minRows={3}
          inputProps={{
            maxLength: 2000,
          }}
          helperText={<p className="text-right">{action.pitch.length}/2000</p>}
        />
        <TextField
          value={action.firstResponse}
          onChange={(e) => {
            setAction({ ...action, firstResponse: e.target.value });
          }}
          label="First Response"
          size="small"
        />
      </CardContent>
      <CardActions className="justify-end">
        <Button variant="outlined" color="error">
          delete
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
          }}
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
}
