import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import Provider from "./contexts/context";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    BrowserRouter,
} from "react-router-dom";


const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: twentyFourHoursInMs,
            cacheTime: 0
        },
    },
});

const theme = createTheme({
    overrides: {
        MuiTableRow: {
            root: {
                "&:last-child td": {
                    borderBottom: 0,
                },
            }
        }
    },
});

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Provider>
                    <CssBaseline />
                    <App />
                </Provider>
            </QueryClientProvider>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
