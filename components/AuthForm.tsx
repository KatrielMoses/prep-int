"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signUp, signIn } from "@/lib/actions/auth.action";

// Zod schema factory
const authFormSchema = (type: "sign-in" | "sign-up") =>
  z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(4),
  });

export default function AuthForm({ type }: { type: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const isSignUp = type === "sign-up";
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<ReturnType<typeof authFormSchema>>>({
    resolver: zodResolver(authFormSchema(type)),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: z.infer<ReturnType<typeof authFormSchema>>) {
    try {
      if (isSignUp) {
        const { name, email, password } = values;
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({ uid: cred.user.uid, name: name!, email });
        if (!result.success) {
          await deleteUser(cred.user).catch(() => { });
          toast.error(result.message || "Failed to create an account.");
          return;
        }
        toast.success("Account created successfully! Please sign in.");
        router.push("/sign-in");
      } else {
        console.log("🔑 Starting signin process...");
        const { email, password } = values;

        console.log("📧 Email:", email);
        console.log("🔥 Attempting Firebase authentication...");
        const cred = await signInWithEmailAndPassword(auth, email, password);
        console.log("✅ Firebase auth successful:", cred.user.uid);

        console.log("🎫 Getting ID token...");
        const idToken = await cred.user.getIdToken();
        if (!idToken) {
          console.error("❌ Failed to get ID token");
          toast.error("Failed to sign in. Please try again.");
          return;
        }
        console.log("✅ ID token obtained");

        console.log("🚀 Calling server signin action...");
        const result = await signIn({ email, idToken });
        console.log("📝 Server signin result:", result);

        if (!result.success) {
          console.error("❌ Server signin failed:", result.message);
          toast.error(result.message || "Failed to sign in.");
          return;
        }

        console.log("🎉 Signin successful! Redirecting...");
        toast.success("Welcome back!");

        // Try both router refresh and redirect
        console.log("🔄 Refreshing router state...");
        router.refresh();

        console.log("🏠 Redirecting to homepage...");
        // Use a small delay to ensure the refresh completes
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            toast.error("That email is already registered.");
            break;
          case "auth/invalid-email":
            toast.error("Please enter a valid email address.");
            break;
          case "auth/wrong-password":
            toast.error("Incorrect password.");
            break;
          default:
            toast.error(err.message);
        }
      } else {
        toast.error(`Unexpected error: ${String(err)}`);
      }
    }
  }

  return (
    <div className="auth-modal-card-3d-lg">
      <div className="flex flex-col items-center gap-1 mb-3">
        <Image src="/logo.svg" alt="logo" width={44} height={38} />
        <h2 className="text-3xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#908cff] to-[#ffabe1] tracking-wide">
          Prep<span className="font-extrabold text-indigo-400">Wise</span>
        </h2>
        <span className="text-lg text-gray-300/85 font-light mt-1 text-center">
          Practice job interview with AI
        </span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5"
          autoComplete="off"
        >
          {isSignUp && (
            <div className="form-group-lg">
              <label className="input-label-lg">Name</label>
              <input
                className="input-modern-lg"
                {...form.register("name")}
                placeholder="Enter your name"
                type="text"
                autoFocus
              />
              {form.formState.errors.name && (
                <span className="error-text">{form.formState.errors.name.message}</span>
              )}
            </div>
          )}

          <div className="form-group-lg">
            <label className="input-label-lg">Email</label>
            <input
              className="input-modern-lg"
              {...form.register("email")}
              placeholder="Enter your email"
              type="email"
              autoComplete="off"
            />
            {form.formState.errors.email && (
              <span className="error-text">{form.formState.errors.email.message}</span>
            )}
          </div>

          <div className="form-group-lg relative">
            <label className="input-label-lg">Password</label>
            <input
              className="input-modern-lg pr-12"
              {...form.register("password")}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />
            <button
              type="button"
              tabIndex={-1}
              className="show-hide-btn-lg"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg height="24" width="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4.5C7.305 4.5 3.143 7.364 1.5 12c1.643 4.636 5.805 7.5 10.5 7.5s8.857-2.864 10.5-7.5C20.857 7.364 16.695 4.5 12 4.5Z"
                    stroke="currentColor" strokeWidth="1.8"
                  />
                  <path
                    d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7Z"
                    stroke="currentColor" strokeWidth="1.8"
                  />
                </svg>
              ) : (
                <svg height="24" width="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3l18 18M3.27 9.66C2.46 10.94 2 12 2 12s3.43 7 10 7a9.93 9.93 0 005.72-1.81M9.53 9.53a3.5 3.5 0 004.94 4.94"
                    stroke="currentColor" strokeWidth="1.8"
                  />
                  <path
                    d="M12 5c3.34 0 6.21 1.68 8.02 4.14M14.12 9.88a3.5 3.5 0 00-4.95 0"
                    stroke="currentColor" strokeWidth="1.8"
                  />
                </svg>
              )}
            </button>
            {form.formState.errors.password && (
              <span className="error-text">{form.formState.errors.password.message}</span>
            )}
          </div>

          <Button
            className="w-full auth-btn-lg"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {isSignUp ? "Create an Account" : "Sign In"}
          </Button>
        </form>
      </Form>

      <div className="divider-row my-5">
        <div className="divider-line" />
        <span className="divider-or-lg">or</span>
        <div className="divider-line" />
      </div>

      <p className="text-center text-base text-gray-300">
        {isSignUp ? "Have an account already?" : "Don't have an account?"}{" "}
        <Link
          href={isSignUp ? "/sign-in" : "/sign-up"}
          className="font-semibold text-indigo-300 hover:underline"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </Link>
      </p>
    </div>
  );
}
