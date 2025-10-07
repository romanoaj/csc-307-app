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

const app = express();
const port = 8050;

app.use(express.json());
app.get("/", (req, res) => {
    res.send("hello");
});

// helper functions:
const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) => 
    users["users_list"].find(
        (user) => user["id"] === id); // how is (user) a valid parameter here if not locally explicitly defined

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}

const deleteUserById = (id) => {
    return users["users_list"].filter((user) => user["id"] !== id)};

// methods:
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

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; // or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found");
    } else {
        res.send(result);
    }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    let result = deleteUserById(id);
    if (result === undefined){
      res.status(404).send("Resource not found");
    } else {
      users["users_list"] = result;
      res.send();
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body; // adding user from body of request -- where does this come from?
    addUser(userToAdd);
    res.send();
});



// step 6: make backend server listen to incoming HTTP requests on the defined port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});