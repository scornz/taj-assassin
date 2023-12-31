import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import {
  createHashRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

/* Pages */
import Root from "pages/Root";
import Leaderboard from "pages/leaderboard/Leaderboard";
import Register from "pages/Register";
import Login from "pages/Login";

/* Default font imports */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";

import { ChakraProvider } from "@chakra-ui/react";

/* Why use a hash router? GitHub pages uses server routing, while React Router
relies on clientside routing. So when we go to a page in our website, Gh-pages
looks for an index.html, can't find it and throws a 404. */
const router = createHashRouter([
  {
    element: (
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    ),
    children: [
      {
        path: "/app/*",
        element: <Root />,
        children: [
          {
            path: "leaderboard",
            element: <Leaderboard />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "*",
            element: <Navigate to="/app/leaderboard" />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <Navigate to="/app/leaderboard" />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <RecoilNexus />
    <RouterProvider router={router} />
  </RecoilRoot>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
