import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MantineProvider
      theme={{
        fontFamily: "Inter, sans-serif"
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>
);
