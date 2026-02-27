import { useSession } from "../lib/auth-client";
import { Navigate } from "react-router";

interface Props {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
    const { data: session, isPending } = useSession();

    if (isPending) return <div>Loading...</div>;
    if (!session) return <Navigate to="/login" replace />;

    return <>{children}</>;
}
