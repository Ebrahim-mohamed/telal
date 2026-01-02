"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashBoardHeader } from "./components/DashBoardHeader";
import { DashboardNavbar } from "./components/DashboardNavbar";
import { MantineClientProvider } from "./MantineClientProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/dashboard/login");
    }
  }, [router]);

  return (
    <html suppressHydrationWarning>
      <body className="w-full h-full" suppressHydrationWarning>
        {isClient ? (
          pathname?.includes("login") ? (
            <div className="w-full h-full">{children}</div>
          ) : (
            <MantineClientProvider>
              <DashBoardHeader />
              <div className="flex h-screen w-[100%]">
                <DashboardNavbar />
                <div className="w-[80%] p-10 border-[1px] border-t border-l border-[#D1D1D1] rounded-tl-[2rem] overflow-y-scroll">
                  {children}
                </div>
              </div>
            </MantineClientProvider>
          )
        ) : (
          // Server-side fallback
          <div className="w-full h-full" />
        )}
      </body>
    </html>
  );
}
