import './App.css'
import Skeleton from '@mui/material/Skeleton';
import { useState } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
)

const Item = ({ item, onRemoveItem }) => (
  <li className='list-item' key={item.objectID}>
    <span><FontAwesomeIcon id="icon" icon={faCircleUser} />{item.author}</span><br />
    <span>
      <a href={item.url}>{item.title} </a>
    </span><br />
    <span><FontAwesomeIcon id="icon" icon={faComment} />{item.num_comments}</span>&nbsp;
    <span className='likes'><FontAwesomeIcon id='icon' icon={faHeart} />{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

const InputWithLabel = (props) => (
  <>
    <label htmlFor={props.id}>{props.children}</label>
    &nbsp;
    <input
      placeholder='write anything here...'
      id={props.id}
      type="text"
      value={props.value}
      onChange={props.onInputChange} />
  </>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('search') || 'React');
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
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
    setIsLoading(true)
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false)
        setStories(result.hits);
      })

      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [url]);

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  return (
    <div>
      <div className='hero'>
        <h1><span>Hacker</span> stories</h1>
        <p>The latest tech news</p>
      </div>
      <div className="search">
        <InputWithLabel
          id="search"
          value={searchTerm}
          onInputChange={handleSearch}
        >
          <strong>Search:</strong>
        </InputWithLabel>
        <button
          type="button"
          disabled={!searchTerm}
          onClick={handleSearchSubmit}
        >
          Submit
        </button>
      </div>
      <hr />
      {isError && <p>Something went wrong ...</p>}
      {isLoading ? (<><Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} height={100} />
        <Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} height={100} />
        <Skeleton animation="wave" sx={{ bgcolor: 'grey.900' }} height={100} /></>) : (<List list={stories} onRemoveItem={handleRemoveStory} />)}
    </div>
  );
}

export default App
