import { signUp } from "../lib/auth-client";

export function Register() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const result = await signUp.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            name: formData.get("name") as string,
        });

        if (result.error) {
            alert(result.error.message);
        } else {
            alert("Check your email for verification!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input
                name="password"
                type="password"
                placeholder="Password"
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}
