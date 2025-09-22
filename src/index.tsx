import { serve } from "bun";
import index from "./index.html";
import Markdoc from '@markdoc/markdoc';

const server = serve({
  routes: {
    "/*": index,

    "/health": {
      async GET(req) {
        return Response.json({
          message: "OK",
        });
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
