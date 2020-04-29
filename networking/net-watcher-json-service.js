"use strict";

const fs = require("fs");
const net = require("net");
const fileName = process.argv[2];

if (!fileName) {
  throw Error("A file to watch must be specified!");
}

net
  .createServer((connection) => {
    //Reporting
    console.log("Subscriber connected");
    connection.write(JSON.stringify({ type: "watching", file: fileName }));

    //Watcher Setup
    const watcher = fs.watch(fileName, () =>
      connection.write(
        JSON.stringify({ type: "changed", timestamp: Date.now() })
      )
    );

    //Cleanup
    connection.on("close", () => {
      console.log("Subscriber disconnected");
      watcher.close();
    });
  })
  .listen(60300, () => {
    console.log("Listening for subscribers....");
  });
