import React, { useState } from "react";

function Form(props){
    // ask him how this [person, setPerson] syntax works
    const [person, setPerson] = useState( {name: "", job: ""});

    function handleChange(event){
        const { name, value } = event.target;
        if (name === "job")
            setPerson({ name: person["name"], job: value });
        else setPerson({ name: value, job: person["job"] });
    }

    function submitForm(){ // nested bc it uses person which is inside the Form function's scope
        props.handleSubmit(person);
        setPerson({ name: "", job: "" });
    }
    
    return ( // question: how are you able to return an entire chunk of HTML
        <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={person.name}
                onChange={handleChange}
            />
            <label htmlFor="job">Job</label>
            <input
                type="text"
                name="job"
                id="job"
                value={person.job}
                onChange={handleChange}
            />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
}

export default Form;