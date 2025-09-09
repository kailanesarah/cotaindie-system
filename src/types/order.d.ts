interface Order {
  id: string;
  code: string;
  name: string;
  client: Pick<Client, "code" | "name">;
  status: "approved" | "open";
}
