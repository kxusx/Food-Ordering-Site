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
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";


const VendorStatistics = (props) => {
    const navigate = useNavigate();
    const [vendor, setVendor] = useState([]);
    const [orders, setOrders] = useState([]);
    const [shopName, setShopName] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [ordersPlacedCount, setOrdersPlacedCount] = useState(0);
    const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
    const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
    const [list, setList] = useState([]);
    const [listNames,setListNames] = useState([]);

    useEffect(() => {
        const v = {
            email: email,
        }
        let x = 0, y = 0, z = 0;
        let arr = [];
        axios.post("http://localhost:4000/vendor/getVendor", v)
            .then(res => {
                setVendor(res.data);
                setShopName(res.data.shopName);
                console.log(res.data);
                console.log("s");
                console.log(res.data.shopName);
                const newOrder = {
                    shopName: res.data.shopName,
                }

                console.log(newOrder);
                axios.post("http://localhost:4000/orders/getOrderBasedOnShop", newOrder)
                    .then((response) => {

                        setOrders(response.data);
                        console.log(response.data);
                        response.data.forEach(order => {

                            if (order.status === "COMPLETED") {
                                x = x + 1;
                                //console.log("completed");
                                setCompletedOrdersCount(x);
                                if (!arr.some(food => food.name === order.foodName)) {
                                    arr.push({ name: order.foodName, quantity: order.quantity })
                                    //console.log("efwef");
                                }
                                else
                                    arr.map(food => {
                                        if (food.name === order.foodname)
                                            food.quantity += order.quantity
                                    })
                            } else if (order.status === "ACCEPTED" || order.status === "COOKING" || order.status === "READY FOR PICKUP") {
                                y = y + 1;
                               // console.log("pending");
                                setPendingOrdersCount(y);
                            }
                            z = z + 1;
                            setOrdersPlacedCount(z);
                            arr.sort((a, b) => b.quantity - a.quantity)

                        });
                        setList(arr);
                        //console.log(arr);

                    });
            });


        console.log(x + y + z);
        console.log(listNames);

        //console.log(orders);



    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Shop Name</TableCell>
                                    <TableCell>Orders Placed</TableCell>
                                    <TableCell>Pending Orders</TableCell>
                                    <TableCell>Completed Orders</TableCell>
                                    <TableCell>Top 5</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{shopName}</TableCell>
                                    <TableCell>{ordersPlacedCount}</TableCell>
                                    <TableCell>{pendingOrdersCount}</TableCell>

                                    <TableCell>{completedOrdersCount}</TableCell>
                                    <TableCell>
                                        <List>
                                            {
                                                
                                                list.map((tagItem, ind) => {
                                                    return (
                                                        <ListItem key={ind}>
                                                            <Chip label={tagItem.name} />
                                                        </ListItem>
                                                    );
                                                })
                                            }
                                        </List>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );

};
export default VendorStatistics;
