import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import AuthForm from "@/components/authComponents/AuthForm";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import { fetchAuthUsername } from "@/utils/fetchUtils/fetchAuthUsername";
import { createAuth } from "@/utils/createUtils/createAuth";
import Image from "next/image";

type Props = {};

type Inputs = {
  username: string;
  email: string;
  password: string;
};

function index({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      setIsLoading(true);

      if (!formData.username || !formData.email || !formData.password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      const presentUserArr = await fetchAuthUsername(
        formData.username,
        formData.email,
      );
      if (presentUserArr.length > 0) {
        throw new Error("Username or email has already been taken!");
        return;
      }
      createAuth({
        _type: "auth",
        name: formData.username,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        category: [],
        calendar: [],
      }).then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to submit form, please check with the developers",
          );
          return;
        }
      });
      router.push("/login");
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
          Welcome to FlashGPT! Sign up for an account here.
        </h1>
      </div>
      <div className="w-[500px]">
        <AuthForm
          formLabel="Register"
          isLoading={isLoading}
          onSubmit={onSubmit}
          isRegister={true}
        >
          {error != "" && <Alert severity="warning">{error}</Alert>}
        </AuthForm>
      </div>
      <div>
        <label>Want to go back to login? </label>
        <button
          className="text-darkBlue underline"
          onClick={() => router.push("/login")}
        >
          Do it here
        </button>
      </div>
    </div>
  );
}

export default index;
