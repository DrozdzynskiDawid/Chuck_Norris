import {useState} from 'react';

const JOKE_API = 'http://api.icndb.com/jokes/random';

function Save() {
    const [number, setNumber] = useState(0);
    const [jokeList, setJokeList] = useState([]);

    const getJokeList = () => {
        fetch(JOKE_API+'/'+number)
         .then(res => res.json())
         .then(data => setJokeList(data.value))
      };
    
      const saveJokes = () => {
        for (let i = 0; i < jokeList.length; i++) {
          jokeList[i] = (i+1)+'. '+jokeList[i].joke+'\n'
        }
        downloadTxtFile();
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
      
    return (
        <div className="form-control-sm" onClick={getJokeList}>
            <input type="number"
             className="form-control-sm" 
             min="1" 
             max="100" 
             value={number} 
             onChange={number => setNumber(number.target.value)}
            />
            <button className="btn btn-outline-secondary ms-2 px-4 text-dark"
            onClick={saveJokes}>Save Jokes
            </button> 
        </div>
        ) 
}

export default Save;