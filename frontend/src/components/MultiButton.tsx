import { useEffect, useState } from "react";
import { Button, PropsOf } from "@chakra-ui/react";

type Props = {
  /**
   * The function to call after clicking number of clicks
   */
  onActivate: () => void;
  /**
   * Number of clicks required to activate the button
   */
  clicksRequired: number;
};

/**
 * A button that is only activated after a certain number of clicks. Used for
 * actions that have severe consequences and should only be. Append the number
 * of clicks remaining to the children (usually text)
 */
function MultiButton({
  onActivate,
  clicksRequired,
  ...props
}: Props & PropsOf<typeof Button>) {
  const [clicks, setClicks] = useState(0);

  // Used for tracking when clicks required exceeds the required number
  useEffect(() => {
    if (clicks >= clicksRequired) {
      setClicks(0);
      onActivate();
    }
  }, [clicks, clicksRequired, onActivate]);

  return (
    <Button
      onClick={() => {
        // Increase number of clicks by 1
        setClicks((old) => old + 1);
      }}
      {...props}
    >
      {props.children} ({clicksRequired - clicks} clicks)
    </Button>
  );
}

export default MultiButton;
