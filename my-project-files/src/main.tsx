import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "~/app/routes/root";
import ErrorPage from "./error-page";
import PomodoroProject from "~/app/routes/projects/day-1/pomodoro";
import Index from "./routes";
import "./normalize.css";
import "./index.css";
import Ecommerce from "./routes/projects/day-2/e-commerce";
import PianoProject from "./routes/projects/day-3/Piano";
import ComputerKeyboard from "./routes/projects/day-4/ComputerKeyboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/pomodoro",
        element: <PomodoroProject />,
      },
      {
        path: "/e-commerce-component",
        element: <Ecommerce />,
      },
      {
        path: "/piano",
        element: <PianoProject />,
      },
      {
        path: "/computer-keyboard",
        element: <ComputerKeyboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
