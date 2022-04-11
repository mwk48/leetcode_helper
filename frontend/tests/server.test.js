import "@testing-library/jest-dom";
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import Provider from "../src/contexts/context";
import CssBaseline from "@mui/material/CssBaseline";
import {
    BrowserRouter,
} from "react-router-dom";
import App from "../src/App";
import nock from "nock";
import { initialState } from "../src/reducers/reducer";

const server = setupServer(
    rest.get("http://localhost/api/tags", (req, res, ctx) => {
    // Respond with a mocked user token that gets persisted
    // in the `sessionStorage` by the `Login` component.
        return res(ctx.delay(100), ctx.json({
            tags: [
                "Array",
                "Hash Table",
                "Linked List",
                "Math",
                "Recursion",
                "String",
                "Sliding Window",
                "Binary Search",
                "Divide and Conquer",
                "Dynamic Programming"
            ],
            status: "success"
        }));
    }),
    rest.get("http://localhost/api/questions", (req, res, ctx) => {
        return res(ctx.delay(100), ctx.json({
            docs: [
                {
                    id: "62539b8b83d09a8bcc803229",
                    tags: [
                        "Array",
                        "Hash Table"
                    ],
                    difficulty: "Easy",
                    acceptance: 48.46381898929599,
                    title: "Two Sum",
                    paid: false,
                    url: "https://leetcode.com/problems/two-sum",
                    questionId: 1
                },
                {
                    id: "62539b8c83d09a8bcc803230",
                    tags: [
                        "Linked List",
                        "Math",
                        "Recursion"
                    ],
                    difficulty: "Medium",
                    acceptance: 38.47745152865502,
                    title: "Add Two Numbers",
                    paid: false,
                    url: "https://leetcode.com/problems/add-two-numbers",
                    questionId: 2
                },
                {
                    id: "62539b8d83d09a8bcc803237",
                    tags: [
                        "Hash Table",
                        "String",
                        "Sliding Window"
                    ],
                    difficulty: "Medium",
                    acceptance: 32.99174800156544,
                    title: "Longest Substring Without Repeating Characters",
                    paid: false,
                    url: "https://leetcode.com/problems/longest-substring-without-repeating-characters",
                    questionId: 3
                },
                {
                    id: "62539b8d83d09a8bcc80323e",
                    tags: [
                        "Array",
                        "Binary Search",
                        "Divide and Conquer"
                    ],
                    difficulty: "Hard",
                    acceptance: 33.981914983089894,
                    title: "Median of Two Sorted Arrays",
                    paid: false,
                    url: "https://leetcode.com/problems/median-of-two-sorted-arrays",
                    questionId: 4
                },
                {
                    id: "62539b8e83d09a8bcc803245",
                    tags: [
                        "String",
                        "Dynamic Programming"
                    ],
                    difficulty: "Medium",
                    acceptance: 31.74526450216048,
                    title: "Longest Palindromic Substring",
                    paid: false,
                    url: "https://leetcode.com/problems/longest-palindromic-substring",
                    questionId: 5
                },
                {
                    id: "62539b8f83d09a8bcc80324c",
                    tags: [
                        "String"
                    ],
                    difficulty: "Medium",
                    acceptance: 41.36604190065059,
                    title: "Zigzag Conversion",
                    paid: false,
                    url: "https://leetcode.com/problems/zigzag-conversion",
                    questionId: 6
                },
                {
                    id: "62539b9083d09a8bcc803253",
                    tags: [
                        "Math"
                    ],
                    difficulty: "Medium",
                    acceptance: 26.641020708433043,
                    title: "Reverse Integer",
                    paid: false,
                    url: "https://leetcode.com/problems/reverse-integer",
                    questionId: 7
                },
                {
                    id: "62539b9183d09a8bcc80325a",
                    tags: [
                        "String"
                    ],
                    difficulty: "Medium",
                    acceptance: 16.501664616491492,
                    title: "String to Integer (atoi)",
                    paid: false,
                    url: "https://leetcode.com/problems/string-to-integer-atoi",
                    questionId: 8
                },
                {
                    id: "62539b9183d09a8bcc803261",
                    tags: [
                        "Math"
                    ],
                    difficulty: "Easy",
                    acceptance: 52.318916842883624,
                    title: "Palindrome Number",
                    paid: false,
                    url: "https://leetcode.com/problems/palindrome-number",
                    questionId: 9
                },
                {
                    id: "62539b9283d09a8bcc803268",
                    tags: [
                        "String",
                        "Dynamic Programming",
                        "Recursion"
                    ],
                    difficulty: "Hard",
                    acceptance: 28.217458908092436,
                    title: "Regular Expression Matching",
                    paid: false,
                    url: "https://leetcode.com/problems/regular-expression-matching",
                    questionId: 10
                }
            ],
            status: "success"
        }));
    }),
);
const queryCache = new QueryCache();
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
    server.resetHandlers();
    queryCache.clear();
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("allows the user to log in", async () => {
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
    response.debug(undefined, 300000);
});
