// step 1: import express; express works as an HTTP middleware, sending and receiving HTTP calls
import express from "express"; // why not capitalized?

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// step 3: create express instance and define a port for listening to HTTP requests
const app = express();
const port = 8050;

// step 4: set up express app to process incoming data in JSON format and access JSON data in memory
app.use(express.json());
// step 5: set API endpoint w/ app.get function
    // "/" arg: URL pattern that will map to this endpoint
    // (req, res) arg: two objects representing request and response to be used internally
app.get("/", (req, res) => {
    res.send("hello");
});

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

//syntax? this looks like you're defining a mini-function inside of the app.get call
app.get("/users", (req, res) => {
    const name = req.query.name; // gets the name we're seeking from the HTTP query in the url
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result};
        res.send(result);
    } else {
        res.send(users);
    }
});

// step 6: make backend server listen to incoming HTTP requests on the defined port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});