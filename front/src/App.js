import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import qs from 'qs';
// import https from 'https';

function App() {

  const [weather, setweather] = useState("");
  const [input, setInput] = useState({name: ""});

  useEffect(()=>{
    // axios.get(
    //   "/getWeather"
    // ).then(function(response){
    //   setweather(response.data.temp);
    // })

    // https.get("/getWeather", (response)=>{
    //   response.on('data',d=>{
    //     setweather(JSON.parse(d).temp)
    //   })
    // })
    axios.get("/getWeather").then(response=>setweather(response.data.hello))
  },[]);

  const handleInput = e=>{
    setInput((prev)=>{
      return {
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = e=>{
    e.preventDefault();
    console.log(input);
    axios.post("/adding",qs.stringify(input)).then(
      response=> console.log(response)
    ).catch(
      err=>console.log(err)
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {weather}
        </h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="name" placeholder="state your name:" onChange={handleInput}></input>
          <button type="submit">submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
