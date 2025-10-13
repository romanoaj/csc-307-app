import React from "react";

// create tableheader function component
function TableHeader(){
    return (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Job</th>
                    <th>ID</th>
                    <th>Remove</th>
                </tr>
            </thead>
        );
}

// create tablebody functional component 
function TableBody(props){
    // contains the characterData array mapped to return a table row
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>{row.id}</td>
                <td>
                    <button onClick={
                        () => props.removeCharacter(index)
                        .then((res) => { if (res.status != 204){
                            console.log("wrong status code: ", res.status);
                        }}).catch((error) => console.log(error))}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
    );
    return (
        <tbody>
            {rows}
        </tbody>
    );
}

// combine the two into one table function component
// this func puts characterData into props, Table sees "props" and looks for the characterData item in it when it does props.characterData
function Table(props){
    return(
        <table>
            <TableHeader />
            <TableBody
                characterData={props.characterData}
                removeCharacter={props.removeCharacter}
            />
        </table>
    );
}

// export combined version
export default Table;