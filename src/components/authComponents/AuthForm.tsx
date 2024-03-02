"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  formLabel: string;
  isLoading?: boolean;
  onSubmit: SubmitHandler<Inputs>;
  children?: React.ReactNode;
  isRegister?: boolean;
};

type Inputs = {
  username: string;
  email: string;
  password: string;
};

function AuthForm({
  formLabel,
  isLoading,
  onSubmit,
  children,
  isRegister,
}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <div className="flex flex-col space-y-4 mx-auto p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        {isRegister && (
          <div className="flex flex-col space-y-4">
            <h1>Username</h1>
            <input
              {...register("username")}
              placeholder="Username"
              type="text"
              className="border border-gray shadow-lg rounded-lg px-5 py-3"
            />
          </div>
        )}
        <div className="flex flex-col space-y-4">
          <h1>Email</h1>
          <input
            {...register("email")}
            placeholder="Your email here..."
            type="text"
            className="border border-gray shadow-lg rounded-lg px-5 py-3"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <h1>Password</h1>
          <input
            {...register("password")}
            placeholder="Your password here..."
            type="password"
            className="border border-gray shadow-lg rounded-lg px-5 py-3"
          />
        </div>
        {children}
        <button
          type="submit"
          className="py-3 rounded-lg bg-darkBlue text-white shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? "loading..." : formLabel}
        </button>
      </form>
      <div className="flex flex-col space-y-4">
        <button
          className="border py-3 rounded-lg shadow-lg border-gray cursor-pointer flex gap-2 justify-center items-center"
          disabled={isLoading}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <img src="google.svg" />
          Sign in with Google
        </button>
        <button
          className="border py-3 rounded-lg shadow-lg border-gray cursor-pointer flex gap-2 justify-center items-center"
          disabled={isLoading}
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <img src="github.svg" />
          Sign in with Github
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
