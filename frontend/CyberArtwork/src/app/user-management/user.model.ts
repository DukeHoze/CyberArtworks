export interface BackendResponse {
    userId: number;
    email: string;
    isAdmin: boolean;
    name: string;
    favoriteImageIds: any[];
  }

export interface UserData {
    id: string;
    email: string;
    is_admin: boolean;
    name: string;
    password?: string;
    surname?: string;
}