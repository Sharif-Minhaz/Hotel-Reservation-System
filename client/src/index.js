import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { SearchContextProvider } from "./contexts/SearchContext";
import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<SearchContextProvider>
				<App />
			</SearchContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
reportWebVitals();
