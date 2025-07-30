"use client"; 

import { logout } from "@/app/(public)/signout/actions/logout-action";

export function SignOutForm() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="btn bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
      >
        Sair
      </button>
    </form>
  );
}
