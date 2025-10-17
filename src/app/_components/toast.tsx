"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Toaster } from "react-hot-toast";

export const Toast = () => {
  const isSmallScreen = useMediaQuery("(max-width: 1023px)");

  return (
    <Toaster
      key={isSmallScreen ? "mobile" : "desktop"}
      gutter={16}
      position={isSmallScreen ? "bottom-center" : "bottom-right"}
      toastOptions={{
        style: {
          transition: "0ms",
          height: "auto",
          maxWidth: "none",
          width: "100%",
          padding: 0,
          margin: 0,
          boxShadow: "none",
          background: "transparent",
        },
      }}
      containerStyle={{
        margin: 0,
        padding: 0,
      }}
    />
  );
};
