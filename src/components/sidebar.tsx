import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const role = "Student";
const UNKNOWN_USER = "Unknown";

export default function Sidebar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState<string | undefined | null>(UNKNOWN_USER);
  const SCREEN_WIDTH_TARGET = 1024;

  const pathname = usePathname();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setIsAuthenticated(true);
      if (session?.user?.name) {
        setName(session?.user?.name);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [session]);

  const [toggle, setToggle] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= SCREEN_WIDTH_TARGET) {
        setToggle(true);
      } else {
        setToggle(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const screenWidth = window.innerWidth;
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        screenWidth < SCREEN_WIDTH_TARGET
      ) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function renderSideBarElements() {
    return (
      <>
        <div className="basis-1/6 flex items-center justify-start p-4">
          <div className="justify-center items-center flex">
            <button
              className="w-[28px] h-[28px] object-contain cursor-pointer bg-transparent rounded-full opacity-80 hover:opacity-100 z-30 flex lg:hidden"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? <ArrowBackRoundedIcon /> : <MenuRoundedIcon />}
            </button>
            <div
              className={`justify-center items-center ${
                toggle ? "flex" : "hidden"
              } space-x-2`}
            >
              <Image
                src="/assets/logo-active.png"
                width={50}
                height={50}
                alt=""
                className="w-[50px] h-[50px]"
              />
              <h1 className="text-center text-teal-950 text-lg font-bold">
                FlashGPT
              </h1>
            </div>
          </div>
        </div>
        <div
          className={`basis-2/3 ${
            toggle ? "flex" : "hidden"
          } items-start justify-start p-5`}
        >
          <div className="flex items-start flex-col gap-5">
            <Link className="flex items-center gap-2" href="/space">
              <Image
                src={
                  pathname === "/space"
                    ? "/assets/home-active.png"
                    : "/assets/home.png"
                }
                width={40}
                height={40}
                alt=""
              />
              <h1
                className={`text-center ${
                  pathname === "/space" ? "text-teal-950" : "text-slate-400"
                } text-lg font-bold`}
              >
                Space
              </h1>
            </Link>
            <Link className="flex items-center gap-2" href="/flashcard">
              <Image
                src={
                  pathname === "/flashcard"
                    ? "/assets/card-active.png"
                    : "/assets/card.png"
                }
                width={40}
                height={40}
                alt=""
              />
              <h1
                className={`text-center ${
                  pathname === "/flashcard" ? "text-teal-950" : "text-slate-400"
                } text-lg font-bold`}
              >
                Flashcards
              </h1>
            </Link>
            <Link className="flex items-center gap-2" href="/generate">
              <Image
                src={
                  pathname === "/generate"
                    ? "/assets/logo-active.png"
                    : "/assets/logo.png"
                }
                width={40}
                height={40}
                alt=""
              />
              <h1
                className={`text-left ${
                  pathname === "/generate" ? "text-teal-950" : "text-slate-400"
                } text-lg font-bold`}
              >
                Generate Cards
              </h1>
            </Link>
          </div>
        </div>
        <div
          className={`basis-1/6 ${
            toggle ? "flex" : "hidden"
          } items-center justify-start p-5`}
        >
          {!isAuthenticated ? (
            <Link
              href="/api/auth/signin"
              className="rounded-md p-2 cursor-pointer hover:underline"
            >
              Click to sign in
            </Link>
          ) : (
            <button
              onClick={() => signOut()}
              className="cursor-pointer hover:underline rounded-md py-2 px-4"
            >
              <div className="flex md:gap-3">
                <Image
                  src={"/assets/male-avatar.png"}
                  width={50}
                  height={50}
                  alt=""
                  className="h-[50px] w-[50px] rounded-full"
                />
                <div>
                  <h1>{name}</h1>
                  <h3 className="text-sm text-teal-300">{role}</h3>
                </div>
              </div>
            </button>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`flex-col h-screen bg-white z-20 w-[50px] lg:min-w-[300px] hidden lg:flex`}
        ref={sidebarRef}
      >
        {renderSideBarElements()}
      </div>
      <div
        className={`flex-col h-screen bg-white z-20 transition-all ${
          toggle ? "min-w-[300px] absolute z-20" : "w-[50px] relative"
        } lg:min-w-[300px] flex lg:hidden`}
        ref={sidebarRef}
      >
        {renderSideBarElements()}
      </div>
    </>
  );
}
