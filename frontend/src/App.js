import React from "react";
import { useEffect, useState, useContext } from "react";
import apiClient from "./requests/client";
import { useQuery } from "react-query";
import { queryContext } from "./contexts/context";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const App = () => {
    const { changeTags, state, changeAcceptance, changeDifficulty, changePaid, clearAll, changePage, changeLimit } = useContext(queryContext);
    const [tags, setTags] = useState(null);
    const [items, setItems] = useState(null);

    const itemQuery = useQuery(
        ["leetcode", state],
        async () => {
            return await apiClient.request({
                url: "/questions",
                method: "get",
                params: {
                    page: state.page,
                    limit: state.limit,
                    acceptance: state.acceptance,
                    tags: state.tags,
                    difficulty: state.difficulty,
                    paid: state.paid
                },
            });
        },

        {
            onError: (err) => {
                const error = err.response?.data || err;
                console.log(error);
            },
        }
    );
    const tagQuery = useQuery("tags",
        async () => {
            return await apiClient.get("/tags");
        }, {
            onError: (err) => {
                const error = err.response?.data || err;
                console.log(error);
            },
        });
    const handleChangeTags = (event) => {
        changeTags(event.target.value);
        changePage(1);
    };
    const handleChangeAcceptance = (event) => {
        changeAcceptance(event.target.value);
        changePage(1);
    };
    const handleChangeDifficulty = (event) => {
        changeDifficulty(event.target.value);
        changePage(1);
    };
    const handleChangePaid = (event) => {
        changePaid(event.target.value);
        changePage(1);
    };
    const handleChangePage  = (event, value) => {
    //console.log(value, typeof value)
        changePage(value);
    };
    const handleChangeLimit  = (event) => {
        changeLimit(event.target.value);
        changePage(1);
    };
    useEffect(() => {
        if (itemQuery.status === "success") {
            //console.log(itemQuery.data.data)
            setItems(itemQuery.data.data);
        }
    }, [itemQuery]);
    useEffect(() => {
        if (tagQuery.status === "success") {
            //console.log(tagQuery.data.data)
            setTags(tagQuery.data.data.tags.sort((a, b) => a < b ? -1 : a > b ? 1 : 0));
        }
    }, [tagQuery]);
    if (!tags || !items) {
        return (<div></div>);
    }
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Tag</InputLabel>
                <Select
                    multiple
                    value={state.tags}
                    onChange={handleChangeTags}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 500 } } }}
                >
                    {tags.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={state.tags.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography gutterBottom>Acceptance</Typography>
            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="Always visible"
                    defaultValue={0}
                    step={1}
                    onChange={handleChangeAcceptance}
                    valueLabelDisplay="auto"
                />
            </Box>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Difficulty</InputLabel>
                <Select
                    value={state.difficulty}
                    label="Difficulty"
                    onChange={handleChangeDifficulty}
                >
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={"Easy"}>Easy</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Hard"}>Hard</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Paid</InputLabel>
                <Select
                    value={state.paid}
                    label="Paid"
                    onChange={handleChangePaid}
                >
                    <MenuItem value={""}>All</MenuItem>
                    <MenuItem value={"false"}>Free</MenuItem>
                    <MenuItem value={"true"}>Premium</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" onClick={() => clearAll()}>Clear</Button>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={state.limit}
                    onChange={handleChangeLimit}
                >
                    <MenuItem value={25}>25 / page</MenuItem>
                    <MenuItem value={50}>50 / page</MenuItem>
                    <MenuItem value={100}>100 / page</MenuItem>
                </Select>
            </FormControl>
            <Stack spacing={2}>
                <Pagination count={items.totalPages} onChange={handleChangePage} value={state.page}/>
            </Stack>
        </div>
    );
};
export default App;
