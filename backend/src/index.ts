// import { Server } from "./lib/app";

import { genAI } from "./lib/service/fetchAI";

// const server = new Server();
// server.Run();

const summary = async() => {
   const summary = await genAI();
   console.log(summary);
};

summary();