import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

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
  const [stories, setStories] = useState([]);
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
  useEffect(() => {
    if (!searchTerm) return;
    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then((response) => response.json())
      .then((result) => {
        setStories(result.hits);
      })

      .catch(() => {
        //Handle Error
      });
  }, [searchTerm]);
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
      <List list={stories} onRemoveItem={handleRemoveStory} />
    </div>
  );
}

export default App
