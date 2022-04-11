import React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { queryContext } from "../../contexts/context";


const Acceptance = () => {
    const { state, changeAcceptance, changePage } = useContext(queryContext);
    const handleChangeAcceptance = (event) => {
        changeAcceptance(event.target.value);
        changePage(1);
    };
    return (
        <Box sx={{ m: 1, width: "20%" }}>
            <Typography gutterBottom>Acceptance</Typography>
            <Slider
                aria-label="Always visible"
                defaultValue={0}
                step={1}
                value={state.acceptance}
                onChange={handleChangeAcceptance}
                valueLabelDisplay="auto"
                data-testid="slider"
            />
        </Box>
    );
};

export default Acceptance;