import server from "@/presentation/server";
import database from "@/_boot/config";
import client from "./infrastructure/elasticsearch";

(async () => {
  try {
    // Start the server
    server;
    
    // Connect to the database
    await database();
    
    // Ping Elasticsearch to check if it's running
    const pingResponse = await client.ping();
    console.log('Elasticsearch is up and running:', pingResponse);

  } catch (error: any) {
    console.error("Error on start up:", error);
  } finally {
    process.on("SIGINT", async () => {
      console.log("\n Server is shutting down...");
      process.exit();
    });
  }
})();
