import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import Chip from '@mui/material/Chip';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Fuse from "fuse.js";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";

const VendorAddFoodItems = (props) => {
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]);
    const [shopName, setShopName] = useState(localStorage.getItem("shopName"));
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
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
    const [addOnFlag, setAddOnFlag] = useState(false);
    const [tagFlag, setTagFlag] = useState(false);

    const onChangeFoodName = (e) => {
        setFoodName(e.target.value);
    };

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    };

    const onChangeChosenVeg = (e) => {
        //console.log(e.target.value);
        console.log(e);
        setChosenVeg(e);
    };

    const onChangeAddOnName = (e) => {
        setAddOnName(e.target.value);
    };

    const onChangeAddOnPrice = (e) => {
        setAddOnPrice(e.target.value);
    };

    const onChangeTag = (e) => {
        setTag(e.target.value);
    };

    const onClickAddAddOns = () => {
        if (addOnName === "" || addOnPrice === "") {
            alert("Please fill all the fields");
        } else {
            
            let addon = {"addOnName": addOnName, "addOnPrice": addOnPrice};
             //setAddOns(addOns.concat(addon));
            setAddOns(prev => [...prev, addon]);
            setAddOnsNameList(prev => [...prev, addOnName]);
            setAddOnsPriceList(prev => [...prev, parseInt(addOnPrice)]);

            setAddOnName("");
            setAddOnPrice("");
        }
    };

    const onClickAddTags = () => {
        if (tag === "") {
            alert("Please fill all the fields");
        } else {
            setTags([...tags, tag]);
            setTag("");
            setTagFlag(true);
        }
    };

    const submitFoodItem = (event) => {
        event.preventDefault();
        console.log("c"+chosenVeg);
        console.log("p"+price);
        console.log("f"+foodName);
        console.log(tags);
        console.log(addOns);
        // console.log(addOnsNameList);
        // console.log(addOnsPriceList);

        if (foodName === "" || price === "" || chosenVeg === "") {
            alert("Please fill all the fields");
        }
        else {
            const data = {
                shopName: shopName,
                price: parseInt(price),
                foodName: foodName,
                veg: chosenVeg === "Veg" ? true:false,
                tag: tags,
                addOns:addOns,
                addOnsName: addOnsNameList,
                addOnsPrice: addOnsPriceList,
                rating: 0,     
            };
            console.log(data);
            axios.post("/api/foodItems/addFoodItems", data)
                .then(res => {
                    alert("Food Item Added");
                    //navigate("/vendor/foodItems");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };



    return (
        <div>
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
                <Grid item xs={12}>
                    <TextField
                        label="Add On Name"
                        variant="outlined"
                        value={addOnName}
                        onChange={onChangeAddOnName} />
                    <TextField
                        label="Add On Price"
                        variant="outlined"
                        value={addOnPrice}
                        onChange={onChangeAddOnPrice} />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClickAddAddOns}
                    >Add</Button>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Tag"
                        variant="outlined"
                        value={tag}
                        onChange={onChangeTag} />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClickAddTags}
                    >Add</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitFoodItem}
                    >Submit Food Item
                    </Button>
                </Grid>

            </Grid>
        </div>
    )

};

export default VendorAddFoodItems;