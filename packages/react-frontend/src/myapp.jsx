import React, { useState } from "react";
import Table from "./table";
import Form from "./form";

// define MyApp component as a function that returns what is supposed to be rendered on the screen
// the <Table characterData=... /> line calls the Table component and gives it the character array
function MyApp() {
    const [characters, setCharacters] = useState([]);

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form />
        </div>
    );
}
// the above HTML-looking syntax is allowed because we are writing in JSX. typical browsers don't accept it, so we
// use Vite to 'transpile' it to standard JS/ECMAScript

function removeOneCharacter(index){
    const updated = characters.filter((character, i) => {
        return i !== index;
    });
    setCharacters(updated); // set characters takes the new array you created by filtering as an argument, and will setCharacters (duh) 
}

// this makes the component available to be imported into other components or files
export default MyApp;