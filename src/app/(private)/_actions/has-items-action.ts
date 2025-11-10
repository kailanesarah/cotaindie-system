import { supabaseServer } from "@/lib/supabase/server";

export async function hasItemsActions() {
  const supabase = await supabaseServer();

  const [clients, materials, orders] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("materials").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }),
  ]);

  return {
    has_clients: clients.count! > 0,
    has_materials: materials.count! > 0,
    has_orders: orders.count! > 0,
  };
}
