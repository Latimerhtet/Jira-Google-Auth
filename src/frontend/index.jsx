//  src/frontend/index.jsx

import React, { useEffect, useState } from "react";
// Step 1: Import CodeBlock and remove Text
import ForgeReconciler, { CodeBlock } from "@forge/react";
import { invoke } from "@forge/bridge";

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    invoke("getText", { example: "my-invoke-variable" }).then(setData);
  }, []);

  // Step 2: Remove the Text component and use CodeBlock
  return (
    <CodeBlock
      text={JSON.stringify(data, null, 2)}
      language="json"
      showLineNumbers
    />
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
