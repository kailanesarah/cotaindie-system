"use client";

import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export const ClarityClient = () => {
  useEffect(() => {
    const projectId = "tmybt21bhx";

    Clarity.init(projectId);
  }, []);

  return null;
};
