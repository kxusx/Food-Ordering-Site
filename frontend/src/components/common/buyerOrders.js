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

const BuyerOrders = (props) => {
    const [orders, setOrders] = useState([]);
    const [shopName, setShopName] = useState("");
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [buyerEmail, setBuyerEmail] = useState(localStorage.getItem("email"));
    const [veg, setVeg] = useState("");
    const [status, setStatus] = useState("");
    const [addOns, setAddOns] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        const newOrder={
            email:buyerEmail,
        }

        axios.post("http://localhost:4000/orders/getOrder", newOrder)
            .then((response) => {
                setOrders(response.data);
                console.log(response.data);
            });
    }, []);

}
export default BuyerOrders;