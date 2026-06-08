import { ClerkProvider } from "@clerk/clerk-react";
import { createRoot } from "react-dom/client"; 
import React from "react"; 
 import { BrowserRouter } from "react-router-dom"; 
 import "./index.css"; 
 import App from "./App.jsx"; 
 import { Appcontextprovider } from "./context/Appcontext.jsx";
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("Clerk Key:", clerkPubKey);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={clerkPubKey}
      afterSignOutUrl="/"
    >
      <BrowserRouter>
        <Appcontextprovider>
          <App />
        </Appcontextprovider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);