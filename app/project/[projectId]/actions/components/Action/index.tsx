"use client";

import { useState } from "react";
import { Card, CardContent, CardActions, Button, TextField, Slider, FormLabel } from "@mui/material";
import { post, update } from "@/utils/API/request";

import { PersistaModal } from "@persistajs/react";

interface Action {
  id: string | null;
  title: string;
  pitch: string;
  firstQuery: string;
  projectId: string;
  instruction?: string;
  positive_threshold?: number;
  negative_threshold?: number;
  primaryAPIKey: string;
}

export default function Action({
  id,
  title,
  pitch,
  firstQuery,
  projectId,
  instruction,
  positive_threshold,
  negative_threshold,
  primaryAPIKey,
}: Action) {
  let [action, setAction] = useState<Action>({
    id,
    title,
    pitch,
    firstQuery,
    instruction,
    projectId,
    positive_threshold,
    negative_threshold,
    primaryAPIKey,
  });

  console.log(primaryAPIKey);

  const threshold = 0.2; // Set your minimum threshold (e.g., -1)

  const [value, setValue] = useState([-0.85, 0.85]);
  const [isTestOpen, setIsTestOpen] = useState(false);

  const handleChange = (event: any, newValue: number, activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    var clampedStart = newValue[0];
    var clampedEnd = newValue[1];

    if (activeThumb === 0 && newValue[0] > -1 * threshold) clampedStart = -1 * threshold;
    if (activeThumb === 1 && newValue[1] < threshold) clampedEnd = threshold;

    setValue([clampedStart, clampedEnd]);
  };

  const saveAction = async () => {
    if (id !== "") {
      const res = await update(`/actions/${projectId}/${id}`, action);
      console.log(res.data);
      return;
    }

    const res = await post(`/actions/${projectId}/`, action);
    console.log(res.data);
  };

  function testAction() {
    setIsTestOpen(true);
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-6">
        <h4 className="m-0 font-semibold">{action.title || "Add New Action"}</h4>
        <TextField
          value={action.title}
          onChange={(e) => {
            setAction({ ...action, title: e.target.value });
          }}
          label="Action Name"
          size="small"
        />
        {id && <TextField value={id} disabled label="Action ID" size="small" />}
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
          value={action.firstQuery}
          onChange={(e) => {
            setAction({ ...action, firstQuery: e.target.value });
          }}
          label="First Prompt"
          placeholder="The first prompt which will be shown to the user"
          size="small"
        />

        <TextField
          value={action.instruction}
          onChange={(e) => {
            setAction({ ...action, instruction: e.target.value });
          }}
          label="System Instruction"
          placeholder="The prompt which will be fed to the LLM"
          size="small"
        />

        <div className="flex justify-around px-8">
          <FormLabel>Sentiment Threshold</FormLabel>
          <Slider
            getAriaLabel={() => "Minimum distance"}
            value={value}
            //@ts-ignore
            onChange={handleChange}
            valueLabelDisplay="auto"
            step={0.01}
            min={-1}
            max={1}
            disableSwap
          />
        </div>
      </CardContent>
      <CardActions className="justify-end">
        <Button variant="outlined" color="error" className="m-4" onClick={testAction}>
          Test
        </Button>
        <Button
          variant="contained"
          className="m-4"
          sx={{
            backgroundColor: "primary.main",
          }}
          onClick={saveAction}
        >
          Save
        </Button>
      </CardActions>
      {id && (
        <PersistaModal
          isOpen={isTestOpen}
          onClose={() => setIsTestOpen(false)}
          actionId={id}
          apiKey={primaryAPIKey}
          onNegativeResult={() => {}}
          onPositiveResult={() => {}}
        />
      )}
    </Card>
  );
}
