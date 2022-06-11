import React from "react";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { queryContext } from "../../contexts/context";
import debounce from "lodash/debounce";


const Acceptance = () => {
    const { state, changeAcceptance, changePage } = useContext(queryContext);

    const callHttpRequest = (eventSrcDesc, newValue) => {
        changeAcceptance(newValue);
    };

    const [stateDebounceCallHttpRequest] = useState(() =>
        debounce(callHttpRequest, 100, {
            leading: false,
            trailing: true
        })
    );
    const [tempAcceptance, setTempAcceptance] = useState(state.acceptance);

    const handleChangeAcceptance = (event) => {
        setTempAcceptance(event.target.value);
        stateDebounceCallHttpRequest("", event.target.value);
        changePage(1);
    };
    return (
        <Box sx={{ m: 1, width: "20%" }}>
            <Typography gutterBottom>Acceptance</Typography>
            <Slider
                aria-label="Always visible"
                defaultValue={0}
                step={1}
                value={tempAcceptance}
                onChange={handleChangeAcceptance}
                valueLabelDisplay="auto"
                data-testid="slider"
            />
        </Box>
    );
};

export default Acceptance;