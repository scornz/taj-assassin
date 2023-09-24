import { GameInfo } from "shared/api/game";
import { SafetyCountdown } from "./Countdown";
import { Card, Stack, Text } from "@chakra-ui/react";

function Safety({ gameInfo }: { gameInfo: GameInfo }) {
  let today = "No safety today.";
  let tomorrow = "No safety tomorrow.";

  const now = new Date();
  const tmmrw = new Date(now);
  tmmrw.setDate(tmmrw.getDate() + 1);

  const start = new Date(gameInfo.startTime);
  console.log(gameInfo.startTime);
  console.log(start);

  var diff = now.getTime() - start.getTime();
  var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  console.log(diffDays);
  diffDays -= 1;

  if (diffDays >= 0 && diffDays < gameInfo.safeties.length) {
    today = gameInfo.safeties[diffDays];
  }

  if (diffDays + 1 >= 0 && diffDays + 1 < gameInfo.safeties.length) {
    tomorrow = gameInfo.safeties[diffDays + 1];
  }

  return (
    <Stack alignItems="center">
      <SafetyCountdown gameInfo={gameInfo} />
      <Card
        variant="outline"
        boxShadow={"lg"}
        width="90%"
        minWidth="400px"
        padding={4}
        backgroundColor="orange.100"
        display="flex"
        alignItems="center"
      >
        <Text fontWeight="extrabold">
          Today's safety ({now.getMonth() + 1}/{now.getDate()})
        </Text>
        <Text>{today}</Text>
      </Card>
      <Card
        variant="outline"
        boxShadow={"lg"}
        width="90%"
        minWidth="400px"
        padding={4}
        backgroundColor="orange.100"
        display="flex"
        alignItems="center"
      >
        <Text fontWeight="extrabold">
          Tomorrow's safety ({tmmrw.getMonth() + 1}/{tmmrw.getDate()})
        </Text>
        <Text>{tomorrow}</Text>
      </Card>
    </Stack>
  );
}

export default Safety;
