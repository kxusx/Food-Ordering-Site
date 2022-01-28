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

const EditFoodItem = (props)=>{
    const navigate = useNavigate();

    const [shopName, setShopName] = useState(localStorage.getItem("shopName"));
    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState("");
    const [veg, setVeg] = useState("");
    const [chosenVeg, setChosenVeg] = useState([]);
    const [addOns, setAddOns] = useState([]);
    const [rating, setRating] = useState("");
    const [addOnName, setAddOnName] = useState("");
    const [addOnPrice, setAddOnPrice] = useState("");
    const [addOnsNameList, setAddOnsNameList] = useState([]);
    const [addOnsPriceList, setAddOnsPriceList] = useState([]);
    const [tags, setTags] = useState("");
    const [tag, setTag] = useState("");

    return(
        <TextField>
            fh
        </TextField>
    );
};

export default EditFoodItem;