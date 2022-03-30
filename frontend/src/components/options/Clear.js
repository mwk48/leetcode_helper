import React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import { queryContext } from "../../contexts/context";


const Clear = () => {
    const { clearAll } = useContext(queryContext);
    return (
        <Button variant="contained" onClick={() => clearAll()} sx={{ m: 1, width: "8%" }}>Clear</Button>
    );
};

export default Clear;