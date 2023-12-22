import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/view/layouts/app";
import { AuthLayout } from "@/view/layouts/auth";

import { Dashboard } from "@/view/pages/app/dashboard";
import { SignIn } from "@/view/pages/auth/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);
