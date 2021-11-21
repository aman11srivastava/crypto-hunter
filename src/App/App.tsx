import React from 'react';
import '../App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "../components/Header/Header";
import Homepage from "../Pages/Homepage/Homepage";
import CoinPage from "../Pages/CoinPage/CoinPage";
import {useStyles} from "./AppStyles";

function App() {
    const classes = useStyles();
  return (
      <BrowserRouter>
          <div className={classes.App}>
              <Header/>
              <Route path={"/"} exact component={Homepage}/>
              <Route path={"/coins/:id"} exact component={CoinPage}/>
          </div>
      </BrowserRouter>
  );
}

export default App;
