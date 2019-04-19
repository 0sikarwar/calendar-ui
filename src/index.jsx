import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './Routes';
import configureStore from './store/ConfigureStore';
import Startup from "./Startup";

const store = configureStore()

const renderRoot = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Startup>
				<BrowserRouter history={history} context={{}}>
					<Routes />
				</BrowserRouter>
			</Startup>
		</Provider>,
		document.getElementById('root')
	);
};

renderRoot();
module.hot.accept('./Routes', () => {
	renderRoot();
});
