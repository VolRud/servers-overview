import { serversConstants, _SUCCESS } from '../constants';
import { mainRequest } from '../../services/mainRequest';
import { getCurrentUrl, getQueryParametrsFromObject, setCurrentUrl } from '../../utils/helpers';


export const getServersList = () => {
	return dispatch => {
		dispatch({
			type: serversConstants.REQUEST_GET_SERVERS_LIST,
			payload: {},
		});
		mainRequest(
			{},
			serversConstants.REQUEST_GET_SERVERS_LIST,
			dispatch,
		);
	};
};


export const sortingServers = (parametr) => {
	return (dispatch, getState) => {
		dispatch({
			type: serversConstants.SORTING_SERVERS_BY_PARAMETR,
			payload: parametr,
		});
		const { servers } = getState();

		dispatch({
			type: serversConstants.SORTING_SERVERS_BY_PARAMETR + _SUCCESS,
			payload: sortServers(
				servers.serversListFilteredSorted,
				parametr
				),
		});
	};
};

export const setUrlQueryParametr = () => {
	let url = getCurrentUrl();
	return (dispatch, getState) => {
		const { servers: {
			filtersRules,
			sortParametrs,} } = getState();
		url += '?' + getQueryParametrsFromObject({
			...filtersRules,
			...filtersRules.cpuUtilization,
			...sortParametrs,
		})
		dispatch({
			type: serversConstants.SET_CURRENT_URL_WITH_QUERY_PARAMETR,
			payload: url,
		});
		setCurrentUrl(url);	
	};
};

  
const sortServers = (servers, sortParametr) => {
	const { sortBy, sortType,} = sortParametr;
	return sortType === 'az'
		? servers.sort(byField(sortBy))
		: servers.sort(byField(sortBy)).reverse();
}
  
const byField = (field) => {
	return (a, b) => a[field] > b[field] ? 1 : -1;
}
