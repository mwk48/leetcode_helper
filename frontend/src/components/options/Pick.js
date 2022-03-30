import React from "react";
import Button from "@mui/material/Button";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import apiClient from "../../requests/client";
import { useQuery } from "react-query";
import { useState, useContext } from "react";
import { queryContext } from "../../contexts/context";

const Pick = () => {
    const { state } = useContext(queryContext);
    const [id, setId] = useState(1);
    const randomQuery = useQuery(
        ["random", state],
        async () => {
            return await apiClient.request({
                url: "/questions/ids",
                method: "get",
                params: {
                    page: state.page,
                    limit: state.limit,
                    acceptance: state.acceptance,
                    tags: state.tags,
                    difficulty: state.difficulty,
                    paid: state.paid
                },
            });
        }, {
            manual: true,
            enabled: false
        });
    const idQuery = useQuery("id",
        async () => {
            console.log(id);
            return await apiClient.get(`/questions/qid/${id}`);
        }, {
            manual: true,
            enabled: false
        });
    const randomQuestion = async () => {
        const result = await randomQuery.refetch();
        if (result.data.data.length===0) {
            return;
        }
        const randomItem = result.data.data[Math.floor(Math.random() * result.data.data.length)];
        setId(randomItem["questionId"]);
        await new Promise(r => setTimeout(r, 10));
        const selectQuestion = await idQuery.refetch();
        window.open(selectQuestion.data.data.url, "_blank", "noopener,noreferrer");
        //console.log(selectQuestion, id, result.data.data.length);
    };
    return (
        <Button variant="outlined" startIcon={<ShuffleIcon />} onClick={randomQuestion} sx={{ m: 1, width: "8%" }}>
            Pick One
        </Button>
    );
};

export default Pick;