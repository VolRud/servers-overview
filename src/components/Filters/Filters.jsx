import { useEffect, useState } from "react";
import { initialServersFilters } from "../../utils/constants";
import { isNumber, obbjectIsEmpty } from "../../utils/helpers";

const Filters = (props) => {
    const { filtersRules, } = props;
    const [filtersState, setFilterState] = useState({});
    useEffect(() => {
        setFilterState(filtersRules);

    }, []);
    const handleChangeInput = (e) => {
        const { name, value, } = e.target;
        if(
            (name === 'cpuUtilizationFrom' || name === 'cpuUtilizationTo')
            && (value < 0 || value > 100) 
        ) {
            return;
        } else {
            setFilterState({
                ...filtersState,
                [name]: value,
            });
        }
    }
    const handleChangeCheckbox = (e) => {
        const { name, } = e.target;
        setFilterState({
            ...filtersState,
            [name]: !filtersState[name],
        });
    }
    const clearFilters = () => {
        props.applyFiltersRules(initialServersFilters);
        setFilterState(initialServersFilters);
    }
    const hideFilters = () => {
        props.toggleFilter();
    }
    const applyFilters = () => {
        props.applyFiltersRules(filtersState);
        props.setUrlQueryParametr();
    }
    if(obbjectIsEmpty(filtersState)) return null;
    return(
        <>
            <div className="row">
                <div className="input-group col-sm-6">
                    <div className="input-group-append">
                        <span className="input-group-text">Server name</span>
                        <input
                            name="serverName"
                            value={filtersState.serverName}
                            onChange={(e)=>handleChangeInput(e)}
                            type="text"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="input-group col-sm-6">
                    <div className="input-group-append">
                        <span className="input-group-text">CPU Utilization from</span>
                        <input
                            name="cpuUtilizationFrom"
                            value={filtersState.cpuUtilizationFrom}
                            onChange={(e)=>handleChangeInput(e)}
                            type="text"
                            className="form-control"
                        />
                        <span className="input-group-text">%</span>
                        <span className="input-group-text">to</span>
                        <input
                            value={filtersState.cpuUtilizationTo}
                            name="cpuUtilizationTo"
                            onChange={(e)=>handleChangeInput(e)}
                            type="text"
                            className="form-control"
                        />
                        <span className="input-group-text">%</span>
                    </div>
                </div>
            </div>
            <p className="font-weight-bold">Server status</p>
            <div className="row">

        <ul className="list-group list-group-flush">
        <li className="list-group-item">
            <div className="custom-control custom-checkbox">
            <input
                name="isOnline"
                checked={filtersState.isOnline}
                onChange={(e)=>handleChangeCheckbox(e)}
                type="checkbox"
                className="custom-control-input"
                id="isOnline"
            />
            <label className="custom-control-label" htmlFor="isOnline">Online</label>
            </div>
        </li>
        <li className="list-group-item">
            <div className="custom-control custom-checkbox">
            <input
                name="isOffline"
                checked={filtersState.isOffline}
                onChange={(e)=>handleChangeCheckbox(e)}
                type="checkbox"
                className="custom-control-input"
                id="isOfflne"
            />
            <label className="custom-control-label" htmlFor="isOfflne">Offline</label>
            </div>
        </li>
        <li className="list-group-item">
            <div className="custom-control custom-checkbox">
            <input
                name="isIddle"
                checked={filtersState.isIddle}
                onChange={(e)=>handleChangeCheckbox(e)}
                type="checkbox"
                className="custom-control-input"
                id="isIddle"
            />
            <label className="custom-control-label" htmlFor="isIddle">Iddle</label>
            </div>
        </li>

        </ul>
        </div>
        <div className="row filter-buttons">
            <button
                onClick={clearFilters}
                type="button"
                className="btn btn-primary"
            >Clear filters</button>
            <button
                onClick={hideFilters}
                type="button"
                className="btn btn-secondary"
            >Hide filters</button>
            <button
                onClick={applyFilters}
                type="button"
                className="btn btn-success"
            >OK</button>
        </div>
        </>
    )
}

export default Filters;
