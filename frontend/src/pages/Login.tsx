import { BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import { userIDAtom } from "../global/user-state";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { requestTokens } from "../utils/auth";

// Componenets
import { Box, Button, Spinner, Stack, Text } from "@chakra-ui/react";

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
        navigate("/app/leaderboard");
      } catch {
        setLoading(false);
      }
    };
    // Otherwise, attempt to grab refresh tokens
    grab();
  }, [userId, navigate]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      {!loading ? (
        <Stack alignItems="center">
          <Text width="90%" align="center">
            Welcome to
          </Text>
          <Text
            fontSize="12vw"
            bgGradient="linear(to-l, gray.300, yellow.400, pink.200)"
            bgClip="text"
            fontWeight="extrabold"
            mt="-6"
          >
            TAJ ASSASSIN
          </Text>
          <Text width="90%" maxWidth="500px" align="center" mt="6" mb="6">
            In the dimly lit hallways of a club shrouded in secrecy, a sinister
            game of assassin unfolds. Each participant becomes a shadow, lurking
            in the darkest corners, awaiting the perfect moment to strike. The
            only rule: trust no one, for the line between friend and foe blurs
            into a chilling uncertainty. As the clock ticks relentlessly,
            tension tightens like a noose, and the relentless pursuit of power
            and survival plunges them deeper into a web of treachery from which
            there is no escape. In this merciless contest, the price of failure
            is eternally ominous.
          </Text>
          <Text width="90%" maxWidth="500px" align="center" fontWeight="bold">
            Use your{" "}
            <Box display="inline" maxWidth="500px" fontWeight="extrabold">
              princeton.edu
            </Box>{" "}
            email in order to join the chaos soon to unfold.
          </Text>
          <Button
            onClick={async () => {
              window.location.href = `${BASE_URL}/auth/google`;
            }}
          >
            Login With Google
          </Button>
        </Stack>
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
}

export default Login;
