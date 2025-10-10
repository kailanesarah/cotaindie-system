"use client";

import Hotjar from "@hotjar/browser";
import { useEffect } from "react";

export const HotjarClient = () => {
  useEffect(() => {
    const siteId = 6540835;
    const hotjarVersion = 6;

    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return null;
};
