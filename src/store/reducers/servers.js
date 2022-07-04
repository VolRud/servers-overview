import { initialServersFilters } from '../../utils/constants';
import { getCurrentUrl } from '../../utils/helpers';
import { serversConstants, _ERROR, _SUCCESS } from '../constants';

const initialState = {
	serversListFromServer: [],
	serversListFilteredSorted: [],
	serversListIsLoaded: false,
	filtersRules: { ...initialServersFilters, },
	sortParametrs: {},
	url: getCurrentUrl(),
	urlIsChecked: false,
};

export const servers = (state = initialState, action) => {
	const { payload, type, } = action;
	console.log('====',type, payload);
	switch (type) {
	case serversConstants.REQUEST_GET_SERVERS_LIST + _SUCCESS:
		return {
			...state,
			serversListIsLoaded: true,
			serversListFromServer: payload.data,
			serversListFilteredSorted: payload.data,
		};
	case serversConstants.REQUEST_GET_SERVERS_LIST + _ERROR:
		alert(payload.message);
		window.location.reload();
		return{
			...state,
		}
		case serversConstants.SORTING_SERVERS_BY_PARAMETR:
			return {
				...state,
				sortParametrs: payload,
				serversListIsLoaded: false,
			}
		case serversConstants.SORTING_SERVERS_BY_PARAMETR + _SUCCESS:
			return {
				...state,
				serversListIsLoaded: true,
				serversListFilteredSorted: payload,
			}
	case serversConstants.APPLY_SERVERS_OVERVIEW_FILTERS_RULES:
		return {
			...state,
			filtersRules: payload,
			serversListFilteredSorted: filterServersByFilterRules(
				state.serversListFromServer,
				payload
			),
		}
	case serversConstants.SET_CURRENT_URL_WITH_QUERY_PARAMETR:
		return {
			...state,
			url: payload,
		}
	case serversConstants.CHECK_URL_FOR_UPDATING_FILTERS:
		return {
			...state,
			urlIsChecked: true,
		}
	default:
		return {
			...state,
		};
	}
};




const filterServersByFilterRules = (servers, filterRules) => {
	const {
		serverName,
		isOnline,
		isOffline,
		isIddle,
		cpuUtilizationFrom,
		cpuUtilizationTo,
	} = filterRules;
	return servers.filter(server => {
		const { serverName: name, status, stats: { cpu, }} = server;
		 if(
			(cpu >= cpuUtilizationFrom && cpu <= cpuUtilizationTo)
			&& name.includes(serverName)
			&& ((isOnline && status === 'online')
			|| (isOffline && status === 'offline')
			|| (isIddle && status === 'idle'))
		 ){
			return server;
		 }
	})
}