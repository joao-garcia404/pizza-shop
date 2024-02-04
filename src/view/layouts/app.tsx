import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { isAxiosError } from "axios";
import { toast } from "sonner";

import { httpClient } from "@/app/lib/axios";

import { Header } from "../components/header";

export function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const code = error?.response?.data?.code;

          if (status === 401 && code === "UNAUTHORIZED") {
            toast.error("Sessão expirada, faça login novamente.");
            navigate("/sign-in", { replace: true });
          }
        }
      },
    );

    return () => {
      httpClient.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
