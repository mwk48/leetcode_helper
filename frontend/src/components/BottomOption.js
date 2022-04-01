import React from "react";
import Limit from "./options/Limit";
import Stack from "@mui/material/Stack";
import Page from "./options/Page";
import { memo } from "react";

const BottomOption = memo(function BottomOption({ totalPage }) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
        >
            <Limit></Limit>
            <Page totalPage={totalPage}></Page>
        </Stack>
    );
});

export default BottomOption;