import './App.css';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import Header from './components/Header';
import FormLogin from './components/custom/FormLogin';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import Page404 from './components/custom/Page404';






function App() {
  const [checkLogin, setCheckLogin] = useState(false);
  const [account, setAccount] = useState([]);


  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    const url = 'https://600e63693bb1d100179def79.mockapi.io/Account';
    axios({
      url: url,
      method: 'GET',
    })

      .then((response) => {
        const { data } = response;
        setAccount(data);
      })

      .catch((error) => {
        console.log(error, error.response);
      });
  }, [])

  const x = account.map((val, idx) => {
    return val;
  }

  )
  console.log(x)

  return (

    <div>
      <React.Fragment>
        <CssBaseline />

        <Container maxWidth="sm">



          <Typography component="div" style={{ backgroundColor: '#F8F8FF', height: '100vh' }}>

            <BrowserRouter>

              <Switch>
                <Route exact path="/" >
                  {checkLogin === false ? <FormLogin
                    setCheckLogin={setCheckLogin}
                    formLogin={formLogin}
                    setFormLogin={setFormLogin}
                    account={account} 
                    setAccount={setAccount}/> : <Header
                    setCheckLogin={setCheckLogin}
                    formLogin={formLogin}
                    account={account}
                    setAccount={setAccount} />}

                </Route>
                <Route path="*">
                  <Page404 />
                </Route>
               
              </Switch>
            </BrowserRouter>
          </Typography>

        </Container>

      </React.Fragment>

    </div>
  );

}

export default App;





