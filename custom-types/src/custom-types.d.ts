type UserID = string | number;
interface User {
    id: UserID;
    name: string;
    email?: string;
}

declare const currentUser: User;