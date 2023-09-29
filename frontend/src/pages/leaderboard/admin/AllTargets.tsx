import {
  Avatar,
  Box,
  Button,
  Card,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { fetchTargets, killTarget, matchTargets } from "api/game/target";
import MultiButton from "components/MultiButton";
import { useCallback, useEffect, useState } from "react";

function AllTargets() {
  const [data, setData] = useState<any[]>([]);

  const grabTargets = useCallback(async () => {
    setData(
      (await fetchTargets()).sort((a, b) => {
        // Place expired statuses on the bottom
        if (b.status === "EXPIRED") {
          return -1;
        } else if (a.status === "EXPIRED") {
          return 1;
        }

        // Place pending statuses at the top
        if (a.status === "PENDING" && b.status !== "PENDING") {
          return -1;
        } else if (b.status === "PENDING" && a.status !== "PENDING") {
          return 1;
        }

        // Unless they are equal and non-expired, then sorting does not matter
        return b.fromName - a.fromName;
      })
    );
  }, []);

  // Grab targets on initial load
  useEffect(() => {
    grabTargets();
  }, [grabTargets]);

  return (
    <Stack alignItems="center" width="100%">
      <Card
        variant="outline"
        boxShadow={"lg"}
        width="90%"
        minWidth="400px"
        padding={4}
        backgroundColor="red.100"
        display="flex"
        alignItems="center"
      >
        <Text fontWeight="extrabold">WARNING</Text>
        <Text fontWeight="normal" align="center">
          The controls on this page are meant for admins only, and can seriously
          alter the course of the game if used incorrectly. All buttons on this
          page require multiple, repeated clicks in order to activate their
          function (indicated by the number in parentheses). This prevents fat
          fingers. Don't be stupid.
        </Text>
      </Card>
      <MultiButton
        onActivate={async () => {
          await matchTargets();
          await grabTargets();
        }}
        clicksRequired={10}
        boxShadow="lg"
        mt="5"
      >
        Generate/overwrite targets
      </MultiButton>
      <Stack padding={4} alignItems="center" width="100%">
        {data.length != 0 ? (
          data.map((info, index) => (
            <TargetItem
              info={info}
              ranking={index + 1}
              grabTargets={grabTargets}
            />
          ))
        ) : (
          <Card
            variant="outline"
            boxShadow={"lg"}
            width="60%"
            minWidth="300px"
            padding={4}
            backgroundColor="yellow.100"
            display="flex"
            alignItems="center"
          >
            <Text fontWeight="extrabold">NOTE</Text>
            <Text fontWeight="normal" align="center">
              There are no targets yet silly goose!
            </Text>
          </Card>
        )}
      </Stack>
    </Stack>
  );
}

function TargetItem({
  info,
  ranking,
  grabTargets,
}: {
  info: any;
  ranking: number;
  grabTargets: () => void;
}) {
  const [loading, setLoading] = useState(false);

  let color = "white";
  if (info.status === "COMPLETE") {
    color = "green.100";
  } else if (info.status === "EXPIRED") {
    color = "yellow.100";
  } else if (info.status === "USER_KILLED") {
    color = "red.100";
  }

  return (
    <Card
      variant="outline"
      boxShadow={"lg"}
      width="70%"
      minWidth="400px"
      key={info.targetId}
      sx={{ backgroundColor: color }}
    >
      <HStack padding={4}>
        <Stack>
          <Text>
            {info.fromName} → {info.toName}
          </Text>
          <Text mt="-6px" fontWeight="bold">
            Status: {info.status}
          </Text>
        </Stack>
        {info.status === "PENDING" && (
          <MultiButton
            onActivate={async () => {
              setLoading(true);
              await killTarget(info.targetId);
              await grabTargets();
              setLoading(false);
            }}
            clicksRequired={3}
            isDisabled={loading}
            ml="auto"
          >
            Kill
          </MultiButton>
        )}
      </HStack>
    </Card>
  );
}

export default AllTargets;
