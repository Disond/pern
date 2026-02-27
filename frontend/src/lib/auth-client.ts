import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Export pojedinačno za lakši import
export const { signIn, signOut, signUp, useSession } = authClient;
