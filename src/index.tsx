import { createRoot } from "react-dom/client";
import { CommonScss } from "@allaround/all-components";

import App from "./App";

CommonScss.reset().common();

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
