import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import apiClient from "../requests/client";

const Info = () => {
    const id = useParams().id;
    const infoQuery = useQuery(["info", id],
        async () => {
            return await apiClient.get(`/questions/qid/${id}`);
        }, {
            onError: (err) => {
                const error = err.response?.data || err;
                console.log(error);
            },
        });
    const [result, setResult] = useState(null);
    useEffect( async () => {
        if (infoQuery.status === "success") {
            delete infoQuery.data.data["id"];
            setResult(infoQuery.data.data);
        }
    }, [infoQuery]);
    if (result===null) {
        return null;
    }
    return (
        <pre data-testid="info-display">
            {JSON.stringify(result, null, 4)}
        </pre>
    );

};

export default Info;