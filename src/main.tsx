import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}></Route>)
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <RouterProvider router={router} />
  </StrictMode>
);
