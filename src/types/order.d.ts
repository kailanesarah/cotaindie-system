type Status = "approved" | "open";

interface Order {
  id: string;
  code: string;
  name: string;
  client: Pick<Client, "code" | "name">;
  status: Status;
}
