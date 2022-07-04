import React from 'react';
import './App.scss';
import { store } from './store';
import { Provider } from 'react-redux';
import { RootComponent } from './components/RootComponent';

function App() {
	return (
		<Provider store={store}>
			<RootComponent />
		</Provider>
	);
}

export default App;
