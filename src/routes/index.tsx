import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/view/layouts/app";
import { AuthLayout } from "@/view/layouts/auth";

import { Dashboard } from "@/view/pages/app/dashboard/dashboard";
import { Orders } from "@/view/pages/app/orders/orders";

import { SignIn } from "@/view/pages/auth/sign-in";
import { SignUp } from "@/view/pages/auth/sign-up";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/orders",
        element: <Orders />,
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
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
