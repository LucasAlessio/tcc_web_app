import { UserRoleEnum } from "@/Enums/UserRoleEnum";

export interface User {
    id: number;
    name: string;
    email: string;
    role: ValuesOf<typeof UserRoleEnum>,
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        hasNotifications: boolean,
    };
};

export type ValuesOf<T extends Object> = T[keyof T];
