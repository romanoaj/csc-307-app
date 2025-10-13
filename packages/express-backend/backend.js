import express from "express"; // why not capitalized?
import cors from "cors";

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

app.use(cors()); // allows backend to respond to calls coming from a different origin
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
    user["id"] = randID();
    users["users_list"].push(user);
    return user;
}

const randID = () => {
  const ID = new Array(6);
  for (let i = 0; i < ID.length; i++) ID[i] = Math.floor(Math.random()*10);
  return ID.join('');
}

const deleteUserById = (id) => {
    return users["users_list"].filter((user) => user["id"] !== id)};

const findUserByNameAndJob = (name, job) => {
    let result = users["users_list"]
    .filter((user) => user["name"] === name)
    .filter((user) => user["job"] === job);
    return result;
};

// methods:
app.get("/users", (req, res) => {
    const name = req.query.name; // gets the name we're seeking from the HTTP query in the url
    const job = req.query.job;
    if (name != undefined && job == undefined) {
        let result = findUserByName(name);
        result = { users_list: result};
        res.send(result);
    } else if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = {users_list : result};
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
    const newUser = addUser(userToAdd);
    res.status(201).send(newUser);
});



// step 6: make backend server listen to incoming HTTP requests on the defined port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});