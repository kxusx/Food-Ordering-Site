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

const VendorProfile = (props) => {
    const navigate = useNavigate();
    const [managerName, setManagerName] = useState("");
    const [shopName, setShopName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [password, setPassword] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");

    const onChangeManagerName = (event) => {
        setManagerName(event.target.value);
    }
    const onChangeShopName = (event) => {
        setShopName(event.target.value);
    }
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }
    const onChangeContactNo = (event) => {
        setContactNo(event.target.value);
    }
    const onChangeOpeningTime = (event) => {
        setOpeningTime(event.target.value);
    }
    const onChangeClosingTime = (event) => {
        setClosingTime(event.target.value);
    }

    useEffect(() => {
        const o = {
            email: email,
        }
        axios.post("/api/vendor/getVendor", o)
            .then(res => {
                console.log(res.data);
                setManagerName(res.data.managerName);
                setShopName(res.data.shopName);
                setPassword(res.data.password);
                setContactNo(res.data.contactNo);
                setOpeningTime(res.data.openingTime);
                setClosingTime(res.data.closingTime);
            });
    }, []);

    const onSubmitVendor = (event) => {
        event.preventDefault();
        const vendor = {
            managerName: managerName,
            shopName: shopName,
            email: email,
            password: password,
            contactNo: contactNo,
            openingTime: openingTime,
            closingTime: closingTime
        };
        axios.post('/api/vendor/changeProfile', vendor)
            .then((response) => {
                alert("Update");
                console.log(response.data);
            });
    };


    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Manager Name"
                    variant="outlined"
                    value={managerName}
                    onChange={onChangeManagerName} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Shop Name"
                    variant="outlined"
                    value={shopName}
                    onChange={onChangeShopName} />
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
                    label="Opening Time"
                    variant="outlined"
                    value={openingTime}
                    onChange={onChangeOpeningTime} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Closing Time"
                    variant="outlined"
                    value={closingTime}
                    onChange={onChangeClosingTime} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmitVendor}>
                    Update
                </Button>
            </Grid>
        </Grid>
    );

};
export default VendorProfile;