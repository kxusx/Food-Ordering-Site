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
import ListItem from "@mui/material/ListItem";
import Autocomplete from "@mui/material/Autocomplete";

const EditFoodItem = (props) => {
    const navigate = useNavigate();
    const [foodItem, setFoodItem] = useState([]);
    const [shopName, setShopName] = useState(localStorage.getItem("shopName"));
    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState("");
   
    const [chosenVeg, setChosenVeg] = useState([]);
    const [addOns, setAddOns] = useState([]);
    const [rating, setRating] = useState("");
    const [addOnName, setAddOnName] = useState("");
    const [addOnPrice, setAddOnPrice] = useState("");
    const [addOnsNameList, setAddOnsNameList] = useState([]);
    const [addOnsPriceList, setAddOnsPriceList] = useState([]);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");

    useEffect(() => {
        console.log("fgh");
        let id = localStorage.getItem("_id")
        console.log(id);
        const o = {
            _id: id,
        }
        axios
            .post("/api/foodItems/getFoodItemBasedOnID", o)
            .then((response) => {
                console.log("fh");
                console.log(response.data);
                setFoodItem(response.data);
                setFoodName(response.data.foodName);
                setPrice(response.data.price);
                setRating(response.data.rating);
                setChosenVeg(response.data.veg);
                setAddOns(response.data.addOns);
                // setAddOnsNameList(response.data.addOnsNameList);
                // setAddOnsPriceList(response.data.addOnsPriceList);
                setTags(response.data.tag);
            })
    }, []);

    const onChangeFoodName = (e) => {
        setFoodName(e.target.value);
    }
    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }
    // const onChangeVeg = (e) => {
    //     setVeg(e.target.value);
    // }
    const onChangeChosenVeg = (e) => {
        setChosenVeg(e.target.value);
    }
    // const onChangeAddOns = (e) => {
    //     setAddOns(e.target.value);
    // }
    // const onChangeRating = (e) => {
    //     setRating(e.target.value);
    // }
    // const onChangeAddOnName = (e) => {
    //     setAddOnName(e.target.value);
    // }
    // const onChangeAddOnPrice = (e) => {
    //     setAddOnPrice(e.target.value);
    // }
    // const onChangeTags = (e) => {
    //     setTags(e.target.value);
    // }
    // const onChangeTag = (e) => {
    //     setTag(e.target.value);
    // }


    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Food Name"
                    variant="outlined"
                    value={foodName}
                    onChange={onChangeFoodName} />
            </Grid>
            <Grid item xs={12}>
                <TextField

                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={onChangePrice} />
            </Grid>
            <Grid item xs={12}>
                <ListItem divider>
                    <Autocomplete
                        id="combo-box-demo"
                        options={["Veg", "NonVeg"]}
                        onChange={(_, value) => onChangeChosenVeg(value)}
                        value={chosenVeg}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Veg/NonVeg"
                                variant="outlined"
                            />
                        )}
                    />
                </ListItem>
            </Grid>
            <Grid container spacing={2}>{
                addOns.map((addon, i) => (
                    <Grid container>
                        <Grid item xs={12} style={{ height: 50 }}>
                            <h5>Add-on {i + 1}</h5>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label={"Name"}
                                fullWidth
                                variant="outlined"
                                value={addon.addOnName}
                                style={{ width: 190 }}
                                onChange={(e) => {
                                    let arr = []
                                    addOns.map(taddOn => {
                                        if (taddOn === addon) {
                                            arr.push({_id:addon._id, addOnName: e.target.value, addOnPrice: addon.addOnPrice});
                                        }
                                        else {
                                            arr.push(taddOn);
                                        }
                                    })
                                    setAddOns(arr);
                                }}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label={"Price"}
                                fullWidth
                                variant="outlined"
                                value={addon.addOnPrice}
                                style={{ width: 190 }}
                                onChange={(e) => {
                                    let arr = []
                                    addOns.map(taddOn => {
                                        if (taddOn === addon) {
                                            arr.push({_id:addon._id, addOnName: addon.addOnName, addOnPrice: e.target.value});
                                        }
                                        else {
                                            arr.push(taddOn);
                                        }
                                    })
                                    setAddOns(arr);
                                }}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={2}>{
                tags.map((tag, i) => (
                    <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label={"Tag"}
                            fullWidth
                            variant="outlined"
                            value={tag}
                            style={{ width: 190 }}
                            onChange={(e) => {
                                let arr = []
                                tags.map(ttag => {
                                    if (ttag === tag)
                                        arr.push(e.target.value)
                                    else
                                        arr.push(ttag)
                                })
                                setTags(arr);
                            }}
                        />
                    </Grid>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={() => {
                const o = {
                    _id: localStorage.getItem("_id"),
                    shopName: localStorage.getItem("shopName"),
                    price: price,
                    foodName: foodName,        
                    veg: chosenVeg === "Veg" ? true:false,
                    tag: tags,
                    addOns: addOns,
                    rating: rating,
                }
                console.log(o);
                axios
                    .post("/api/foodItems/updateFoodItem", o)
                    .then((response) => {
                        console.log(response.data);
                        alert("Food Item Updated");
                    })
            }}>Update</Button>
        </Grid>
    );
};

export default EditFoodItem;