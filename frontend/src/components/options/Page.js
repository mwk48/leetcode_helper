import React from "react";
import { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import { queryContext } from "../../contexts/context";


const Page = ({ totalPage }) => {
    const { state, changePage } = useContext(queryContext);
    const handleChangePage  = (event, value) => {
        //console.log(value, typeof value)
        changePage(value);
    };
    return (
        <Pagination count={totalPage} onChange={handleChangePage} page={state.page}/>
    );
};

export default Page;