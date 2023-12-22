import { createBrowserRouter } from "react-router-dom";

import { Dashboard } from "@/view/pages/app/dashboard";
import { SignIn } from "@/view/pages/auth/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
]);
