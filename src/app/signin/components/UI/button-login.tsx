"use client";

import { ROUTES } from "@/constants/urls";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push(ROUTES.PUBLIC.SIGNIN);
  };

  return <button onClick={handleLogin}>Sair</button>;
}
