/* eslint-disable no-restricted-globals */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './Routes';
import configureStore from './store/ConfigureStore';
import Startup from "./Startup";

const store = configureStore()

const renderRoot = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Startup>
				<HashRouter history={history} context={{}}>
					<Routes />
				</HashRouter>
			</Startup>
		</Provider>,
		document.getElementById('root')
	);
};

renderRoot();
module.hot.accept('./Routes', () => {
	renderRoot();
});
