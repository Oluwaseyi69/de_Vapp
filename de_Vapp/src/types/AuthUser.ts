export interface AuthUser {
  id: string;
  email: string;
  role?: "roomCreator" | "user";
}
