import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { ENV } from "../config/env";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    secret: ENV.BETTER_AUTH_SECRET,
    baseURL: ENV.BETTER_AUTH_URL,

    // Dodajte kasnije po potrebi:
    // emailAndPassword: {
    //   enabled: true,
    // },
    // socialProviders: {
    //   github: { ... },
    // },
});
