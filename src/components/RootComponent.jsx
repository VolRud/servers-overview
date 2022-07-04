import React from 'react';
import { BrowserRouter, Switch, Routes, Route, } from 'react-router-dom';
import ServersList from './ServersList/ServersList';
import ServersOverview from './ServersOverview/ServersOverview';

export const RootComponent = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route  component={ServersOverview} path='/' exact />

			</Switch>

		</BrowserRouter>
	);
};
