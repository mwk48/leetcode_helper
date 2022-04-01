import React from "react";
import { useState, Fragment, memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const TableView = memo(function TableView({ items }) {
    const Row = ({ row }) => {
        //console.log(row);
        const [open, setOpen] = useState(false);
        return (
            <Fragment>
                <TableRow>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Link href={row.url} target="_blank" rel="noopener" style={{ textDecoration: "none" }}>
                            {`${row.questionId}.${row.title}`}
                        </Link>
                    </TableCell>
                    <TableCell align="right">{row.acceptance.toFixed(1)}{"%"}</TableCell>
                    <TableCell align="right">{row.difficulty}</TableCell>
                    <TableCell align="right">{row.paid ? "Y" : "N"}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    Tags
                                </Typography>
                                <Typography gutterBottom>
                                    {row.tags.join(", ")}
                                </Typography>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        );
    };
    return (
        <TableContainer component={Paper} sx={{ mb: 2, "&:last-child th, &:last-child td": {
            borderBottom: 0,
        } }}>
            <Table aria-label="collapsible table" size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Acceptance</TableCell>
                        <TableCell align="right">Difficulty</TableCell>
                        <TableCell align="right">Premium</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.docs.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default TableView;