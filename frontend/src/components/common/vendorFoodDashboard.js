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

const VendorFoodDashboard = (props) => {
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]);
    const [shopName, setShopName] = useState(localStorage.getItem("shopName"));
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [buyerEmail, setBuyerEmail] = useState(localStorage.getItem("email"));
    const [veg, setVeg] = useState("");
    const [status, setStatus] = useState("");
    const [addOns, setAddOns] = useState("");
    const [rating, setRating] = useState("");
    const [wallet, setWallet] = useState(localStorage.getItem("wallet"));
    const [inWallet, setInWallet] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultsVeg, setSearchResultsVeg] = useState([]);
    const [searchResultsNonVeg, setSearchResultsNonVeg] = useState([]);
    const [searchResultsVegFuse, setSearchResultsVegFuse] = useState([]);
    const [searchResultsNonVegFuse, setSearchResultsNonVegFuse] = useState([]);
    const [searchResultsVegFuse2, setSearchResultsVegFuse2] = useState([]);
    const [searchResultsNonVegFuse2, setSearchResultsNonVegFuse2] = useState([]);
    const [searchResultsVegFuse3, setSearchResultsVegFuse3] = useState([]);
    const [searchResultsNonVegFuse3, setSearchResultsNonVegFuse3] = useState([]);
    const [searchResultsVegFuse4, setSearchResultsVegFuse4] = useState([]);
    const [searchResultsNonVegFuse4, setSearchResultsNonVegFuse4] = useState([]);



    useEffect(() => {
        const fooditems = {
            shopName: shopName,
        }
        console.log(fooditems);
        console.log(shopName);
        axios.post("http://localhost:4000/FoodItems/getFoodItems", fooditems)
            .then((response) => {
                setFoodItems(response.data);
                console.log(response.data);
            });
    },[]);

    return (
        <div>
            <Grid item xs={12} md={9} lg={9}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell> Sr No.</TableCell>
                                <TableCell>Food Name</TableCell>
                                <TableCell>Shop Name</TableCell>
                                <TableCell>Veg/NonVeg</TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foodItems.map((foodItem, ind) => (
                                <TableRow key={ind}>
                                    <TableCell>{ind + 1}</TableCell>
                                    <TableCell>{foodItem.foodName}</TableCell>
                                    <TableCell>{foodItem.shopName}</TableCell>
                                    {foodItem.veg === true && (
                                        <TableCell>Veg</TableCell>
                                    )}
                                    {foodItem.veg === false && (
                                        <TableCell>NonVeg</TableCell>
                                    )}
                                    <TableCell>
                                        <List>
                                            {
                                                foodItem.tag.map((tagItem, ind) => {
                                                    if (foodItem.tag.includes(tagItem)) {
                                                        return (
                                                            <ListItem key={ind}>
                                                                <Chip label={tagItem} />
                                                            </ListItem>
                                                        );
                                                    }
                                                })
                                            }
                                        </List>
                                    </TableCell>
                                    <TableCell>{foodItem.price}</TableCell>
                                    <TableCell><Button variant ="contained" color="primary" onClick={() => {
                                        navigate("/editFoodItems")
                                            
                                        localStorage.setItem("_id", foodItem._id);
                                        
                                    }}>Edit</Button>
                                    </TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </div>
    );

};
export default VendorFoodDashboard;