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
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { Checkbox } from "@mui/material";

const vendorStatistics = (props) => {
    const [orders, setOrders] = useState([]);
    const [ordersPlacedCount, setOrdersPlacedCount] = useState(0);
    const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
    const [completedOrdersCount, setCompletedOrdersCount] = useState(0);

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
};
export default vendorStatistics;