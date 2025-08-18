import { logout } from "@/app/signout/actions/logout-action";

export function SignOutForm() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="btn rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
      >
        Sair
      </button>
    </form>
  );
}
