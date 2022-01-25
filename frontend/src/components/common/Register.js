import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Register = (props) => {
  const [choice, setChoice] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);
  const [password, setPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [age, setAge] = useState("");
  const [batchName, setBatchName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [shopName, setShopName] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  const onChangeManagerName = (event)=>{
    setManagerName(event.target.value);
  } 

  const onChangeShopName = (event)=>{
    setShopName(event.target.value);
  }

  const onChangeOpeningTime = (event)=>{
    setOpeningTime(event.target.value);
  }

  const onChangeClosingTime = (event)=>{
    setClosingTime(event.target.value);
  }

  const onChangeBuyername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeContactNo = (event) => {
    setContactNo(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatchName = (event) => {
    setBatchName(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setManagerName("");
    setShopName("");
    setOpeningTime("");
    setClosingTime("");
    setPassword("");
    setContactNo("");
    setAge("");
    setBatchName("");
    setDate(null);
  };

  const onSubmitBuyer = (event) => {
    event.preventDefault();

    const newBuyer = {
      name: name,
      email: email,
      password: password,
      contactNo: contactNo,
      age: age,
      batchName: batchName,
      wallet:0,
      date: Date.now(),
    };

    axios
      .post("http://localhost:4000/buyer/register", newBuyer)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  const onSubmitVendor = (event) => {
    event.preventDefault();

    const newVendor = {
      managerName: managerName,
      shopName: shopName,
      email: email,
      password: password,
      contactNo: contactNo,
      openingTime: openingTime,
      closingTime: closingTime,
      date: Date.now(),
    };

    axios
      .post("http://localhost:4000/vendor/register", newVendor)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  if(choice==1){
    return (
      <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={choice}
            label="Choose"
            onChange={handleChange}
          >
            <MenuItem value={2}>Vendor</MenuItem>
            <MenuItem value={1}>Buyer</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={onChangeBuyername} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={onChangePassword} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact Number"
              variant="outlined"
              value={contactNo}
              onChange={onChangeContactNo} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              variant="outlined"
              value={age}
              onChange={onChangeAge} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Batch Name"
              variant="outlined"
              value={batchName}
              onChange={onChangeBatchName} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitBuyer}>
              Register
            </Button>
          </Grid>
        </Grid>
      </>
  
    );
  }else{
    return (
      <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={2}
            label="Choose"
            onChange={handleChange}
          >
            <MenuItem value={2}>Vendor</MenuItem>
            <MenuItem value={1}>Buyer</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Manager Name"
              variant="outlined"
              value={managerName}
              onChange={onChangeManagerName} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Shop Name"
              variant="outlined"
              value={shopName}
              onChange={onChangeShopName} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={onChangePassword} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact Number"
              variant="outlined"
              value={contactNo}
              onChange={onChangeContactNo} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Opening Time"
              variant="outlined"
              value={openingTime}
              onChange={onChangeOpeningTime} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Closing Time"
              variant="outlined"
              value={closingTime}
              onChange={onChangeClosingTime} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitVendor}>
              Register
            </Button>
          </Grid>
        </Grid>
      </>
  
    );
  }

};

export default Register;
