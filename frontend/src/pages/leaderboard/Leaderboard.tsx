import axios from "axios";
import { redirect } from "react-router-dom";
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

let dummyData: LeaderboardPlayerInfo[] = [
  {
    playerId: "123abc",
    name: "John One",
    kills: 1,
    alive: true,
  },
  {
    playerId: "456def",
    name: "Mike Scornavacca",
    kills: 5,
    alive: false,
    killedBy: "Steve Smith",
  },
  {
    playerId: "789hij",
    name: "Will Two",
    kills: 4,
    alive: true,
  },
  {
    playerId: "123klm",
    name: "Joe Four",
    kills: 1,
    alive: true,
  },
];

function Leaderboard() {
  const [data, setData] = useState<LeaderboardPlayerInfo[]>([]);

  useEffect(() => {
    setData(
      dummyData.sort((a, b) => {
        if (a.alive === b.alive) {
          return b.kills - a.kills;
        } else {
          if (a.alive) return -1;
          return 1;
        }
      })
    );
  }, []);

  return (
    <Box m={4}>
      <Tabs variant="soft-rounded" colorScheme="red">
        <TabList>
          <Tab>Leaderboard</Tab>
          <Tab>Your Target</Tab>
          <Tab>Rules</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack alignItems="center" width="100%">
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
            <Rules />
          </TabPanel>
        </TabPanels>
      </Tabs>
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
