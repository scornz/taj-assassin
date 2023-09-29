import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { GameInfo } from "shared/api/game";
import { useCountdown } from "utils/misc";

/**
 * Variation that counts down until a specific event within the game, getting
 * the next event that hasn't surpassed yet
 */
function EventCountdown({ gameInfo }: { gameInfo: GameInfo }) {
  const now = new Date();
  let currentEvent: { title: string; time: string } | null = null;

  /* If the events exist, grab the next one in sequence that has not surpassed
  in time yet */
  if (gameInfo.events) {
    for (let i = 0; i < gameInfo.events.length; i++) {
      if (new Date(gameInfo.events[i].time) > now) {
        currentEvent = gameInfo.events[i];
        break;
      }
    }
  }

  return (
    <Countdown
      title={currentEvent?.title ?? null}
      time={currentEvent?.time ?? null}
    />
  );
}

/**
 * Variation that simply counts down until midnight (for when the safety switches)
 */
function SafetyCountdown() {
  const now = new Date();

  // Set it for midnight
  now.setHours(23);
  now.setMinutes(59);
  now.setSeconds(59);

  return <Countdown title="SAFETY SWITCHES" time={now.toISOString()} />;
}

/**
 * General countdown timer with a title until a time.
 */
function Countdown({
  title,
  time,
}: {
  title: string | null;
  time: string | null;
}) {
  const [days, hours, minutes, seconds] = useCountdown(time);

  return (
    <>
      {title && (
        <Stack alignItems="center">
          <HStack>
            <DateDisplay value={days} type={"days"} />
            <p>:</p>
            <DateDisplay value={hours} type={"hours"} />
            <p>:</p>
            <DateDisplay value={minutes} type={"minutes"} />
            <p>:</p>
            <DateDisplay value={seconds} type={"seconds"} />
          </HStack>
          <Text>
            until{" "}
            <Text display="inline" fontWeight="extrabold">
              {title}
            </Text>
          </Text>
        </Stack>
      )}
    </>
  );
}

export { EventCountdown, SafetyCountdown };

/**
 * Displays a single value with some text underneath it.
 */
const DateDisplay = ({ value, type }: { value: number; type: string }) => {
  return (
    <Stack alignItems="center">
      <Text fontWeight="extrabold">{value}</Text>
      <Text mt="-4">{type}</Text>
    </Stack>
  );
};
