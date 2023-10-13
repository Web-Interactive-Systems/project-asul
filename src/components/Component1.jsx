import React from "react";
import { Button } from "@radix-ui/themes";

export function Component1() {
  const handleClick = () => {
    console.log("handleClick");
  };
  return <Button onClick={handleClick}>Send Notif</Button>;
}
