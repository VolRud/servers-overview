export const arrayIsNotEmpty = array => array.length > 0;
export const arrayIsEmpty = array => array.length === 0;
export const obbjectIsEmpty = (object) => {
	const keys = Object.keys(object);
	return arrayIsEmpty(keys);
}

export const findById = (array, id, idName) => {
	return array.find(item => item[idName] === id);
};

export const getCurrentUrl = () => window.location.href;
export const setCurrentUrl = (url) => window.history.pushState({}, {}, url);

export const getQueryParametrsFromObject = (object) => {
	let queryParametr = '';
	if(arrayIsEmpty(object)) return queryParametr;
	for( let key in object) {
		queryParametr += key + '=' + object[key] + '&';
	}
	return queryParametr;
}
export const getDaysFromSeconds = (seconds) => {
	return Math.round(seconds/86400);
}

export const parseUrlWithQueries = () => {
	const url = getCurrentUrl();
	const queriesString = url.split('?')[1];
	if(!queriesString) return {};
	const queriesArr = url.split('?')[1].split('&');
	return queriesArr.reduce(function(sum, current) {
		const key = current.split('=')[0];
		let value = current.split('=')[1];
		if(value === 'true') value = true;
		if(value === 'false') value = false;
		return {...sum, [key]: value};
	}, {});
}