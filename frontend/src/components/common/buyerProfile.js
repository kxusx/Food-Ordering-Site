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

const BuyerProfile = (props) => {
    const [profileDetails, setProfileDetails] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [password, setPassword] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [age, setAge] = useState("");
    const [batchName, setBatchName] = useState("");

    const onChangeBuyername = (event) => {
        setName(event.target.value);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeContactNo = (event) => {
        setContactNo(event.target.value);
    };

    const onChangeAge = (event) => {
        setAge(event.target.value);
    };

    const onChangeBatchName = (event) => {
        setBatchName(event.target.value);
    };
    
    
    useEffect(() => {
        const o ={
            email:email,
        }
        axios.post("/api/buyer/getUser", o)
        .then(res => {
            console.log(res.data);
            setProfileDetails(res.data);
            setName(res.data.name);
            setPassword(res.data.password);
            setContactNo(res.data.contactNo);
            setAge(res.data.age);
            setBatchName(res.data.batchName);
        });
    },[]);

        const onSubmitBuyer = (event) => {
            event.preventDefault();

            const newBuyer = {
                name: name,
                email: email,
                password: password,
                contactNo: contactNo,
                age: age,
                batchName: batchName,
                date: Date.now(),
            };

            axios
                .post("/api/buyer/changeProfile", newBuyer)
                .then((response) => {
                    alert("Update");
                    console.log(response.data);
                });
        };


        return (
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={onChangeBuyername} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={onChangeEmail} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={onChangePassword} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Contact Number"
                        variant="outlined"
                        value={contactNo}
                        onChange={onChangeContactNo} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Age"
                        variant="outlined"
                        value={age}
                        onChange={onChangeAge} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Batch Name"
                        variant="outlined"
                        value={batchName}
                        onChange={onChangeBatchName} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmitBuyer}>
                        Update
                    </Button>
                </Grid>
            </Grid>
        );
    
};

export default BuyerProfile;