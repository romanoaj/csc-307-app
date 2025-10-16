import React, { useState, useEffect } from "react";
import Table from "./table";
import Form from "./form";

// define MyApp component as a function that returns what is supposed to be rendered on the screen
// the <Table characterData=... /> line calls the Table component and gives it the character array
function MyApp() {
    const [characters, setCharacters] = useState([ ]);

    function updateList(person){
        postUser(person).then((res) => {
            if (res.status == 201) {
                res.json().then((res) => { 
                    setCharacters([...characters, res])
                });
            } else { console.log("wrong status code: ", res.status) } 
        }).catch((error) => {
            console.log(error);
        })
    }

    function removeOneCharacter(index){
        const updated = characters.filter((character, i) => {
            return i !== index; // adds character to list if this is true
        });
        setCharacters(updated); // set characters takes the new array you created by filtering as an argument, and will setCharacters (duh)
        // send HTTP DELETE to backend:
        const promise = fetch(`http://localhost:8050/users/${characters[index].id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(characters[index])
        });
        return promise;
    }

    function fetchUsers(){
        const promise = fetch("http://localhost:8050/users"); // recall fetch is a promise
        return promise;
    }

    function postUser(person){ // when is this triggered to happen (bc there is nothing like app.post?)
        const promise = fetch("http://localhost:8050/users", {
            method: "POST", // makes it a POST instead of default GET
            headers: { "Content-Type": "application/json" }, // tell server that the body contains a json-format object 
            body: JSON.stringify(person), // to put the person data into a JSON that is the body of the request
        });
        return promise;
    }

    useEffect(() => { // first arg is fetchUsers(), second arg is empty list to represent the hook should only be called when the app first starts
        fetchUsers()
            .then((res) => res.json()) // assumes res is in json format
            .then((json) => setCharacters(json))
            .catch((error) => { console.log(error); })
    }, [] );

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList}/>
        </div>
    );
}
// the above HTML-looking syntax is allowed because we are writing in JSX. typical browsers don't accept it, so we
// use Vite to 'transpile' it to standard JS/ECMAScript

// this makes the component available to be imported into other components or files
export default MyApp;