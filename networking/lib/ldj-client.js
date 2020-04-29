const EventEmitter = require("events").EventEmitter;
class LDJClient extends EventEmitter {
  constructor(stream) {
    super();
    let buffer = "";

    stream.on("data", (data) => {
      buffer += data;
      let boundary = buffer.indexOf("\n");

      while (boundary !== -1) {
        const input = buffer.substring(0, boundary);

        buffer = buffer.substring(boundary + 1);
        this.emit("emit", JSON.parse(input));
        boundary = buffer.indexOf("\n");
      }
    });
  }
}
