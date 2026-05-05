import React from "react";
import { createRoot } from "react-dom/client";
import UniversityOptionsDashboard from "../university_options_dashboard.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UniversityOptionsDashboard />
  </React.StrictMode>
);
