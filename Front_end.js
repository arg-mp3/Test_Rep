import React, { useState } from "react";

function App() {
  const [nodeId, setNodeId] = useState("");
  const [nodeData, setNodeData] = useState("");
  const [response, setResponse] = useState("");

  const handleAddNode = async () => {
    const response = await fetch("http://localhost:8000/node/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: nodeId, data: JSON.parse(nodeData) }),
    });
    const data = await response.json();
    setResponse(data.message);
  };

  return (
    <div>
      <h1>SynapSys AI</h1>
      <input
        type="text"
        placeholder="Node ID"
        value={nodeId}
        onChange={(e) => setNodeId(e.target.value)}
      />
      <textarea
        placeholder="Node Data (JSON)"
        value={nodeData}
        onChange={(e) => setNodeData(e.target.value)}
      ></textarea>
      <button onClick={handleAddNode}>Add Node</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default App;