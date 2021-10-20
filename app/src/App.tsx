import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Categories from './views/categories';
import ProductsContainer from './views/products/products.container';
import Session from 'react-session-api';

// Use Session storage - TTL 5 min
Session.config(true, 5);

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Categories />
          </Route>
          <Route path="/:category">
            <ProductsContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
