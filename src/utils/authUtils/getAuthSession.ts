import { Session } from "next-auth";
import { getSession } from "next-auth/react";

const REDIRECT_URL = "/api/auth/signin";

/**
 * Function to check the current session and redirect to login if not found
 * @param context Context of the page
 * @param callBack Callback function to be executed if session is found
 * @returns Execution of the callback function
 */
export async function getAuthSession(context: any): Promise<{
  isSession: boolean;
  redirect: { destination: string; permanent: boolean };
  session: Session | null;
}> {
  const session = await getSession(context);

  if (!session) {
    return {
      isSession: false,
      redirect: {
        destination: REDIRECT_URL,
        permanent: false,
      },
      session: null,
    };
  }

  return {
    isSession: true,
    redirect: {
      destination: "",
      permanent: false,
    },
    session: session as Session,
  };
}
