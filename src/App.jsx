import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function getTitle(title) {
  return title;
}

function List() {
  return (<ul>
    {list.map(function (item) {
      return (
        <li>{item.title}</li>
      );
    })}
  </ul>)
}

function Search(){
  return (
    <div>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" />
    </div>
  );
};

function App() {
  return (
    <div>
      <h1>Hello {getTitle("React")}</h1>
      <Search/>
      <hr />
      <List />
    </div>
  )
}

export default App
