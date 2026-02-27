import { useState } from "react";
import { ShoppingBagIcon, PlusIcon, UserIcon } from "lucide-react";
import { Link } from "react-router";
import ThemeSelector from "./ThemeSelector";
import { AuthModal } from "./AuthModal";
import { useSession, signOut } from "../lib/auth-client";

export default function Navbar() {
    const { data: session, isPending } = useSession();
    const [authModal, setAuthModal] = useState<{
        isOpen: boolean;
        mode: "signin" | "signup";
    }>({
        isOpen: false,
        mode: "signin",
    });

    const isSignedIn = !!session;

    const openSignIn = () => setAuthModal({ isOpen: true, mode: "signin" });
    const openSignUp = () => setAuthModal({ isOpen: true, mode: "signup" });
    const closeModal = () => setAuthModal({ ...authModal, isOpen: false });

    const handleLogout = async () => {
        await signOut();
        window.location.href = "/";
    };

    // Loading skeleton
    if (isPending) {
        return (
            <div className="navbar bg-base-300">
                <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
                    <div className="skeleton w-32 h-8" />
                    <div className="skeleton w-24 h-8" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="navbar bg-base-300">
                <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
                    {/* Logo - Left Side */}
                    <div className="flex-1">
                        <Link to="/" className="btn btn-ghost gap-2">
                            <ShoppingBagIcon className="size-5 text-primary" />
                            <span className="text-lg font-bold font-mono uppercase tracking-wider">
                                PERN Marketplace
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links - Right Side */}
                    <div className="flex gap-2 items-center">
                        <ThemeSelector />

                        {isSignedIn ? (
                            <>
                                <Link
                                    to="/create"
                                    className="btn btn-primary btn-sm gap-2"
                                >
                                    <PlusIcon className="size-4" />
                                    <span className="hidden sm:inline">
                                        New Product
                                    </span>
                                </Link>

                                <Link
                                    to="/profile"
                                    className="btn btn-ghost btn-sm gap-2"
                                >
                                    <UserIcon className="size-4" />
                                    <span className="hidden sm:inline">
                                        Profile
                                    </span>
                                </Link>

                                {/* User dropdown - zamjena za Clerk UserButton */}
                                <div className="dropdown dropdown-end">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-ghost btn-circle avatar"
                                    >
                                        <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img
                                                src={
                                                    session.user.image ||
                                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                        session.user.name ||
                                                            "U",
                                                    )}&background=random`
                                                }
                                                alt={
                                                    session.user.name || "User"
                                                }
                                            />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
                                    >
                                        <li className="menu-title">
                                            <span>{session.user.name}</span>
                                            <span className="text-xs text-base-content/50">
                                                {session.user.email}
                                            </span>
                                        </li>
                                        <li>
                                            <Link to="/profile">Profile</Link>
                                        </li>
                                        <li>
                                            <Link to="/settings">Settings</Link>
                                        </li>
                                        <div className="divider my-1" />
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="text-error"
                                            >
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={openSignIn}
                                    className="btn btn-ghost btn-sm"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={openSignUp}
                                    className="btn btn-primary btn-sm"
                                >
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Auth Modal - kao Clerk */}
            <AuthModal
                isOpen={authModal.isOpen}
                onClose={closeModal}
                defaultMode={authModal.mode}
            />
        </>
    );
}
