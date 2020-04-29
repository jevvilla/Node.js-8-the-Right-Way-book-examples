"use strict";

const server = require("net").createServer((connection) => {
  console.log("Subscriber connected");

  // Two messages chunks that together make a whole message
  const firstChunk = '{"type": "changed", "timesta}';
  const secondChunk = 'mp":1450698367262}';

  // Send the first chunk immediately
  connection.write(firstChunk);

  // after a short delay, send the other chunk
  const timer = setTimeout(() => {
    connection.write(secondChunk);
    connection.end();
  }, 100);

  // Clear the timer when connection ends

  connection.on("end", () => {
    clearTimeout(timer);
    console.log("Subscriber disconnected");
  });
});

server.listen(60300, () => {
  console.log("Test server listening for subscribers....");
});
