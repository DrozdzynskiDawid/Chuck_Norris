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
    <div className="container align-items-center">
      <div className="row vertical-center-row">
      <div className="col-md-4 offset-md-4">
        <div className="d-grid gap-2">
          <img className="img-fluid" src={require('./chuck.jpg')} />
          <q className="text-center fw-bold fs-6 fst-italic mb-3">{joke}</q>
          <select className="form-select mb-1" onChange={option => setCategory(option.target.value)}>
            <option value="" hidden>Categories</option>
            <option value="" disabled>Select category</option>
              {categoryList.map((category) => (
                <option key={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
              ))}
          </select>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" placeholder="Impersonate Chuck Norris" onChange={text => setPerson(text.target.value)}></input>
            <label for="floatingInput">Impersonate Chuck Norris</label>
          </div>
          <button className="btn btn-secondary" onClick={displayJoke}>Draw a random {person} joke</button>
          <div className="">
            <input className="" type="number" value={number} onChange={number => setNumber(number.target.value)}></input>
            <button className="btn btn-outline-secondary ms-5" onClick={saveJokes}>Save Jokes</button>  
          </div>        
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
