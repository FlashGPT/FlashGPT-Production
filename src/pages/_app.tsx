import React from "react";
import type { AppProps } from "next/app";
import "./globals.css";
import RootLayout from "./layout";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const loginUrlPath = "login";
  const registerUrlPath = "register";

  const router = useRouter();

  function sidebarShouldBeHidden(): boolean {
    return (
      !router.pathname.includes(loginUrlPath) &&
      !router.pathname.includes(registerUrlPath)
    );
  }

  return (
    <SessionProvider session={session}>
      <RootLayout>
        {sidebarShouldBeHidden() && <Sidebar />}
        <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
  );
}
