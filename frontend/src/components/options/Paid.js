import React from "react";
import { useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { queryContext } from "../../contexts/context";


const Paid = () => {
    const { state, changePaid, changePage } = useContext(queryContext);
    const handleChangePaid = (event) => {
        changePaid(event.target.value);
        changePage(1);
    };
    return (
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
    );
};

export default Paid;