import "@testing-library/jest-dom";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { getByTestId, prettyDOM } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import Provider from "../src/contexts/context";
import CssBaseline from "@mui/material/CssBaseline";
import {
    BrowserRouter, MemoryRouter, Route, Routes
} from "react-router-dom";
import App from "../src/App";
import Info from "../src/components/Info";
import { initialState } from "../src/reducers/reducer";
import { docs, tags, ids } from "./mockData";
import { createMemoryHistory } from "history";
import axios from "axios";
import selectEvent from "react-select-event";

const server = setupServer(
    rest.get("http://localhost/api/tags", (req, res, ctx) => {
    // Respond with a mocked user token that gets persisted
    // in the `sessionStorage` by the `Login` component.
        return res(ctx.delay(100), ctx.json({
            tags: tags
        }));
    }),
    rest.get("http://localhost/api/questions", (req, res, ctx) => {
        return res(ctx.delay(100), ctx.json({
            docs: docs
        }));
    }),
    rest.get("http://localhost/api/questions/qid/:id", (req, res, ctx) => {
        const id = Number(req.params.id);
        const question = docs.find(doc => doc.questionId===id);
        return res(ctx.delay(100), ctx.json(question));
    }),
    rest.get("http://localhost/api/questions/ids", (req, res, ctx) => {
        return res(ctx.delay(100), ctx.json(ids));
    })
);
const queryCache = new QueryCache();
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
    server.resetHandlers();
    queryCache.clear();
    cleanup();
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("Navigation and content test", async () => {
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
    const response = render(
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Provider>
                    <CssBaseline />
                    <App />
                </Provider>
            </QueryClientProvider>
        </BrowserRouter>
    );
    await waitFor(() => {
        expect(screen.queryByText("Home")).toBeInTheDocument();
    });
    const helperBar = screen.getByText("Helper");
    act(() => {
        fireEvent.click(helperBar);
    });
    await waitFor(() => {
        expect(screen.queryByText("Enter leetcode question id below, and click the url below to access the question.")).toBeInTheDocument();
    });
    const aboutBar = screen.getByText("About");
    act(() => {
        fireEvent.click(aboutBar);
    });
    await waitFor(() => {
        expect(screen.queryByText("This project provide a few features for improving user experience in Leetcode:")).toBeInTheDocument();
    });
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
    //response.debug(undefined, 30000);
});

test("Helper component test", async () => {
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
    const response = render(
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Provider>
                    <CssBaseline />
                    <App />
                </Provider>
            </QueryClientProvider>
        </BrowserRouter>
    );
    await waitFor(() => {
        expect(screen.queryByText("Home")).toBeInTheDocument();
    });
    const helperBar = screen.getByText("Helper");
    act(() => {
        fireEvent.click(helperBar);
    });
    await waitFor(() => {
        expect(screen.queryByText("Enter leetcode question id below, and click the url below to access the question.")).toBeInTheDocument();
        expect(screen.queryByText("https://leetcode.com/problems/two-sum")).toBeInTheDocument();
    });
    const idButton = screen.getByRole("textbox");
    fireEvent.change(idButton, { target: { value: "11" } });
    await waitFor(() => {
        expect(screen.queryByText("https://leetcode.com/problems/two-sum")).not.toBeInTheDocument();
    });
    fireEvent.change(idButton, { target: { value: "abcde" } });
    await waitFor(() => {
        expect(screen.queryByText("https://leetcode.com/problems/two-sum")).not.toBeInTheDocument();
    });
    fireEvent.change(idButton, { target: { value: "2" } });
    await waitFor(() => {
        expect(screen.queryByText("https://leetcode.com/problems/add-two-numbers")).toBeInTheDocument();
    });
    const links = screen.getAllByRole("link");
    const infoView = links[links.length-1];
    expect(infoView.href).toContain("/info/2");
});

test("Info component test", async () => {
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
    await act( async () => {
        render(
            <MemoryRouter initialEntries={["/info/2"]}>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path='/info/:id' element={
                            <Info/>
                        }>
                        </Route>
                    </Routes>
                </QueryClientProvider>
            </MemoryRouter>
        );
    });
    const infoView = await screen.findByTestId("info-display");
    const queryResult = JSON.parse(infoView.innerHTML);
    const request = await axios.get("http://localhost/api/questions/qid/2");
    expect(queryResult["id"]).not.toBeDefined();
    const compare = request.data;
    delete compare["id"];
    expect(queryResult).toEqual(compare);
});



