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
