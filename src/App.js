import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { Details } from './pages/Details';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/cart" component={Cart} />
          <Route
            exact
            path="/details/:id"
            render={(props) => <Details {...props} />}
          />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
