import React from "react";
import { useContext } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { queryContext } from "../../contexts/context";


const Tag = ({ tags }) => {
    const { state, changePage, changeTags } = useContext(queryContext);
    const handleChangeTags = (event) => {
        changeTags(event.target.value);
        changePage(1);
    };
    return (
        <FormControl sx={{ m: 1, width: "20%" }}>
            <InputLabel>Tags</InputLabel>
            <Select
                multiple
                value={state.tags}
                onChange={handleChangeTags}
                input={<OutlinedInput label="Tags" />}
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
    );
};

export default Tag;