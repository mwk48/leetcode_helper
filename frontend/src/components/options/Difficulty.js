import React from "react";
import { useContext } from "react";
import { queryContext } from "../../contexts/context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const Difficulty = () => {
    const { state, changeDifficulty, changePage } = useContext(queryContext);
    const handleChangeDifficulty = (event) => {
        changeDifficulty(event.target.value);
        changePage(1);
    };
    return (
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
    );
};

export default Difficulty;