import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { userIDAtom } from "../global/user-state";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { refreshTokens, requestTokens } from "../utils/auth";
import { getRecoil } from "recoil-nexus";
import { get } from "../utils/http";
import { logout } from "../api/auth";

function Root() {
  const userId = useRecoilValue(userIDAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only use this is the user ID is not null
    if (userId != null) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const grab = async () => {
      try {
        await requestTokens();
        setLoading(false);
      } catch (e) {
        navigate("/login");
      }
    };
    // Otherwise, attempt to grab refresh tokens
    grab();
  }, [userId, navigate]);

  return (
    <>
      {!loading && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <RestaurantMenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                TAJ Assassin
              </Typography>
              <Button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                color="inherit"
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Outlet />
        </Box>
      )}
    </>
  );
}

export default Root;
