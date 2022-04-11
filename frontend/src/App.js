import React from "react";
import { useEffect, useState, useContext } from "react";
import apiClient from "./requests/client";
import { useQuery } from "react-query";
import { queryContext } from "./contexts/context";
import Grid from "@mui/material/Grid";
import TableView from "./components/TableView";
import TopOption from "./components/TopOption";
import BottomOption from "./components/BottomOption";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import Helper from "./components/Helper";
import Info from "./components/Info";
import About from "./components/About";

const App = () => {
    const { state } = useContext(queryContext);
    const [tags, setTags] = useState(null);
    const [items, setItems] = useState(null);
    //console.log(items);
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
    useEffect(() => {
        if (itemQuery.status === "success") {
            //console.log(itemQuery.data.data)
            setItems(itemQuery.data.data);
            /*
            window.scroll({
                top: document.body.offsetHeight,
                left: 0,
                behavior: "smooth",
            });
            */
        }
    }, [itemQuery]);
    useEffect(() => {
        if (tagQuery.status === "success") {
            //console.log(tagQuery.data.data);
            setTags(tagQuery.data.data.tags.sort((a, b) => a < b ? -1 : a > b ? 1 : 0));
        }
    }, [tagQuery]);
    if (!tags || !items) {
        return (<div></div>);
    }
    return (

        <Grid
            container
            spacing={0}
            direction="column"
            style={{ minHeight: "100vh", width: "90%", margin: "auto" }}
        >

            <Routes>
                <Route path="/" element={
                    <>
                        <Navigation>
                        </Navigation>
                        <TopOption tags={tags} >
                        </TopOption>
                        <TableView items={ items }>
                        </TableView>
                        <BottomOption totalPage={items.totalPages}>
                        </BottomOption>
                    </>
                } />
                <Route path="/helper" element={
                    <>
                        <Navigation>
                        </Navigation>
                        <Helper>
                        </Helper>
                    </>
                } />
                <Route path="/about" element={
                    <>
                        <Navigation>
                        </Navigation>
                        <About>
                        </About>
                    </>
                } />
                <Route path="/info/:id" element={
                    <>
                        <Info>
                        </Info>
                    </>
                } />
            </Routes>
        </Grid>
        /*
        <Grid
            container
            spacing={0}
            direction="column"
            style={{ minHeight: "100vh", width: "90%", margin: "auto" }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
            >
                <FormControl sx={{ m: 1, width: "20%" }}>
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
                <Box sx={{ m: 1, width: "20%" }}>
                    <Typography gutterBottom>Acceptance</Typography>
                    <Slider
                        aria-label="Always visible"
                        defaultValue={0}
                        step={1}
                        onChange={handleChangeAcceptance}
                        valueLabelDisplay="auto"
                    />
                </Box>
                <FormControl sx={{ m: 1, width: "12%" }}>
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
                <FormControl sx={{ m: 1, width: "12%" }}>
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
                <Button variant="contained" onClick={() => clearAll()} sx={{ m: 1, width: "8%" }}>Clear</Button>
            </Stack>
            <TableContainer component={Paper} >
                <Table aria-label="collapsible table" size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Acceptance</TableCell>
                            <TableCell align="right">Difficulty</TableCell>
                            <TableCell align="right">Premium</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.docs.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
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
                <Pagination count={items.totalPages} onChange={handleChangePage} page={state.page}/>
            </Stack>
        </Grid>
        */
    );
};

export default App;
