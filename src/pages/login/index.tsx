import AuthForm from "@/components/authComponents/AuthForm";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Space from "..";

type Props = {};

type Inputs = {
  username: string;
  email: string;
  password: string;
};

function index({}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      console.log(res);
      if (res?.ok) {
        router.push("/");
      } else {
        console.log(res);
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center border space-y-2">
      <div className="flex flex-col justify-center items-center space-y-2">
        <div className="flex item-center justify-center gap-2">
          <Image src="/assets/logo-active.png" width={50} height={50} alt="" />
          <h1 className="flex text-3xl items-center justify-center">
            FlashGPT
          </h1>
        </div>
        <h1 className="text-darkGray">
          Welcome back! Please enter your details to login here.
        </h1>
      </div>
      <div className="w-[500px]">
        <AuthForm formLabel="Login" onSubmit={onSubmit} isLoading={isLoading}>
          {error != "" && <Alert severity="warning">{error}</Alert>}
        </AuthForm>
      </div>
      <div>
        <label>Don't have an account? </label>
        <button
          className="text-darkBlue underline"
          onClick={() => router.push("/register")}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default index;
