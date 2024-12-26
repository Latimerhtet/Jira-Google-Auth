//  src/resolvers/index.js

import Resolver from "@forge/resolver";
// Step 1: Add import
import api from "@forge/api";

const resolver = new Resolver();

// Step 2: Add 'async' to be able to wait for the promises inside to resolve
resolver.define("getText", async (req) => {
  // Step 3: Call the external APIs
  const google = api.asUser().withProvider("google", "google-apis");

  if (!(await google.hasCredentials())) {
    await google.requestCredentials();
  }

  const response = await google.fetch("/userinfo/v2/me");

  // Step 4: Return the user's name
  if (response.ok) {
    const userInfo = await response.json();

    return userInfo;
  }

  // Step 5: Return the error response
  return {
    status: response.status,
    statusText: response.statusText,
    text: await response.text(),
  };
});

export const handler = resolver.getDefinitions();
