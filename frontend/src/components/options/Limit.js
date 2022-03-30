import React from "react";
import { useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { queryContext } from "../../contexts/context";


const Limit = () => {
    const { state, changeLimit, changePage } = useContext(queryContext);
    const handleChangeLimit  = (event) => {
        changeLimit(event.target.value);
        changePage(1);
    };
    return (
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
    );
};

export default Limit;