type Role = "ADMIN";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}
