import React, { useState } from "react";
import MessageCard from "./MessageCard";
import PasscodeGate from "./PasscodeGate";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return <PasscodeGate onUnlock={() => setUnlocked(true)} />;
  }

  return <MessageCard />;
}
