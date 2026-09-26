import React, { useState } from "react";
import "./PasscodeGate.css";

const SECRET_CODE = "280996";

export default function PasscodeGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim() === SECRET_CODE) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setCode("");
    }
  };

  return (
    <div className="passcode-page">
      <form className={`passcode-card ${error ? "shake" : ""}`} onSubmit={handleSubmit}>
        <h2 className="passcode-title">Enter Code</h2>
        <p className="passcode-subtitle">This card is just for you 🎂</p>

        <input
          type="text"
          inputMode="numeric"
          className="passcode-input"
          placeholder="Enter secure code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(false);
          }}
          autoFocus
        />

        {error && <span className="passcode-error">Incorrect code, try again.</span>}

        <button type="submit" className="passcode-button">
          Unlock
        </button>
      </form>
    </div>
  );
}
