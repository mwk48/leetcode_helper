import React from "react";
import Button from "@mui/material/Button";
import ShuffleIcon from "@mui/icons-material/Shuffle";

const Pick = ({ items }) => {
    const randomQuestion = () => {
        if (items.docs.length<=0) {
            return;
        }
        const randomItem = items.docs[Math.floor(Math.random() * items.docs.length)];
        console.log(randomItem);
    };
    return (
        <Button variant="outlined" startIcon={<ShuffleIcon />} onClick={randomQuestion} sx={{ m: 1, width: "8%" }}>
            Pick One
        </Button>
    );
};

export default Pick;