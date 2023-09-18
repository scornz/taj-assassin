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
import { BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import { userIDAtom } from "../global/user-state";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { requestTokens } from "../utils/auth";

function Login() {
  const userId = useRecoilValue(userIDAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Attempt to auto login
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
        navigate("/app");
      } catch {
        setLoading(false);
      }
    };
    // Otherwise, attempt to grab refresh tokens
    grab();
  }, [userId, navigate]);

  return (
    <>
      {!loading && (
        <Button
          onClick={async () => {
            window.location.href = `${BASE_URL}/auth/google`;
          }}
        >
          Login With Google
        </Button>
      )}
    </>
  );
}

export default Login;
