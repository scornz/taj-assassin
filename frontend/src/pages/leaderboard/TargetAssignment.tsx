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
import { fetchTarget } from "../../api/game/target";
import { TargetInfo } from "shared/api/game/target";

function TargetAssignment() {
  const [target, setTarget] = useState<TargetInfo | null>(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const target = await fetchTarget();
        setTarget(target);
        setError(false);
      } catch (e) {
        setError(true);
      }
    };
    fetch();
  }, []);

  return (
    <Card
      variant="outline"
      boxShadow={"lg"}
      width="90%"
      minWidth="400px"
      padding={4}
      backgroundColor="orange.100"
    >
      <Box>
        {!error ? (
          <>
            <Text as="span" fontWeight="bold">
              Your target:{" "}
            </Text>
            <Text as="span"> {target?.name} </Text>
          </>
        ) : (
          <>
            <Text as="span" fontWeight="bold">
              Your target is not available.
            </Text>
          </>
        )}
      </Box>
    </Card>
  );
}

export default TargetAssignment;
