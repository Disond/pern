import type { Request, Response, NextFunction } from "express";
import { auth } from "../auth";
// @coderabbitai please review this specific change in the context of the previous commit.

export const requireAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const session = await auth.api.getSession({
            headers: new Headers(
                Object.entries(req.headers).map(([k, v]) => [k, String(v)]),
            ),
        });

        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = session.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid session" });
    }
};
