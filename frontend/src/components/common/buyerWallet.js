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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
    const [inWallet,setInWallet] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));

    const onChangeWallet = (event) => {
        setWallet(event.target.value);
    };



    useEffect(() => {

        const newBuyer = {
            email: email
          };
      
          axios.post("/api/buyer/getWallet",newBuyer)
            .then((response) => {
              setInWallet(response.data.wallet);
            });
    }, [inWallet]);

    const onAddToWallet = (event) => {
        event.preventDefault();
        console.log(parseInt(wallet)+parseInt(inWallet));
        

        const newWallet = {
            wallet: wallet,
            email: email
        }
        axios
            .post("/api/buyer/addToWallet", newWallet)
            .then((response) => {
                //alert("Added " + wallet);
                setWallet(response.data.wallet);
                console.log(response.data);
            });
            setInWallet(parseInt(wallet)+parseInt(inWallet));

    };

    return (
        <Grid container align={"center"} spacing={2}>
            <List component="nav" aria-label="mailbox folders">
                <ListItem>
                    <h1>Amount in Wallet : {inWallet}</h1>
                </ListItem>
            </List>
            <Grid item xs={12}>
                <TextField
                    label="Add To Wallet"
                    variant="outlined"
                    
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