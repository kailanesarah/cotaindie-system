"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect, useRef, useState } from "react";

export function useSentryFeedback() {
  const [feedback, setFeedback] = useState<ReturnType<
    typeof Sentry.getFeedback
  > | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setFeedback(Sentry.getFeedback());
  }, []);

  useEffect(() => {
    if (feedback && buttonRef.current) {
      const detach = feedback.attachTo(buttonRef.current);
      return detach;
    }
  }, [feedback]);

  return { buttonRef };
}
