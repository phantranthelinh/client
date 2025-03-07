import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/api/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppSidebar } from "./AppSidebar/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLogged } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      navigate({
        to: "/login",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLogged]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-4 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
