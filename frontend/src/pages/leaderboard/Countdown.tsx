import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { GameInfo } from "shared/api/game";
import { useCountdown } from "utils/misc";

function Countdown({ gameInfo }: { gameInfo: GameInfo }) {
  const now = new Date();
  let currentEvent: { title: string; time: string } | null = null;
  if (gameInfo.events) {
    for (let i = 0; i < gameInfo.events.length; i++) {
      if (new Date(gameInfo.events[i].time) > now) {
        currentEvent = gameInfo.events[i];
        break;
      }
    }
  }

  const [days, hours, minutes, seconds] = useCountdown(
    currentEvent ? currentEvent.time : null
  );

  return (
    <>
      {currentEvent && (
        <Stack alignItems="center">
          <HStack>
            <DateDisplay value={days} type={"days"} isDanger={days <= 3} />
            <p>:</p>
            <DateDisplay value={hours} type={"hours"} isDanger={false} />
            <p>:</p>
            <DateDisplay value={minutes} type={"minutes"} isDanger={false} />
            <p>:</p>
            <DateDisplay value={seconds} type={"seconds"} isDanger={false} />
          </HStack>
          <Text>
            until{" "}
            <Text display="inline" fontWeight="extrabold">
              {currentEvent.title}
            </Text>
          </Text>
        </Stack>
      )}
    </>
  );
}

export default Countdown;

const DateDisplay = ({
  value,
  type,
  isDanger,
}: {
  value: number;
  type: string;
  isDanger: boolean;
}) => {
  return (
    <Stack alignItems="center">
      <Text fontWeight="extrabold">{value}</Text>
      <Text mt="-4">{type}</Text>
    </Stack>
  );
};
