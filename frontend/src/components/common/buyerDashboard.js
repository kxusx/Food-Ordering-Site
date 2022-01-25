import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
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

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const UsersList = (props) => {
  const [foodItems, setFoodItems] = useState([]);
  const [permFoodItems, setPermFoodItems] = useState([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [shopNames, setShopNames] = useState([]);
  const [chosenShopName, setChosenShopName] = useState("");
  const [tags, setTags] = useState([]);
  const [chosenTag,setChosenTag] = useState("");
  const [veg, setVeg] = useState([]);
  const [chosenVeg, setChosenVeg] = useState("");
  const [search, setSearch] = useState("");

  const onChangeMin = (event) => {
    setMin(event.target.value);
  };

  const onChangeMax = (event) => {
    setMax(event.target.value);
  };

  const reset = () => {
    setChosenShopName("");
    setChosenTag("");
    setChosenVeg("");
    
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/foodItems")
      .then((response) => {
        setFoodItems(response.data);
        setPermFoodItems(response.data);
        console.log(permFoodItems);

        let listTags = [];
        response.data.forEach((foodItem) => {
          for (let j = 0; j < foodItem.tag.length; j++) {
            //console.log("hf "+foodItem.tag.length+ foodItem.tag);
            if (!listTags.includes(foodItem.tag[j])) {
                listTags.push(foodItem.tag[j]);
            }
          }
        });

        //   response.data.forEach((foodItem) => {
        //   foodItem.tag.forEach((tage) => {
        //     if (!listTags.includes(tage)) {
        //       listTags.push(tage);
        //     }
        //   });
        // });

        let listShopNames = [];
        response.data.forEach((foodItem) => {
          if (!listShopNames.includes(foodItem.shopName)) {
            listShopNames.push(foodItem.shopName);
          }
        });

        setShopNames(listShopNames);
        setTags(listTags);
        setVeg(['Veg', 'NonVeg']);

        console.log(listTags);
        console.log(listShopNames);
        console.log(tags);
        console.log(shopNames);
        console.log(veg);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let result = permFoodItems.slice();
    console.log(result);
    if (min !== "") {
      result = result.filter((item)=> item.price > min);
      // for (let i = 0; i < result.length; i++) {
      //   if (result[i].price < Number(min)) {
      //     result.splice(i, 1);
      //     console.log(result);
      //   }
      // }
    }

    if (max !== "") {
      result = result.filter((item)=> item.price < max);
    }

    if (chosenShopName !== "" && chosenShopName != null ) {
      result = result.filter((item)=> item.shopName == chosenShopName);
      console.log(chosenShopName);
    }

    if (chosenTag !== "" && chosenTag != null ) {
      //result = result.filter((item)=> item.tags == chosenShopName);
      console.log(chosenTag);
      //result = result.filter((item)=> { 
      let flag,counter=0;
      result.forEach((foodItem) => {
        flag=0;
        foodItem.tag.forEach((tage) => {
          if(tage == chosenTag){
            flag=1;
          }
        });
        if(flag==0){
          result.splice(counter, 1);
        }
        counter++;
      });
    }
    
    if (chosenVeg !== "" && chosenVeg != null ) {
      let tempResult = [],pref;

      if(chosenVeg=='Veg'){
        pref = true;}
      else{
        pref = false;
      }

      result.forEach((foodItem) => {
        if (foodItem.veg ==pref) {
          tempResult.push(foodItem);
        }
      });

      result = tempResult;
    }

    console.log(result);
    
    setFoodItems(result);
    //reset();
  }, [min, max, chosenShopName, search, chosenVeg, chosenTag]);

  return (
    <div>
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
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            // onChange={customFunction}
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
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foodItems.map((foodItem, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{foodItem.foodName}</TableCell>
                    <TableCell>{foodItem.shopName}</TableCell>
                    {foodItem.veg === true && (
                      <TableCell>Veg</TableCell>
                    )}
                    {foodItem.veg === false && (
                      <TableCell>NonVeg</TableCell>
                    )}

                    <TableCell>{foodItem.tag}</TableCell>
                    <TableCell>{foodItem.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersList;
