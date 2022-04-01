import React, { Fragment, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LinkIcon from "@mui/icons-material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import apiClient from "../requests/client";
import { useQuery, setLogger } from "react-query";
import { Link as RouterLink } from "react-router-dom";

const Helper = () => {
    setLogger({
        log: () => {},
        warn: () => {},
        error: () => {},
    });

    const introduction = "Enter leetcode question id below, and click the url below to access the question.";
    const [id, setId] = useState("1");
    const handleChangeId = (event) => {
        setId(event.target.value);
    };
    const helperQuery = useQuery(
        ["helper", id],
        async () => {
            return await apiClient.get(`/questions/qid/${id}`);
        }, {
            manual: true,
            enabled: false,
            onError: (err) => {
                const error = err.response?.data || err;
                console.log(error);
            }
        });
    const [url, setUrl] = useState(null);
    useEffect( async () => {
        setUrl(null);
        const response = await helperQuery.refetch();
        if (response.status==="success") {
            setUrl(response.data.data.url);
        }
    }, [id]);
    return (
        <Fragment>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                {introduction}
            </Typography>
            <TextField label="Id" value={id} onChange={handleChangeId} variant="standard" fullWidth sx={{ maxWidth: "30%", mb: 2 }} />
            <List>
                <ListItem disablePadding >
                    <ListItemIcon>
                        <LinkIcon />
                    </ListItemIcon>
                    <Typography>
                        {"Corresponding LeetCode problem:"}
                        &nbsp;
                        &nbsp;
                    </Typography>
                    <Typography component={"a"} href={url} target="_blank" rel="noopener" sx={{ textDecoration: "none" }}>
                        {url}
                    </Typography>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon>
                        <LinkIcon />
                    </ListItemIcon>
                    <Typography>
                        {"Corresponding LeetCode problem in JSON: "}
                    </Typography>
                    <Typography component={RouterLink} to={`/info/${id}`} target="_blank" rel="noopener" sx={{ textDecoration: "none" }}>
                        &nbsp;
                        &nbsp;
                        {url ? `JSON data of question ${id}` : null}
                    </Typography>
                </ListItem>
            </List>
        </Fragment>
    );
};

export default Helper;