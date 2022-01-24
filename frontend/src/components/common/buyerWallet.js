import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Link from '@mui/material/Link';
import { useEffect } from "react";
import { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

const BuyerWallet = (props) => {
    const [wallet, setWallet] = useState(localStorage.getItem("wallet"));
    const [email, setEmail] = useState(localStorage.getItem("email"));

    const onChangeWallet = (event) => {
        setWallet(event.target.value);
    };

    const onAddToWallet = (event) => {
        event.preventDefault();

        const newWallet = {
            wallet: wallet,
            email: email
        }

        axios
            .post("http://localhost:4000/buyer/addToWallet", newWallet)
            .then((response) => {
                alert("Created\t" + response.data.name);
                console.log(response.data);
            });

    };

    return (
        <Grid container align={"center"} spacing={2}>
             <Grid item xs={12}>
                <TextField
                    label="Current Wallet Balance"
                    variant="outlined"
                    value={wallet}
                    onChange={onChangeWallet} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Add To Wallet"
                    variant="outlined"
                    value={wallet}
                    onChange={onChangeWallet} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onAddToWallet}>
                    Update
                </Button>
            </Grid>
        </Grid>
    );
};

export default BuyerWallet;