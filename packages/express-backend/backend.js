// step 1: import express; express works as an HTTP middleware, sending and receiving HTTP calls
import express from "express"; // why not capitalized?

// step 3: create express instance and define a port for listening to HTTP requests
const app = express();
const port = 8050;

// step 4: set up express app to process incoming data in JSON format and access JSON data in memory
app.use(express.json());
// step 5: set API endpoint w/ app.get function
    // "/" arg: URL pattern that will map to this endpoint
    // (req, res) arg: two objects representing request and response to be used internally
app.get("/", (req, res) => {
    res.send("hello world!");
});

// step 6: make backend server listen to incoming HTTP requests on the defined port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});