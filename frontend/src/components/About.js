import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import LinkIcon from "@mui/icons-material/Link";
import ListItem from "@mui/material/ListItem";
import CircleIcon from "@mui/icons-material/Circle";
import List from "@mui/material/List";

const About = () => {
    const content="This project provide a few features for improving user experience in Leetcode:";
    return (
        <Fragment>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                {content}
            </Typography>
            <List>
                <ListItem disablePadding sx={{ mb: 1 }}>
                    <CircleIcon fontSize="inherit">
                        <LinkIcon />
                    </CircleIcon>
                    <Typography>
                        &nbsp;
                        {"Provide an interactive frontend for different querying options, including some features that does not support by leetcode.com, such as acceptance filter and arrow button for displaying tags"}
                    </Typography>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 1 }}>
                    <CircleIcon fontSize="inherit">
                        <LinkIcon />
                    </CircleIcon>
                    <Typography>
                        &nbsp;
                        {"Be able to access detail of leetcode question by question id in JSON format and redirect to leetcode question page using question id"}
                    </Typography>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 1 }}>
                    <CircleIcon fontSize="inherit">
                        <LinkIcon />
                    </CircleIcon>
                    <Typography>
                        &nbsp;
                        {"Incorporate a CI/CD pipeline, use github actions for automating a cron job to fetch new leetcode problems every day"}
                    </Typography>
                </ListItem>
            </List>
        </Fragment>
    );
};

export default About;