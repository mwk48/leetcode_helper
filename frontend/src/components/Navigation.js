import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
const Navigation = () => {

    return (

        <AppBar position="static" sx={{ mb: 2 }}>
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <Button component={RouterLink} to="/" color="inherit"><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Home
                    </Typography>
                    </Button>
                    <Button component={RouterLink} to="/helper" color="inherit"><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Helper
                    </Typography>
                    </Button>
                    <Button component={RouterLink} to="/about" color="inherit"><Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                About
                    </Typography>
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navigation;