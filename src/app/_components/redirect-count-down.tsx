"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RedirectCountdownProps {
  redirectTo: string;
  initialCount?: number;
}

export function RedirectCountdown({
  redirectTo,
  initialCount = 5,
}: Readonly<RedirectCountdownProps>) {
  const [countdownHistory, setCountdownHistory] = useState<number[]>([
    initialCount,
  ]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownHistory((prevHistory) => {
        const currentSecond = prevHistory.at(-1)!;

        if (currentSecond <= 1) {
          clearInterval(interval);
          return prevHistory;
        }

        const nextSecond = currentSecond - 1;

        if (nextSecond === 1) {
          setTimeout(() => {
            router.push(redirectTo);
          }, 0);
        }

        return [...prevHistory, nextSecond];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router, redirectTo]);

  return (
    <span>
      Redirecionando automaticamente em {countdownHistory.join(", ")}...
    </span>
  );
}
