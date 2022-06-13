import React, {useState, useEffect} from 'react';
import './App.css';

const JOKE_API = 'http://api.icndb.com/jokes/random';
const CAT_API = 'http://api.icndb.com/categories';

function App() {
  const [joke, setJoke] = useState('');
  const [category, setCategory] = useState('" ",nerdy, explicit');
  const [person, setPerson] = useState('Chuck Norris');
  const splittedPerson = person.split(' ');
  const [categoryList, setCategoryList] = useState([]);
  const [number, setNumber] = useState(0);
  const [jokeList, setJokeList] = useState([]);
  const [isNameChanged, setChange] = useState(false);

  const displayJoke = () => {
    fetch(JOKE_API+'?firstName='+splittedPerson[0]+'&lastName='+splittedPerson[1]+'&limitTo=['+category+']')
     .then(res => res.json())
     .then(data => setJoke(data.value.joke))
    if(splittedPerson[0] === 'Chuck' && splittedPerson[1] === 'Norris'){
      setChange(false);
    }
    else{
      setChange(true);
    }
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
    for (let i = 0; i < jokeList.length; i++) {
      jokeList[i] = (i+1)+'. '+jokeList[i].joke+'\n'
    }
    downloadTxtFile();
  }

  useEffect(() => {
    displayJoke();
    getCategoryList();
  }, []);

  return (
    <div className="container align-items-center mt-5">
      <div className="row vertical-center-row">
      <div className="col-md-4 offset-md-4 bg-light rounded shadow">
        <div className="d-grid gap-2 mx-4 my-4">
            {isNameChanged ? (
                <img className="img-fluid rounded" src={require('./unknown.jpg')} alt="image_unknown" />
            ) : (
              <img className="img-fluid rounded" src={require('./chuck.jpg')} alt="image_Chuck" />
            )}
            <q className="text-center fw-bold fs-6 fst-italic mb-3">{joke}</q>
            <select className="form-select mb-1 border border-dark" onChange={option => setCategory(option.target.value.toLowerCase())}>
              <option value="" hidden>Categories</option>
              <option value="" disabled>Select category</option>
                {categoryList.map((category) => (
                  <option key={category}><p>{category.charAt(0).toUpperCase() + category.slice(1)}</p></option>
                ))}
            </select>
            <div className="form-floating mb-3">
              <input type="text" className="form-control border border-dark" id="floatingInput" placeholder="Impersonate Chuck Norris" onChange={text => setPerson(text.target.value)}></input>
              <label for="floatingInput">Impersonate Chuck Norris</label>
            </div>
            <button className="btn btn-secondary mb-3 p-2 fw-bold bg-dark" onClick={displayJoke}>Draw a random {person} joke</button>
            <div className="form-control-sm" onClick={getJokeList}>
              <input className="form-control-sm" type="number" min="1" max="100" value={number} onChange={number => setNumber(number.target.value)}></input>
              <button className="btn btn-outline-secondary ms-2 px-4 text-dark" onClick={saveJokes}>Save Jokes</button>  
            </div>        
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
