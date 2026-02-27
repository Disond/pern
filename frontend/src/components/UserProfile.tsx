import { useSession, signOut } from "../lib/auth-client";

export function UserProfile() {
    const { data: session, isPending, error } = useSession();

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!session) return <div>Not logged in</div>;

    const handleLogout = async () => {
        await signOut();
        window.location.href = "/";
    };

    return (
        <div>
            <h1>Welcome, {session.user.name}</h1>
            <p>Email: {session.user.email}</p>
            {session.user.image && (
                <img src={session.user.image} alt="Profile" width={50} />
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
