import React, { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full overflow-auto bg-white text-black flex">
      {children}
    </div>
  );
}
