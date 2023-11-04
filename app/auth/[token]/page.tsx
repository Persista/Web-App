"use client";

import { storeLS } from "@/utils/localStorage";
import { useEffect } from "react";

interface SetLoginProps {
  params: {
    token: string;
  };
}

export default function SetLogin({ params: { token } }: SetLoginProps) {
  useEffect(() => {
    storeLS("token", token, true);
    window.location.href = "/";
  }, [token]);
  return <></>;
}
