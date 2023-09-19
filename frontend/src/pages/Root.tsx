import { Box, Button, Text } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
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
          <Box
            width="100%"
            height="50px"
            backgroundColor="facebook.200"
            display={"flex"}
            flexDir="row"
            padding="16px"
            alignItems={"center"}
            fontWeight={"extrabold"}
          >
            <Text fontSize="2xl">TAJ ASSASSIN</Text>
            <Button marginLeft="auto">Logout</Button>
          </Box>
          <Outlet />
        </Box>
      )}
    </>
  );
}

export default Root;
