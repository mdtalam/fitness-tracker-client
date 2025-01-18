import { ThemeProvider } from "@material-tailwind/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./Routes/Routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <div className="max-w-screen-2xl mx-auto">
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </div>
    </HelmetProvider>
  </StrictMode>
);
