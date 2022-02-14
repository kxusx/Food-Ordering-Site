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

const VendorOrdersList = (props) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [shopName, setShopName] = useState(localStorage.getItem("shopName"));
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [veg, setVeg] = useState("");
    const [chosenVeg, setChosenVeg] = useState("");
    const [addOns, setAddOns] = useState("");
    const [rating, setRating] = useState("");
    const [addOnName, setAddOnName] = useState("");
    const [addOnPrice, setAddOnPrice] = useState("");
    const [addOnsNameList, setAddOnsNameList] = useState([]);
    const [addOnsPriceList, setAddOnsPriceList] = useState([]);
    const [tags, setTags] = useState("");
    const [tag, setTag] = useState("");
    const [addOnFlag, setAddOnFlag] = useState(false);
    const [tagFlag, setTagFlag] = useState(false);
    const [buyerEmail, setBuyerEmail] = useState("");
    const [status, setStatus] = useState("");
    const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
    const [acceptedOrdersCount, setAcceptedOrdersCount] = useState(0);
    const [wallet, setWallet] = useState(0);

    useEffect(() => {
        const newOrder = {
            shopName: shopName,
        }
        axios.post("http://localhost:4000/orders/getOrderBasedOnShop", newOrder)
            .then((response) => {
                setOrders(response.data);

            });
    }, []);

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }


    return (
        <div>


            <Grid container align={"center"} spacing={2}>
                <List component="nav" aria-label="mailbox folders">
                    <ListItem>
                        <h1>Your Orders</h1>
                    </ListItem>
                </List>
            </Grid>

            <Grid item xs={12} md={9} lg={9}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell> Sr No.</TableCell>
                                <TableCell> Placed Time</TableCell>
                                <TableCell>Shop Name</TableCell>
                                <TableCell>Food Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Move</TableCell>
                                <TableCell>Reject</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{order.createdAt}</TableCell>
                                    <TableCell>{order.shopName}</TableCell>
                                    <TableCell>{order.foodName}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell> {order.status}</TableCell>
                                    <TableCell>{order.price}</TableCell>
                                    <TableCell>{order.rating}</TableCell>
                                    <TableCell><Button variant="contained" color="secondary" onClick={() => {
                                        let count = 0;
                                        for (let i = 0; orders[i] != undefined; i++)
                                            if (orders[i].status == "ACCEPTED" || orders[i].status == "COOKING")
                                                count++;
                                        // console.log(order);
                                        // console.log(count);
                                        let str = "";
                                        if (order.status === "PLACED" && count < 10) {
                                            str = "ACCEPTED"
                                            //setStatus("ACCEPTED");
                                        } else if (order.status === "ACCEPTED") {
                                            str = "COOKING"
                                            // setStatus("COOKING");
                                        } else if (order.status === "COOKING") {
                                            str = "READY FOR PICKUP"
                                            // setStatus("READY FOR PICKUP");
                                        } else if (order.status === "READY FOR PICKUP") {
                                            str = "COMPLETED"
                                            //setStatus("COMPLETED");
                                        } else {
                                            if(count>=10)
                                            alert("cannot accept more than 10 orders");
                                            else
                                            alert("cannot move more");
                                        }
                                        setStatus(str);
                                        const newOrder = {
                                            _id: order._id,
                                            status: str,

                                        }
                                        console.log(newOrder);
                                        axios.post("http://localhost:4000/orders/updateOrder", newOrder)
                                            .then((response) => {
                                                console.log(response.data);
                                                // setOrders(response.data);
                                            });
                                        //  alert("Order moved to "+str);
                                        window.location.reload();
                                    }}>Move</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => {
                                            if (order.status == "PLACED") {
                                                const newOrder = {
                                                    _id: order._id,
                                                    status: "REJECTED",
                                                }
                                                console.log(newOrder);
                                                axios.post("http://localhost:4000/orders/updateOrder", newOrder)
                                                    .then((response) => {
                                                        console.log(response.data);
                                                        // setOrders(response.data);
                                                    });


                                                let orderCost = order.price;
                                                let buyerEmail = order.buyerEmail;
                                                let walletBalance = 0;
                                                console.log(buyerEmail);

                                                // const o = {
                                                //     email: buyerEmail,
                                                // }
                                                // axios.post("http://localhost:4000/buyer/getWallet", o)
                                                //     .then((response) => {
                                                //         walletBalance = response.data.wallet;
                                                //         setWallet(walletBalance);
                                                //     });

                                                // console.log("w"+walletBalance);
                                                // console.log(wallet);
                                                console.log(orderCost);
                                                const newUser = {
                                                    email: buyerEmail,
                                                    wallet: parseInt(orderCost),
                                                }
                                                console.log(newUser);
                                                axios.post("http://localhost:4000/buyer/addToWallet", newUser)
                                                    .then((response) => {
                                                        console.log(response.data);
                                                        // setOrders(response.data);
                                                    });


                                                // window.location.reload();
                                            } else {
                                                alert("Order cannot be rejected");
                                            }
                                        }}>Reject</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </div>

    );
};

export default VendorOrdersList;