import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";


const server = new McpServer({
  name: "jokesMCP",
  description: "A server that provides jokes",
  version: "1.0.0",
  tools: [
    {
      name: "get-chuck-joke",
      description: "Get a random Chuck Norris joke",
      parameters: {},
    },
    {
      name: "get-chuck-categories",
      description: "Get all available categories for Chuck Norris jokes",
      parameters: {},
    },
    {
      name: "get-dad-joke",
      description: "Get a random dad joke",
      parameters: {},
    },
    {
      name: "get-yo-mama-joke",
      description: "Get a random Yo Mama joke",
      parameters: {},
    },
  ],
});

// Get Chuck Norris joke tool
server.tool(
  "get-chuck-joke",
  "Get a random Chuck Norris joke",
  async () => {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: data.value,
        },
      ],
    };
  }
);

// Get Chuck Norris joke categories tool
server.tool(
  "get-chuck-categories",
  "Get all available categories for Chuck Norris jokes",
  async () => {
    const response = await fetch("https://api.chucknorris.io/jokes/categories");
    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: data.join(", "),
        },
      ],
    };
  }
);

// Get Dad joke tool
server.tool(
  "get-dad-joke",
  "Get a random dad joke",
  async () => {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: data.joke,
        },
      ],
    };
  }
);

// Get Yo Mama joke tool
server.tool(
  "get-yo-mama-joke",
  "Get a random Yo Mama joke",
  async () => {
    const response = await fetch(
      "https://www.yomama-jokes.com/api/v1/jokes/random"
    );
    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: data.joke,
        },
      ],
    };
  }
);

export default server;