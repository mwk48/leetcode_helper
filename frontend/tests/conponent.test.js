import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import Provider from "../src/contexts/context";
import CssBaseline from "@mui/material/CssBaseline";
import {
    BrowserRouter,
} from "react-router-dom";
import App from "../src/App";
import nock from "nock";
import { initialState } from "../src/reducers/reducer";

axios.defaults.adapter = require("axios/lib/adapters/http");
nock.disableNetConnect();
nock.enableNetConnect("127.0.0.1");

test("axios test", async () => {
    console.log(window.location.href);
    nock("http://localhost")
        .get("/api/questions?page=1&limit=100&acceptance=0&difficulty=&paid=")
        .reply(200, {
            data: {
                data: {
                    key: "mit",
                    name: "MIT License",
                    spdx_id: "MIT",
                    url: "https://api.github.com/licenses/mit",
                    node_id: "MDc6TGljZW5zZTEz",
                }
            },
            status: "success"
        });
    nock("http://localhost")
        .get("/api/tags")
        .reply(200, {
            data: {
                data: {
                    key: "mit",
                    name: "MIT License",
                    spdx_id: "MIT",
                    url: "https://api.github.com/licenses/mit",
                    node_id: "MDc6TGljZW5zZTEz",
                }
            },
            status: "success"
        });
    const queryClient = new QueryClient();
    await act(async () => {
        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Provider>
                        <CssBaseline />
                        <App />
                    </Provider>
                </QueryClientProvider>
            </BrowserRouter>
        );
    });
    console.log(prettyDOM());
});