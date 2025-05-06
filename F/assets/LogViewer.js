import { useEffect, useState } from "react";

// ********************
import { BACKEND_URL } from "./Config";

export default function LogViewer() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(`ws://${BACKEND_URL}/ws/logs`);

    socket.onmessage = (event) => {
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{
      padding: "1rem",
      backgroundColor: "black",
      color: "limegreen",
      fontFamily: "monospace",
      height: "24rem",
      overflowY: "scroll",
      borderRadius: "0.5rem"
    }}>
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
}
