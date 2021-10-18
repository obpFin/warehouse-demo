import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Categories from './views/categories';

import './App.css';
import ProductsContainer from './views/products/products.container';

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
