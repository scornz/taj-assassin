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
        if (b.status === "EXPIRED") {
          return -1;
        } else if (a.status === "EXPIRED") {
          return 1;
        }

        if (a.status === "PENDING" && b.status !== "PENDING") {
          return -1;
        } else if (b.status === "PENDING" && a.status !== "PENDING") {
          return 1;
        }
        return 0;
      })
    );
  }, []);

  // Grab targets on initial load
  useEffect(() => {
    grabTargets();
  }, [grabTargets]);

  return (
    <Stack alignItems="center" width="100%">
      <MultiButton
        onActivate={async () => {
          await matchTargets();
          await grabTargets();
        }}
        clicksRequired={5}
      >
        INVALIDATE PAST AND GENERATE TARGETS
      </MultiButton>
      <Stack padding={4} alignItems="center" width="100%">
        {data.map((info, index) => (
          <TargetItem
            info={info}
            ranking={index + 1}
            grabTargets={grabTargets}
          />
        ))}
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
          <Text>{info.status}</Text>
          <Text>{info.targetId}</Text>
        </Stack>
        {info.status === "PENDING" && (
          <MultiButton
            onActivate={async () => {
              await killTarget(info.targetId);
              await grabTargets();
            }}
            clicksRequired={3}
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
