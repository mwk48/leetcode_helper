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
            manual: true,
            enabled: false
        });
    const [result, setResult] = useState(null);
    useEffect( async () => {
        const response = await infoQuery.refetch();
        delete response.data.data["id"];
        setResult(response.data.data);
    }, []);
    if (result===null) {
        return null;
    }
    return (
        <pre>
            {JSON.stringify(result, null, 4)}
        </pre>
    );

};

export default Info;