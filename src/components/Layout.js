import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useStateContext from "../hooks/useStateContext";

function Layout() {
    const { resetContex } = useStateContext();
    const navigate = useNavigate();

    const logout = () => {
        resetContex();
        navigate("/");
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar sx={{ width: 640, m: 'auto' }}>
                    <Typography variant="h4" align="center" style={{ flexGrow: 1 }}>
                        Quiz App
                    </Typography>
                    <Button onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}

export default Layout