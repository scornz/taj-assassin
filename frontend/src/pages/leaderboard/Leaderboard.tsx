import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { LeaderboardPlayerInfo } from "shared/api/game/player";

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
import { useEffect, useState } from "react";
import Rules from "./Rules";
import TargetAssignment from "./TargetAssignment";
import { useRecoilValue } from "recoil";
import { gameInfoAtom } from "global/user-state";
import { fetchLeaderboard } from "api/game/target";
import { EventCountdown } from "./Countdown";
import Safety from "./Safety";
import AllTargets from "./admin/AllTargets";

function Leaderboard() {
  const [data, setData] = useState<LeaderboardPlayerInfo[]>([]);
  const navigate = useNavigate();
  const gameInfo = useRecoilValue(gameInfoAtom);

  useEffect(() => {
    // Only use this is the user ID is not null
    if (gameInfo === undefined || gameInfo.role === "NONE") {
      navigate("/app/register");
      return;
    }
  }, [gameInfo, navigate]);

  useEffect(() => {
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
    <Box m={4}>
      {gameInfo?.role === "ADMIN" ? (
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Leaderboard</Tab>
            <Tab>All Targets</Tab>
            <Tab>Safety</Tab>
            <Tab>Rules</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack alignItems="center" width="100%">
                {gameInfo && <EventCountdown gameInfo={gameInfo} />}
                <Stack padding={4} alignItems="center" width="100%">
                  {data.map((info, index) => (
                    <LeaderboardItem info={info} ranking={index + 1} />
                  ))}
                </Stack>
              </Stack>
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
      ) : (
        <Tabs variant="soft-rounded" colorScheme="red">
          <TabList>
            <Tab>Leaderboard</Tab>
            <Tab>Your Target</Tab>
            <Tab>Safety</Tab>
            <Tab>Rules</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack alignItems="center" width="100%">
                {gameInfo && <EventCountdown gameInfo={gameInfo} />}
                <Stack padding={4} alignItems="center" width="100%">
                  {data.map((info, index) => (
                    <LeaderboardItem info={info} ranking={index + 1} />
                  ))}
                </Stack>
              </Stack>
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
      )}
    </Box>
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
