import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

// State
import { useRecoilValue } from "recoil";
import { gameInfoAtom } from "global/user-state";

// API
import { fetchLeaderboard } from "api/game/target";
import { LeaderboardPlayerInfo } from "shared/api/game/player";

// Components
import { EventCountdown } from "components/Countdown";

// Tabs
import AllTargets from "./admin/AllTargets";
import TargetAssignment from "./tabs/TargetAssignment";
import Rules from "./tabs/Rules";
import Safety from "./tabs/Safety";
import { GameInfo } from "shared/api/game";

/**
 * The main page for the application. Displays the leaderboard and all relevant
 * tabs.
 */
function Leaderboard() {
  // All leaderboard players

  const navigate = useNavigate();
  const gameInfo = useRecoilValue(gameInfoAtom);

  useEffect(() => {
    // Only use this is the user ID is not null
    // TODO: Remove this so unregistered users can view the leaderboard
    if (gameInfo === undefined || gameInfo.role === "NONE") {
      navigate("/app/register");
      return;
    }
  }, [gameInfo, navigate]);

  if (gameInfo === undefined) {
    return null;
  }

  // List of all tabs for admins
  const adminTabs = (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList>
        <Tab>Leaderboard</Tab>
        <Tab>All Targets</Tab>
        <Tab>Safety</Tab>
        <Tab>Rules</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <LeaderboardList gameInfo={gameInfo} />
        </TabPanel>
        <TabPanel>
          <AllTargets />
        </TabPanel>
        <TabPanel>
          <Stack alignItems="center" width="100%">
            {gameInfo && <Safety gameInfo={gameInfo} />}
          </Stack>
        </TabPanel>
        <TabPanel>
          <Stack alignItems="center" width="100%">
            <Rules />
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  // List of all tabs for the player
  const playerTabs = (
    <Tabs variant="soft-rounded" colorScheme="red">
      <TabList>
        <Tab>Leaderboard</Tab>
        <Tab>Your Target</Tab>
        <Tab>Safety</Tab>
        <Tab>Rules</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <LeaderboardList gameInfo={gameInfo} />
        </TabPanel>
        <TabPanel>
          <Stack alignItems="center" width="100%">
            <TargetAssignment />
          </Stack>
        </TabPanel>
        <TabPanel>
          <Stack alignItems="center" width="100%">
            {gameInfo && <Safety gameInfo={gameInfo} />}
          </Stack>
        </TabPanel>
        <TabPanel>
          <Stack alignItems="center" width="100%">
            <Rules />
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  // NOTE: There are two different sets of tabs (one for admins and one for )
  return <Box m={4}>{gameInfo?.role === "ADMIN" ? adminTabs : playerTabs}</Box>;
}

function LeaderboardList({ gameInfo }: { gameInfo: GameInfo }) {
  const [data, setData] = useState<LeaderboardPlayerInfo[]>([]);

  useEffect(() => {
    /* Grab user information on the leaderboard, make sure alive players are
    listed first, and then sort by kills. */
    const fetch = async () => {
      setData(
        (await fetchLeaderboard()).sort((a, b) => {
          if (a.alive === b.alive) {
            return b.kills - a.kills;
          } else {
            if (a.alive) return -1;
            return 1;
          }
        })
      );
    };
    fetch();
  }, []);

  return (
    <Stack alignItems="center" width="100%">
      {gameInfo && <EventCountdown gameInfo={gameInfo} />}
      <Stack padding={4} alignItems="center" width="100%">
        {data.map((info, index) => (
          <LeaderboardItem info={info} ranking={index + 1} />
        ))}
      </Stack>
    </Stack>
  );
}

function LeaderboardItem({
  info,
  ranking,
}: {
  info: LeaderboardPlayerInfo;
  ranking: number;
}) {
  return (
    <Card
      variant="outline"
      boxShadow={"lg"}
      width="70%"
      minWidth="400px"
      key={info.playerId}
      sx={{ backgroundColor: info.alive ? "white" : "red.200" }}
    >
      <HStack padding={4}>
        <Avatar name={info.name} />
        <Stack>
          <Text sx={info.alive ? {} : { textDecorationLine: "line-through" }}>
            {ranking}: {info.name}
          </Text>
          <Box mt="-4">
            <Text as="span" fontWeight="bold">
              Kills:
            </Text>
            <Text as="span"> {info.kills}</Text>
          </Box>
          {!info.alive && <Text>Killed by {info.killedBy}</Text>}
        </Stack>
      </HStack>
    </Card>
  );
}

export default Leaderboard;
