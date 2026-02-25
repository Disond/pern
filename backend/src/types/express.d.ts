declare namespace Express {
    interface Request {
        user?: {
            id: string;
            email: string;
            name?: string | null;
        };
    }
}
//@coderabbitai please review this specific change in the context of the previous commit.
