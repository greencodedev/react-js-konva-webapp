import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../../src/App'
import CartScreen from '../screens/order/cart'
import CheckoutScreen from '../screens/order/checkout'
import DetailScreen from '../screens/order/detail'

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={ App } />
                <Route path="/cart" component={ CartScreen } />
                <Route path="/checkout" component={ CheckoutScreen } />
                <Route path="/detail" component={ DetailScreen } />
            </Switch>
        </Router>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root