import type { User } from "../types";
import { create } from 'zustand';
import {persist} from "zustand/middleware/persist";
import {MOCK_USERS} from "../constants/users.ts";

interface AuthState {
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,

            login: (email: string, password: string) => {
                const found = MOCK_USERS.find(user => user.email === email && user.password === password);

                if (!found) {
                    return false;
                }

                set({user: {email: found.email, name: found.name}});

                return true;
            },

            logout: () => set({user: null}),
        }),
        {
            name: 'auth-storage',
        },
    ),
)
