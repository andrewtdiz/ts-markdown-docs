import { serve } from "bun";
import index from "./index.html";
import Markdoc from '@markdoc/markdoc';
import { initializeContentManifest, getContent, getContentAST, getContentFrontmatter, getAllContentMetadata } from './lib/content-manifest';

// Initialize content manifest on server startup
initializeContentManifest();

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
