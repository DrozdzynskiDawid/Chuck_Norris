import React, {useState, useEffect} from 'react'
import './App.css';

const JOKE_API = 'http://api.icndb.com/jokes/random?';
const CAT_API = 'http://api.icndb.com/categories';

function App() {
  const [joke, setJoke] = useState('');
  const [category, setCategory] = useState('" ",nerdy, explicit');
  const [person, setPerson] = useState('Chuck Norris');
  const [categoryList, setCategoryList] = useState([]);
  const words = person.split(' ');

  const displayJoke = () => {
    fetch(JOKE_API+'firstName='+words[0]+'&lastName='+words[1]+'&limitTo=['+category+']')
     .then(res => res.json())
     .then(data => setJoke(data.value.joke))
  }

  const getCategoryList = () => {
    fetch(CAT_API)
     .then(res => res.json())
     .then(data => setCategoryList(data.value))
  }

  useEffect(() => {
    displayJoke();
    getCategoryList();
  }, [])

  return (
    <div className="box">
      <p>{joke}</p>
      <button onClick={displayJoke}>Draw a {person} joke</button>
      <select onChange={option => setCategory(option.target.value)}>
        <option value="" hidden>Categories</option>
      {categoryList.map((category) => (
        <option key={category}>{category}</option>
      ))}
      </select><br></br>
      <input type="text" placeholder='Impersonate Chuck Norris' onChange={text => setPerson(text.target.value)}></input>
    </div>
  );
}

export default App;
