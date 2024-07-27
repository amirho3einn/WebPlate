import React from "react";
import type { Metadata } from "next";
import LoginForm from "@/app/_components/LoginForm";
import { auth, signIn } from "@/app/_lib/auth";
import { UserLogin } from "@/types/global";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Login into WebPlate Restaurant Web Application",
};

async function Page() {
    const session = await auth();

    if (session?.user) redirect("/dashboard/home");

    async function handleLogin(userInput: UserLogin) {
        "use server";
        await signIn("credentials", {
            redirectTo: "/dashboard/home",
            ...userInput,
        });
    }

    return <LoginForm handleLogin={handleLogin} />;
}

export default Page;
