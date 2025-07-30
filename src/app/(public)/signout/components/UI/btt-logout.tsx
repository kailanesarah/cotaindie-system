"use client"
import { useRouter } from "next/navigation";

export function SignoutButton() {
  const router = useRouter();

  function handleClick() {
    router.push("/signout"); 
  }

  return (
    <button
      onClick={handleClick}
      className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Sair
    </button>
  );
}
