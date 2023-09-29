import { Box, Card, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTarget } from "api/game/target";
import { TargetInfo } from "shared/api/game/target";

/**
 * Page that displays a single card that shows the player's current target (or
 * states that it is not available)
 */
function TargetAssignment() {
  // Info about the target
  const [target, setTarget] = useState<TargetInfo | null>(null);
  // Whether or not there was an error retrieving the target
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Attempt to fetch
        const target = await fetchTarget();
        setTarget(target);
        setError(false);
      } catch (e) {
        // State that target is not available
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
