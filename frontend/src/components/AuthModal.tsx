import { useState } from "react";
import { signIn, signUp } from "../lib/auth-client";
import { X, Github } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    defaultMode?: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, defaultMode = "signin" }: Props) {
    const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            if (mode === "signup") {
                const name = formData.get("name") as string;
                const result = await signUp.email({
                    email,
                    password,
                    name,
                });
                if (result.error) throw new Error(result.error.message);
            } else {
                const result = await signIn.email({
                    email,
                    password,
                });
                if (result.error) throw new Error(result.error.message);
            }
            onClose();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong",
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: "github" | "google") => {
        setIsLoading(true);
        await signIn.social({
            provider,
            callbackURL: window.location.pathname,
        });
        // Ne zatvaramo modal ovdje jer se radi redirect
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 btn btn-ghost btn-circle btn-sm"
                >
                    <X className="size-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {mode === "signin" ? "Welcome back" : "Create account"}
                    </h2>
                    <p className="text-base-content/60 text-sm mt-1">
                        {mode === "signin"
                            ? "Sign in to continue to PERN Marketplace"
                            : "Sign up to start using PERN Marketplace"}
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <div className="alert alert-error mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* Social login buttons */}
                <div className="space-y-2 mb-6">
                    <button
                        onClick={() => handleSocialLogin("github")}
                        disabled={isLoading}
                        className="btn btn-outline w-full gap-2"
                    >
                        <Github className="size-5" />
                        Continue with GitHub
                    </button>

                    <button
                        onClick={() => handleSocialLogin("google")}
                        disabled={isLoading}
                        className="btn btn-outline w-full gap-2"
                    >
                        <svg className="size-5" viewBox="0 0 24 24">
                            ...
                        </svg>
                        Continue with Google
                    </button>
                </div>

                {/* Divider */}
                <div className="divider text-sm text-base-content/40">or</div>

                {/* Email form */}
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                    {mode === "signup" && (
                        <input
                            name="name"
                            type="text"
                            placeholder="Full name"
                            className="input input-bordered w-full"
                            required
                            disabled={isLoading}
                        />
                    )}
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        className="input input-bordered w-full"
                        required
                        disabled={isLoading}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        required
                        disabled={isLoading}
                        minLength={8}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : mode === "signin" ? (
                            "Sign In"
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                {/* Toggle mode */}
                <p className="text-center text-sm mt-6 text-base-content/60">
                    {mode === "signin"
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    <button
                        onClick={() => {
                            setMode(mode === "signin" ? "signup" : "signin");
                            setError(null);
                        }}
                        className="link link-primary ml-1 font-medium"
                    >
                        {mode === "signin" ? "Sign up" : "Sign in"}
                    </button>
                </p>
            </div>
        </div>
    );
}
