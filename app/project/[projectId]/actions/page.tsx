"use client";

import { Container, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import Action from "./components/Action";
import { useQuery } from "react-query";
import { get } from "@/utils/API/request";
import { Project } from "../../../types";
import Loader from "@/app/components/Loader";
import { useParams } from "next/navigation";
import { useState } from "react";

interface Action {
  id: string | null;
  title: string;
  pitch: string;
  firstQuery: string;
  projectId?: string;
  instruction?: string;
  positive_threshold?: number;
  negative_threshold?: number;
  project: any;
}

interface ActionsProps {
  params: {
    projectId: string;
  };
}

export default function Actions({ params: { projectId } }: ActionsProps) {
  let theme = useTheme();

  const [showNewAction, setShowNewAction] = useState<boolean>(false);

  const getAllActions = async () => {
    const res = await get(`/actions/${projectId}/all`);
    return res.data.message;
  };
  let actions = useQuery(["actions"], getAllActions);

  if (actions.isLoading) return <Loader />;

  return (
    <Container
      sx={{
        marginTop: theme.spacing(8),
      }}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-3xl py-8 font-bold">Actions</h3>
        <Button
          variant="contained"
          sx={{
            height: "fit-content",
            backgroundColor: "primary.main",
          }}
          onClick={() => setShowNewAction(!showNewAction)}
        >
          {showNewAction ? "Cancel" : "Add New Action"}
        </Button>
      </div>
      <div className="flex flex-col gap-4 mb-40">
        {showNewAction && (
          <Action
            title=""
            pitch=""
            id=""
            projectId={projectId}
            firstQuery=""
            instruction=""
            positive_threshold={0.2}
            negative_threshold={-0.2}
            primaryAPIKey={""}
          />
        )}
        {actions.data.length === 0 && !showNewAction && (
          <div className="flex justify-center items-center h-[50vh] w-full">
            <p className="text-gray-400 font-semibold text-4xl">No Actions Yet</p>
          </div>
        )}

        {actions?.data.map((action: Action) => (
          <Action
            title={action.title}
            firstQuery={action.firstQuery}
            pitch={action.pitch}
            id={action.id}
            projectId={projectId}
            instruction={action.instruction}
            positive_threshold={action.positive_threshold}
            negative_threshold={action.negative_threshold}
            primaryAPIKey={action.project.primaryAPIKey}
          />
        ))}
      </div>
    </Container>
  );
}
