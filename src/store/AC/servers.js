import { serversConstants } from "../constants"

export const applyFiltersRules = (filtersRules) => {
    return {
        type: serversConstants.APPLY_SERVERS_OVERVIEW_FILTERS_RULES,
        payload: filtersRules,
    }
}

export const sortingServersByParametr = (parametr) => {
    return {
        type: serversConstants.SORTING_SERVERS_BY_PARAMETR,
        payload: parametr,
    }
}

export const checkUrlForFilterUpdate = () => {
    return {
        type: serversConstants.CHECK_URL_FOR_UPDATING_FILTERS,
    }
}