import React, {useState, useEffect} from 'react';
import './App.css';

const JOKE_API = 'http://api.icndb.com/jokes/random';
const CAT_API = 'http://api.icndb.com/categories';

function App() {
  const [joke, setJoke] = useState('');
  const [category, setCategory] = useState('" ",nerdy, explicit');
  const [person, setPerson] = useState('Chuck Norris');
  const words = person.split(' ');
  const [categoryList, setCategoryList] = useState([]);
  const [number, setNumber] = useState(0);
  const [jokeList, setJokeList] = useState([]);

  const displayJoke = () => {
    fetch(JOKE_API+'?firstName='+words[0]+'&lastName='+words[1]+'&limitTo=['+category+']')
     .then(res => res.json())
     .then(data => setJoke(data.value.joke))
  };

  const getCategoryList = () => {
    fetch(CAT_API)
     .then(res => res.json())
     .then(data => setCategoryList(data.value))
  };

  const getJokeList = () => {
    fetch(JOKE_API+'/'+number)
     .then(res => res.json())
     .then(data => setJokeList(data.value))
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob(jokeList, {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "Chuck_jokes.txt";
    document.body.appendChild(element);
    element.click();
  };
  
  const saveJokes = () => {
    getJokeList();
    for (let i = 0; i < jokeList.length; i++) {
      jokeList[i] = jokeList[i].joke+'\n'
    }
    downloadTxtFile();
  }

  useEffect(() => {
    displayJoke();
    getCategoryList();
  }, []);

  return (
    <div className="box">
      <div className="content">
        <img src={require('./chuck.jpg')} /><br></br>
        <q>{joke}</q><br></br>
        <select onChange={option => setCategory(option.target.value)}>
          <option value="" hidden>Categories</option>
        {categoryList.map((category) => (
          <option key={category}>{category}</option>
        ))}
        </select><br></br>
        <button onClick={displayJoke}>Draw a {person} joke</button><br></br>
        <input type="text" placeholder="Impersonate Chuck Norris" onChange={text => setPerson(text.target.value)}></input><br></br>
        <input type="number" value={number} onChange={number => setNumber(number.target.value)}></input>
        <button onClick={saveJokes}>Save Jokes</button>
      </div>
    </div>
  );
}

export default App;
