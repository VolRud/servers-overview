import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { serversAC } from "../../store/AC";
import { serversThunks } from "../../store/thunks/inndex";
import { initialServersFilters } from "../../utils/constants";
import { getCurrentUrl, obbjectIsEmpty, parseUrlWithQueries } from "../../utils/helpers";
import Filters from "../Filters/Filters";
import { ServersList } from "../ServersList/ServersList";

const ServersOverview = (props) => {
    const [filtersIsOpen, setFiltersIsOpen] = useState(false);
    const {
        serversListIsLoaded,
        serversListFilteredSorted,
        filtersRules,
        sortingParametr,
        urlIsChecked,
    } = props;

    useEffect(() => {
        if(
            !serversListIsLoaded
            && serversListFilteredSorted.length === 0
        ){
            props.getServersList();
        }
        const queries = parseUrlWithQueries();
        if(!obbjectIsEmpty(queries) && serversListIsLoaded && !urlIsChecked){
            let defaultFilters = {};
            for(let key in initialServersFilters) {
                defaultFilters[key] = queries[key];
            }
            props.applyFiltersRules(defaultFilters);
            props.sortingServers({
                sortBy: queries['sortBy'],
                sortType: queries['sortType'],
            });
            props.checkUrlForFilterUpdate();
            
        } 
    },[serversListFilteredSorted, serversListIsLoaded]);

    const toggleFilter = () => {
        setFiltersIsOpen(!filtersIsOpen);
    }
    if(!serversListFilteredSorted) return null;
    return(
        <>
            <h1>Servers overview</h1>
            {filtersIsOpen
                ? (
                    <Filters
                        setUrlQueryParametr={props.setUrlQueryParametr}
                        applyFiltersRules={props.applyFiltersRules}
                        filtersRules={filtersRules}
                        toggleFilter={toggleFilter}
                    />
                )
                : (
                    <div
                        onClick={toggleFilter}
                        className="show-filters-btn"
                    >Show filters</div>
                )
            }


            <ServersList
                setUrlQueryParametr={props.setUrlQueryParametr}
                sortingServersByParametr={props.sortingServers}
                sortingParametr={sortingParametr}
                serversList={serversListFilteredSorted}
            />
        </>
    )
}

const mapStateToProps = (state) => {
	const {
        serversListIsLoaded,
        serversListFilteredSorted,
        filtersRules,
        sortingParametr,
        urlIsChecked,
    } = state.servers;

	return {
        serversListIsLoaded,
        serversListFilteredSorted,
        filtersRules,
        urlIsChecked,
        sortingParametr,
	};
};

const mapDispatchToProps = dispatch => (
	{
        checkUrlForFilterUpdate: () => dispatch(serversAC.checkUrlForFilterUpdate()),
        setUrlQueryParametr: () => dispatch(serversThunks.setUrlQueryParametr()),
        sortingServers: (parametr) => dispatch(serversThunks.sortingServers(parametr)),
        sortingServersByParametr: (parametr) => dispatch(serversAC.sortingServersByParametr(parametr)),
		getServersList: () => dispatch(serversThunks.getServersList()),
        applyFiltersRules: (filtersRules) => dispatch(serversAC.applyFiltersRules(filtersRules)),
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(ServersOverview);
