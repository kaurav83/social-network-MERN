import React, { Component } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './components/Layout/Layout.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
