import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/vendorFoodDashboard")}
          >
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/vendorProfile")}>
            Profile
          </Button>

          <Button color="inherit" onClick={() => navigate("/vendorAddFoodItems")}>
            Add Food Items
          </Button>
         <Button color="inherit" onClick={() => navigate("/vendorOrdersList")}>
            Orders List
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendorStatistics")}>
            Statistics
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendorLogout")}>
            Logout
          </Button>

          
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
