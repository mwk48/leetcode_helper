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

test("Non-query components (pick, clear, table) work", async () => {
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
    window.open = jest.fn();
    await waitFor(() => {
        expect(screen.queryByText("Home")).toBeInTheDocument();
    });
    const pickButton = screen.getByText("Pick One");
    fireEvent.click(pickButton);
    await waitFor(() => {
        expect(window.open).toHaveBeenCalledTimes(1);
        const call = window.open.mock.calls[0];
        expect(call).toContain("_blank");
        expect(call).toContain("noopener,noreferrer");
        const url = call[0];
        expect(docs.some(doc => doc.url===url)).toBeTruthy();
    });
    //userEvent.click(difficulty);
    const slider = screen.getByRole("slider");
    expect(slider.value).toBe("0");
    fireEvent.change(slider, { target: { value: "2" } });
    expect(slider.value).toBe("2");
    const limit = screen.getByText("100 / page");
    fireEvent.mouseDown(limit);
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText("25 / page"));
    expect(screen.getAllByText("25 / page")).toHaveLength(2);
    expect(screen.getAllByText("100 / page")).toHaveLength(1);
    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);
    expect(slider.value).toBe("0");
    expect(screen.getAllByText("25 / page")).toHaveLength(1);
    expect(screen.getAllByText("100 / page")).toHaveLength(2);

    const tagButtons = screen.getAllByTestId("show-tag");
    expect(tagButtons).toHaveLength(docs.length);
    //fireEvent.click(tagButtons[0]);
    let index=0;
    expect(screen.queryByText("Array, Hash Table")).toBeDefined();
    for (let doc of docs) {
        const { tags, difficulty, acceptance, title, paid, url, questionId } = doc;
        fireEvent.click(tagButtons[index++]);
        const tagString = tags.join(", ");
        expect(screen.queryAllByText(tagString).length>=1).toBeTruthy();
        const question = `${questionId}. ${title}`;
        const questionLink = screen.getByText(question);
        expect(questionLink.getAttribute("href")).toBe(url);
    }
    const tableHead = [...response.container.querySelectorAll("th")].map(t => t.textContent);
    const headers = ["Title", "Acceptance", "Difficulty", "Premium"];
    expect(headers.every(h => tableHead.includes(h))).toBeTruthy();
});

