"use client";

import { Container } from "@mui/material";
import { useTheme } from "@mui/material";
import Action from "./components/Action";
import { useQuery } from "react-query";
import { get } from "@/utils/API/request";
import {Project} from "../../../types";
import Loader from "@/app/components/Loader";
import { useParams } from "next/navigation";

interface Action {
	id: string | null;
	name: string;
	pitch: string;
	firstResponse: string;
}

export default function Actions() {
  let theme = useTheme();
  const projectId = useParams().projectId;

  const getAllActions = async () => {
    const res = await get(`/actions/${projectId}/all`);
    return res.data.message;
  };
  let actions = useQuery(["actions"], getAllActions);

  if(actions.isLoading) return <Loader/>

  return (
    <Container
      sx={{
        marginTop: theme.spacing(8),
      }}
    >
      <h3 className="text-3xl py-8 font-bold">Actions</h3>

      <div className="flex flex-col gap-4 mb-40">
        <Action name="" firstResponse="" pitch="" id=""/>

        {actions.data.map((action: any) => (
          <Action
            key={action.id}
            name={action.name}
            firstResponse={action.firstResponse}
            pitch={action.pitch}
            id={action.id}
          />
        ))}
        
      </div>
    </Container>
  );
}
