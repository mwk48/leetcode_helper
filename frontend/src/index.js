import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import Provider from "./contexts/context";
import CssBaseline from "@mui/material/CssBaseline";

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: twentyFourHoursInMs
        },
    },
});

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Provider>
            <CssBaseline />
            <App />
        </Provider>
    </QueryClientProvider>,
    document.getElementById("root")
);
