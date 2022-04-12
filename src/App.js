import './App.css';
import NavBar from './Components/NavBar';
import News from './Components/News';
import React, { useState } from "react";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [progress,setProgress]=useState(0);
  return (
    <>
    <Router>
    <div className="App">
        <NavBar></NavBar>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} key="general" pageSize={5} country='us' category='general'></News></Route>
          <Route exact path="/business"><News setProgress={setProgress} key="business" pageSize={5} country='us' category='business'></News></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} key="entertainment" pageSize={5} country='us' category='entertainment'></News></Route>
          <Route exact path="/health"><News setProgress={setProgress} key="health"pageSize={5} country='us' category='health'></News></Route>
          <Route exact path="/science"><News setProgress={setProgress} key="science" pageSize={5} country='us' category='science'></News></Route>
          <Route exact path="/sports"><News setProgress={setProgress} key="sports" pageSize={5} country='us' category='sports'></News></Route>
          <Route exact path="/technology"><News setProgress={setProgress} key="technology" pageSize={5} country='us' category='technology'></News></Route>
        </Switch>
    </div>
    </Router>
    </>
  );
}

export default App;
