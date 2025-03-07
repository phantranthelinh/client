import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Import the generated route tree
import App from "./App";
import ReactQueryProvider from "./providers/react-query";
import { Toaster } from "./components/ui/toaster";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ReactQueryProvider>
        <Toaster />
        <App />
      </ReactQueryProvider>
    </StrictMode>
  );
}
