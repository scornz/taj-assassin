import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, PropsOf } from "@chakra-ui/react";

type Props = {
  onActivate: () => void;
  clicksRequired: number;
};

/**
 * A button that is only activated after a certain number of clicks.
 */
function MultiButton({
  onActivate,
  clicksRequired,
  ...props
}: Props & PropsOf<typeof Button>) {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (clicks >= clicksRequired) {
      setClicks(0);
      onActivate();
    }
  }, [clicks, clicksRequired, onActivate]);

  return (
    <Button
      onClick={() => {
        setClicks((old) => old + 1);
      }}
      {...props}
    >
      {props.children} ({clicksRequired - clicks})
    </Button>
  );
}

export default MultiButton;
