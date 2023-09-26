import { BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import { gameInfoAtom, userIDAtom } from "../global/user-state";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { requestTokens } from "../utils/auth";

// Componenets
import { Box, Button, Spinner, Stack, Text } from "@chakra-ui/react";
import { getActiveGame } from "api/game";
import { register } from "api/game/player";

function Register() {
  const gameInfo = useRecoilValue(gameInfoAtom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Attempt to auto login
  useEffect(() => {
    // Only use this is the user ID is not null
    if (gameInfo != null) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const grab = async () => {
      try {
        const game = await getActiveGame();
        console.log(game);
        if (game.registered) navigate("/app/leaderboard");
      } catch {
        setLoading(false);
      }
    };
    // Otherwise, attempt to grab refresh tokens
    grab();
  }, [gameInfo, navigate]);

  console.log(gameInfo?.status);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      {!loading && gameInfo ? (
        <Stack alignItems="center" justifyContent="center">
          <Text align="center" width="300px">
            You're not registered yet. Click below to register for{" "}
            {gameInfo.name.toUpperCase()}.
          </Text>
          <Text color="red.800" fontWeight="bold" align="center" width="400px">
            By clicking the button below, you recognize you will be entered in a
            fearsome battle for victory, and that friendships may be broken,
            souls destroyed, and hopes crushed in the process. Proceed with
            caution.
          </Text>
          <Button
            width="400px"
            onClick={async () => {
              if (!gameInfo) return;

              try {
                await register(gameInfo.gameId);
              } catch {
                setError(true);
                return;
              }

              await getActiveGame();
              navigate("/app/leaderboard");
            }}
            isDisabled={gameInfo.status !== "SETUP" || error}
          >
            {gameInfo.status === "SETUP"
              ? "Register!"
              : "Game has already started."}
          </Button>
          {error && (
            <Text align="center" width="300px" color="red.400">
              There was an error registering for this game. Make sure you are
              using the correct account and try again.
            </Text>
          )}
        </Stack>
      ) : (
        <Spinner size="xl" />
      )}
    </Box>
  );
}

export default Register;
