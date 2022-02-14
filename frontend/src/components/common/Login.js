import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Link from '@mui/material/Link';
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
import {useNavigate} from "react-router-dom";


const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const [choice, setChoice] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        if(choice==1){
            const newBuyer = {
                email: email,
                password: password
            };
            axios
                .post("http://localhost:4000/buyer/login", newBuyer)
                .then((response) => {
                    localStorage.setItem("id",response.data._id);
                    localStorage.setItem("name",response.data.name);
                    localStorage.setItem("email",response.data.email);
                    localStorage.setItem("password",response.data.password);
                    localStorage.setItem("name",response.data.password);
                    localStorage.setItem("batchName",response.data.batchName);
                    localStorage.setItem("contactNo",response.data.contactNo);
                    localStorage.setItem("age",response.data.age);
                    localStorage.setItem("wallet",response.data.wallet);
                    alert("Logined Buyer");
                    console.log(response.data);
                    console.log(response.data._id);
                    navigate("/buyerDashboard");
                }).catch(err => {
                    alert("Invalid Email or Password");
                    console.log(err);
                });
        }else{
            const newVendor = {
                email: email,
                password: password
            };
    
            axios
                .post("http://localhost:4000/vendor/login", newVendor)
                .then((response) => {
                    localStorage.setItem("id",response.data._id);
                    localStorage.setItem("managerName",response.data.managerName);
                    localStorage.setItem("shopName",response.data.shopName);
                    localStorage.setItem("email",response.data.email);
                    localStorage.setItem("password",response.data.password);
                    localStorage.setItem("contactNo",response.data.contactNo);
                    localStorage.setItem("openingTime",response.data.openingTime)
                    ;
                    localStorage.setItem("closingTime",response.data.closingTime);
                    alert("Logined vendor");
                    console.log(response.data);
                    navigate("/vendorProfile");
                }).catch(err => {
                    alert("Invalid Email or Password");
                    console.log(err);
                });
        }
        
    };

    const handleChange = (event) => {
        setChoice(event.target.value);
      };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={choice}
                                label="Choose"
                                onChange={handleChange}
                            >
                                <MenuItem value={2}>Vendor</MenuItem>
                                <MenuItem value={1}>Buyer</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}