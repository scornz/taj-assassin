import {
  List,
  ListItem,
  ListIcon,
  UnorderedList,
  Text,
  Stack,
  Card,
} from "@chakra-ui/react";

import { TimeIcon } from "@chakra-ui/icons";

function Rules() {
  return (
    <Stack alignItems="center">
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
          These rules are not final until 9/28 at 11:59 PM. They will be
          changed.
        </Text>
      </Card>
      <UnorderedList maxWidth="500px">
        <ListItem fontWeight="bold">
          Getting someone "out"
          <UnorderedList fontWeight="normal">
            <ListItem>
              You must squirt them with water directly from a water gun. The
              mechanism of water delivery must be from a water gun. Other
              delivery methods, such as a water bottle or a cup of beer, do not
              count.
            </ListItem>
            <ListItem>
              The kill must be caught on video and uploaded to the GroupMe,
              linked{" "}
              <a href="https://groupme.com/join_group/96794581/Myt3F2CO">
                <Text display="inline" color="blue.400">
                  HERE
                </Text>
              </a>
              . You must include the full name of the person you have killed.
            </ListItem>
            <ListItem>
              If the kill is deemed valid, it will be registered here and will
              be displayed publically on the leaderboard.
            </ListItem>
            <ListItem>
              After a kill is registered, the target of the killed will be
              reassigned to that of whom they were killed by.
            </ListItem>
            <ListItem>
              Kills are only valid during rounds. That is, in between the end of
              a round and the start of the next, kills will not count. Kills
              must be sent in the GroupMe prior to the round ending, or they
              will not count.
            </ListItem>
            <ListItem>
              There are no shields. Holding a book up to protect yourself and
              "deflect" the water will still count as a kill.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem fontWeight="bold">
          Auto-elimination
          <UnorderedList fontWeight="normal">
            <ListItem>
              There are 3 rounds of auto-elimination (rounds 1, 2, and 3), where
              players must have a certain number of kills to move on.
            </ListItem>
            <ListItem>
              If a player does not have the minimum number of kills upon that
              round ending, they will be automatically eliminated.
            </ListItem>
            <ListItem>
              The kills do not have to be in the relevant round. That is, if a
              player gets three kills in round 1, they will not be
              auto-eliminated.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem fontWeight="bold">
          Safeties
          <UnorderedList fontWeight="normal">
            <ListItem>
              There will be a different “safety” every day. A “safety” is a
              different task that must be continuously performed in order to
              remain invulnerable.
            </ListItem>
            <ListItem>
              As the game progresses, safeties will continue to get more and
              more difficult.
            </ListItem>
            <ListItem>
              Every Thursday, there will be no daily safety. Safe zones (as
              listed below) are still valid.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem fontWeight="bold">
          Safe zones
          <UnorderedList fontWeight="normal">
            <ListItem>
              This is the exhaustive list of places where a player cannot be
              killed.
              <UnorderedList fontWeight="normal">
                <ListItem>
                  Cottage (inside and in the courtyard), no other eating clubs
                  are safe (nor dining halls). The exception is during nights
                  out, from 10pm-2am, the insides of other eating clubs are
                  safe, however the street is not.
                </ListItem>
                <ListItem>
                  Practice (during practice, preparing for practice), but not
                  travelling to practice
                </ListItem>
                <ListItem>
                  Class (not that anyone goes to that anyways)
                </ListItem>
              </UnorderedList>
            </ListItem>
            <ListItem>
              Being in a safe zone means that you are unable to kill or be
              killed. That is, kills from a player inside a safe zone to a
              player outside of a safe zone are not valid.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem fontWeight="bold">
          Timeline
          <UnorderedList fontWeight="normal">
            <ListItem>There will be a total of 5 rounds.</ListItem>
            <ListItem>
              At the end of every round, all targets will be shuffled.
            </ListItem>
            <ListItem>
              The last round will be ANARCHY, which means there will be no
              safety, no safe words, and no safe zones.
            </ListItem>
            <ListItem>
              At the end of 11/24, if there is still more than a single person
              remaining, there will be a duel between all remaining participants
            </ListItem>
            <ListItem>
              Under NO circumstances will there be multiple winners. There will
              be a SINGLE winner.
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem fontWeight="bold">
          Important dates
          <List fontWeight="normal">
            <ListItem>
              <ListIcon as={TimeIcon} color="green.500" />
              START of ROUND 1: 9/29 9AM
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="red.500" />
              END of ROUND 1: 10/12 11:59PM (1 total kill required)
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="green.500" />
              START of ROUND 2: 10/13 9AM
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="red.500" />
              END of ROUND 2: 10/26 11:59PM (2 total kills required)
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="green.500" />
              START of ROUND 3: 10/27 9AM
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="red.500" />
              END of ROUND 3: 11/9 11:59PM (3 total kills required)
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="green.500" />
              START of ROUND 4: 11/10 9AM
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="red.500" />
              END of ROUND 4: 11/16 11:59PM
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="green.500" />
              START of ANARCHY: 11/20 9AM
            </ListItem>
            <ListItem>
              <ListIcon as={TimeIcon} color="red.500" />
              END of GAME: 11/24 11:59PM
            </ListItem>
          </List>
        </ListItem>
        <ListItem fontWeight="bold">
          Additional
          <UnorderedList fontWeight="normal">
            <ListItem>
              Let me know if the website is bugging out or it breaks completely,
              I'll fix it ASAP.
            </ListItem>
            <ListItem>
              If there is a dispute, it will be ruled by majority vote of 1
              (me).
            </ListItem>
          </UnorderedList>
        </ListItem>
      </UnorderedList>
    </Stack>
  );
}

export default Rules;
