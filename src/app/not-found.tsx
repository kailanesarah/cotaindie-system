import { ROUTES } from "@/constants/urls";
import { redirect } from "next/navigation";

export default async function NotFound() {
  redirect(ROUTES.PRIVATE.DASHBOARD);
}
