import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function GoogleAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const get = async () => {
      console.log(window.location.search);
      const res = await axios.get(
        `http://localhost:6060/auth/google/callback${window.location.search}`
      );
      console.log(res.status);
      navigate("/app/leaderboard");
    };
    get();
  }, [navigate]);

  return <h1>Hello123</h1>;
}

export default GoogleAuthCallback;
