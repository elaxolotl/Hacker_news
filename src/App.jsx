import './App.css'
import { useState } from 'react';

const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
)

const Item = (list) => (
  <li key={list.item.objectID}>
    <span>
      <a href={list.item.url}>{list.item.title} </a>
    </span>
    <span>{list.item.author}</span>
    <span>{list.item.num_comments}</span>
    <span>{list.item.points}</span>
  </li>
);

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    props.onSearch(event)
  }
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={props.onSearch} />
    </div>)
};

const App = () => {
  const stories = [
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
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  const searchedStories = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  })
  return (
    <div>
      <h1>Hacker stories</h1>
      <Search onSearch={handleSearch}/>
      <hr />
      <List list={searchedStories} />
    </div>
  );
}

export default App
