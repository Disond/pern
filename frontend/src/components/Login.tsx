import { signIn } from "../lib/auth-client";

export function Login() {
    const handleSocialLogin = async () => {
        await signIn.social({
            provider: "github",
            callbackURL: "/dashboard",
        });
    };

    const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const result = await signIn.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        });

        if (result.error) {
            alert(result.error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <button onClick={handleSocialLogin}>Login with GitHub</button>

            <hr />

            <form onSubmit={handleEmailLogin}>
                <input name="email" type="email" placeholder="Email" required />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
