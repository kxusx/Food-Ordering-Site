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
    const [wallet, setWallet] = useState(localStorage.getItem("wallet"));
    const [inWallet, setInWallet] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));

    useEffect(() => {
        let temp;
        const newBuyer = {
          email: email
        };
    
        axios.post("/api/buyer/getWallet", newBuyer)
          .then((response) => {
            setInWallet(response.data.wallet);
            temp = response.data.wallet;
            // console.log("w");
            // console.log(response.data);
          });
      }, [inWallet]);

    useEffect(() => {
        const newOrder={
            email:buyerEmail,
        }
        axios.post("/api/orders/getOrder", newOrder)
            .then((response) => {
                setOrders(response.data);
                console.log(response.data);
            });
    }, [buyerEmail]);

    return(
        <div>
        <Grid container align={"center"} spacing={2}>
        <List component="nav" aria-label="mailbox folders">
          <ListItem>
            <h1>Amount in Wallet : {inWallet}</h1>
          </ListItem>
        </List>
        </Grid>

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
                </TableRow>
              </TableHead>
              <TableBody>
                  {orders.map((order, index) => (
                      <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{order.createdAt}</TableCell>
                            <TableCell>{order.shopName}</TableCell>
                            <TableCell>{order.foodName}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell> {order.status}</TableCell>
                            <TableCell>{order.price}</TableCell>
                            <TableCell>{order.rating}</TableCell>
                        </TableRow>
                    ))}
              </TableBody>
        </Table>
        </Paper>
        </Grid>
        </div>
            
    );


}
export default BuyerOrders;