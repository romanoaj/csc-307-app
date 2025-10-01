import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./myapp"; //imported w/out suffix bc Vite sees that it could be .js, .jsx, .ts, or .tsx
import "./main.css";

// create the container -- what data type is this? 
const container = document.getElementById("root"); // contains the whole DOM

// create a root
const root = ReactDOMClient.createRoot(container);

// initial render: render an element to the root
root.render(<MyApp />); // QUESTION: ask in OH -- how does this syntax work?
// apparently .. this syntax causes our React component to be injected into the root of
// an HTML page that goes into the browser
// QUESTION: but what does that literally DO? What does it cause/effect?