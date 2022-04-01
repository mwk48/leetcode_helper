import React from "react";
import { memo } from "react";
import Stack from "@mui/material/Stack";
import Acceptance from "./options/Acceptance";
import Difficulty from "./options/Difficulty";
import Clear from "./options/Clear";
import Paid from "./options/Paid";
import Tag from "./options/Tag";
import Pick from "./options/Pick";

const TopOption = memo(function TopOption({ tags }) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            sx={{ mb: 2 }}
        >
            <Tag tags={tags}></Tag>
            <Acceptance></Acceptance>
            <Difficulty></Difficulty>
            <Paid></Paid>
            <Pick></Pick>
            <Clear></Clear>
        </Stack>
    );
});

export default TopOption;