import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
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
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

const InputWithLabel = ({
  id,
  value,
  onInputChange,
  children,
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type="text"
      value={value}
      onChange={onInputChange} />
  </>
);

const App = () => {
  const initialStories = [
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
  const [stories, setStories] = useState(initialStories);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('search') || 'React');
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories)
  }

  useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  const searchedStories = stories.filter(function (story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  })
  return (
    <div>
      <h1>Hacker stories</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr />
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
}

export default App
