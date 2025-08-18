"use client";

import { ROUTES } from "@/constants/urls";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push(ROUTES.PUBLIC.SIGNOUT);
  };

  return <button onClick={handleLogin}>Sair</button>;
}
