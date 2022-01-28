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

const UsersList = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [foodItems, setFoodItems] = useState([]);
  const [permFoodItems, setPermFoodItems] = useState([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [shopNames, setShopNames] = useState([]);
  const [chosenShopName, setChosenShopName] = useState("");
  const [addOns, setAddOns] = useState([]);
  const [addOnsNameList, setAddOnsNameList] = useState([]);
  const [addOnsPriceList, setAddOnsPriceList] = useState([]);
  const [tags, setTags] = useState([]);
  const [chosenTag, setChosenTag] = useState("");
  const [veg, setVeg] = useState([]);
  const [chosenVeg, setChosenVeg] = useState("");
  const [search, setSearch] = useState("");
  const [wallet, setWallet] = useState(localStorage.getItem("wallet"));
  const [inWallet, setInWallet] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [chosenFoodName,setChosenFoodName] = useState("");
  const [chosenFoodItem,setChosenFoodItem] = useState("");
  const [chosenAddOns,setChosenAddOns] = useState([]);
  const [chosenAddOnsNameList,setChosenAddOnsNameList] = useState([]);
  const [chosenAddOnsPriceList,setChosenAddOnsPriceList] = useState([]);
  const [chosenAddOnIDList,setChosenAddOnIDList] = useState([]);
  const [quantity,setQuantity] = useState(1);
  const [totalCost,setTotalCost] = useState("");

  
  
  

  const onChangeWallet = (event) => {
    setWallet(event.target.value);
  };
  
  const onChangeMin = (event) => {
    setMin(event.target.value);
  };

  const onChangeMax = (event) => {
    setMax(event.target.value);
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const addAddon = (event,addon) => {
    console.log(addon);
    let chosenAddOnID = addon._id;
    let chosenAddOnName = addon.addOnName;
    let chosenAddOnPrice = addon.addOnPrice;
    console.log(chosenAddOnPrice);

    if(!chosenAddOnIDList.includes(chosenAddOnID)){
      setChosenAddOnIDList(chosenAddOns.concat(chosenAddOnID));
      setChosenAddOnsNameList(chosenAddOnsNameList.concat(chosenAddOnName));
      setChosenAddOnsPriceList(chosenAddOnsPriceList.concat(parseInt(chosenAddOnPrice)));
    }else{
      let index = chosenAddOnIDList.indexOf(chosenAddOnID);
      let newChosenAddOns = chosenAddOnIDList.slice(0,index).concat(chosenAddOnIDList.slice(index+1));
      let newChosenAddOnsNameList = chosenAddOnsNameList.slice(0,index).concat(chosenAddOnsNameList.slice(index+1));
      let newChosenAddOnsPriceList = chosenAddOnsPriceList.slice(0,index).concat(chosenAddOnsPriceList.slice(index+1));
      setChosenAddOnIDList(newChosenAddOns);
      setChosenAddOnsNameList(newChosenAddOnsNameList);
      setChosenAddOnsPriceList(newChosenAddOnsPriceList);
    }
  };


  useEffect(() => {
    let temp;
    const newBuyer = {
      email: email
    };
      setOpen(false);
    axios.post("http://localhost:4000/buyer/getWallet", newBuyer)
      .then((response) => {
        setInWallet(response.data.wallet);
        temp = response.data.wallet;
        // console.log("w");
        // console.log(response.data);
      });
  }, [inWallet]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/foodItems")
      .then((response) => {
        setFoodItems(response.data);
        setPermFoodItems(response.data);

        //console.log(permFoodItems);

        let listTags = [];
        response.data.forEach((foodItem) => {
          for (let j = 0; j < foodItem.tag.length; j++) {
            //console.log("hf "+foodItem.tag.length+ foodItem.tag);
            if (!listTags.includes(foodItem.tag[j])) {
              listTags.push(foodItem.tag[j]);
            }
          }
        });

        let listAddOns = [];
        let listAddOnsName = [];
        let listAddOnsPrice = [];
        response.data.forEach((foodItem) => {
          for (let j = 0; j < foodItem.addOns.length; j++) {
            if (!listAddOns.includes(foodItem.addOns[j])) {
              //listAddOns.push(foodItem.addOns[j]);
              listAddOns.push(foodItem.addOns[j]);
              
            }
          }
        });

        response.data.forEach((foodItem) => {
          for (let j = 0; j < foodItem.addOns.length; j++) {
            if (!listAddOnsName.includes(foodItem.addOnsName[j])) {
              listAddOnsName.push(foodItem.addOnsName[j]);
            }
          }
        });

        response.data.forEach((foodItem) => {
          for (let j = 0; j < foodItem.addOns.length; j++) {
            if (!listAddOnsPrice.includes(foodItem.addOnsPrice[j])) {
              listAddOnsPrice.push(foodItem.addOnsPrice[j]);
            }
          }
        });
        console.log("g");
        //console.log(listAddOns);
        console.log(listAddOnsName);
       // console.log(listAddOnsPrice);
        
        let listShopNames = [];
        response.data.forEach((foodItem) => {
          if (!listShopNames.includes(foodItem.shopName)) {
            listShopNames.push(foodItem.shopName);
          }
        });

        setShopNames(listShopNames);
        setTags(listTags);
        setAddOns(listAddOns);
        setAddOnsNameList(listAddOnsName);
        setAddOnsPriceList(listAddOnsPrice);

        //console.log(listAddOns);
        setVeg(['Veg', 'NonVeg']);

        // console.log(listTags);
        // console.log(listShopNames);
        // console.log(tags);
        // console.log(shopNames);
        // console.log(veg);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let result = permFoodItems.slice();
    //console.log(result);

    if (min !== "") {
      result = result.filter((item) => item.price > min);
    }

    if (max !== "") {
      result = result.filter((item) => item.price < max);
    }

    if (chosenShopName !== "" && chosenShopName != null) {
      result = result.filter((item) => item.shopName == chosenShopName);
      //console.log(chosenShopName);
    }

    if (chosenTag !== "" && chosenTag != null) {
      //result = result.filter((item)=> item.tags == chosenShopName);
      //console.log(chosenTag);
      //result = result.filter((item)=> { 
      let flag, counter = 0;
      result.forEach((foodItem) => {
        flag = 0;
        foodItem.tag.forEach((tage) => {
          if (tage == chosenTag) {
            flag = 1;
          }
        });
        if (flag == 0) {
          result.splice(counter, 1);
        }
        counter++;
      });
    }

    if (chosenVeg !== "" && chosenVeg != null) {
      let tempResult = [], pref;

      if (chosenVeg == 'Veg') {
        pref = true;
      }
      else {
        pref = false;
      }

      result.forEach((foodItem) => {
        if (foodItem.veg == pref) {
          tempResult.push(foodItem);
        }
      });

      result = tempResult;
    }

    if (search !== "" && search != null) {
      const fuse = new Fuse(result, {
        keys: ["foodName"],
        threshold: 0.3
      });

      let resultT = fuse.search(search);

      let temp = [];
      resultT.forEach((foodItem) => {
        temp.push(foodItem.item);
      });
      //console.log(resultT);
      result = temp;
    }

    //console.log(result);
    setFoodItems(result);
  }, [min, max, chosenShopName, search, chosenVeg, chosenTag]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let totalAddOnPrice=0;
    
    chosenAddOnsPriceList.forEach((price) => {
      totalAddOnPrice += price;
    }
    );

    console.log(totalAddOnPrice);

    let totalPrice = quantity * (chosenFoodItem.price + totalAddOnPrice);
    console.log(totalPrice);

    const newOrder = {  
      buyerEmail: email,
      foodName: chosenFoodItem.foodName,
      shopName: chosenFoodItem.shopName,
      price: totalPrice,
      veg: chosenFoodItem.veg,
      status: "PLACED",
      quantity: quantity,
      addOns: chosenAddOnsNameList,
      rating: 0,
  };

  if (inWallet >= totalPrice) {
    setInWallet(inWallet - chosenFoodItem.price);
    const newBuyer = {
      email: email,
      wallet: inWallet - chosenFoodItem.price
    };
    axios.post("http://localhost:4000/buyer/setWallet", newBuyer)
      .then((response) => {
        // console.log(response);
      });
    axios.post("http://localhost:4000/orders/addOrder", newOrder)
                          .then((response) => {
                            console.log(response);
                            navigate("/buyerOrders");
                          });
  }else{
    alert("Not enuf money boi");
  }

};

  const handleClickOpen = (event) => {
    setOpen(true);
    console.log(chosenFoodItem);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // setOpen(true);



  return (
    <div>
      <Grid container align={"center"} spacing={2}>
        <List component="nav" aria-label="mailbox folders">
          <ListItem>
            <h1>Amount in Wallet : {inWallet}</h1>
          </ListItem>
        </List>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              value={search}
              onChange={onChangeSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </List>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">

            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Food Prices
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                    onChange={onChangeMin}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                    onChange={onChangeMax}
                  />
                </Grid>
              </Grid>
            </ListItem>

            <Divider />

            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={shopNames}
                onChange={(_, value) => setChosenShopName(value)}
                value={chosenShopName}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Shop Name"
                    variant="outlined"
                  />
                )}
              />
            </ListItem>
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={tags}

                onChange={(_, value) => setChosenTag(value)}
                value={chosenTag}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Tags"
                    variant="outlined"
                  />
                )}
              />
            </ListItem>
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={veg}
                onChange={(_, value) => setChosenVeg(value)}
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

          </List>
        </Grid>

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
                  {/* <TableCell>AddOns</TableCell> */}
                  <TableCell>Price</TableCell>
                  <TableCell>Order</TableCell>
                  
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
                          tags.map((tagItem, ind) => {
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
                    {/* <TableCell>
                      <List>
                        {

                          addOnsNameList.map((addOnItem, ind) => {
                            // addOnsPriceList.map((addOnPriceItem, ind) => {
                            if (foodItem.addOnsName.includes(addOnItem)) {
                              return (
                                <ListItem key={ind}>
                                  <Chip label={addOnItem} />
                                  
                                </ListItem>
                                
                              );
                            }
                          })
                        }
                      </List>

                    </TableCell> */}
                    <TableCell>{foodItem.price}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => {
                      setChosenAddOns(foodItem.addOns);
                      setChosenFoodItem(foodItem);
                      handleClickOpen();
                    }}
                    >
                        Order
                    </Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Food Item</DialogTitle>
        <DialogContent>
          
            <TextField  
              id="standard-basic"
              label="Food Name"
              value={chosenFoodItem.foodName}
            />
            <TextField
              id="standard-basic"
              label="Price"
              value={chosenFoodItem.price}
            />

           <Grid container spacing={2}>
          {
          
           chosenAddOns.map((addon, i) => (
                        <Grid container>
                            <Grid item xs ={12} style={{height: 50}}>
                            <h5>Add-on {i+1}</h5>
                            </Grid>
                            <Grid item xs={5}>
                            <TextField 
                            autoFocus
                            margin="dense"
                            label={"Name"}
                            fullWidth
                            variant="outlined"
                            value={chosenAddOns[i].addOnName}
                            style={{width: 190}}
                            /> 
                            </Grid>
                            <Grid item xs={5}>
                            <TextField 
                            autoFocus
                            margin="dense"
                            label={"Price (in Rs)"}
                            fullWidth
                            variant="outlined"
                            value={chosenAddOns[i].addOnPrice}
                            style={{width: 190}}
                            /> 
                            </Grid>
                            <Grid item xs={2}>
                            <Checkbox aria-label="controlled" onChange={(event) => addAddon(event,addon)} />
                            </Grid>                              
                        </Grid>
                        ))} 
          </Grid>

          <TextField
              id="standard-basic"
              label="Quantity"
              value={quantity}
              onChange  = {(event) => setQuantity(event.target.value)}
            />  


            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersList;

// if (inWallet >= foodItem.price) {
                      //   setInWallet(inWallet - foodItem.price);
                      //   const newBuyer = {
                      //     email: email,
                      //     wallet: inWallet - foodItem.price
                      //   };

                      //   axios.post("http://localhost:4000/buyer/setWallet", newBuyer)
                      //     .then((response) => {
                      //       // console.log(response);
                      //     });
                         

                      //   const newOrder = {
                      //     buyerEmail: email,
                      //     foodName: foodItem.foodName,
                      //     shopName: foodItem.shopName,
                      //     price: foodItem.price,
                      //     veg: foodItem.veg,
                      //     status : "PLACED",
                      //     quantity : 1,
                      //     addOns: ["c"],
                      //     rating: 3,
                      //   };

                      //   //console.log(newOrder);

                      //   axios.post("http://localhost:4000/orders/addOrder", newOrder)
                      //     .then((response) => {
                      //       //console.log(response);
                      //       navigate("/buyerOrders");
                      //     });
                      //   //setFoodItems(foodItems.filter((item) => item.foodName !== foodItem.foodName));
                      // }