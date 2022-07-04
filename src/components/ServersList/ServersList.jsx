import React from 'react';
import { ServerRow } from './ServerRow';

const tableHeaders = ['Server Name', 'Location', 'IPv4', 'Uptime', 'Status', 'Stats', 'Created',];

export const ServersList = (props) => {
	const { serversList, sortingParametr, } = props;
	const sortBy = (parametr) => {
		props.sortingServersByParametr(parametr);
		props.setUrlQueryParametr();
	}; 
	return (
		<>
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Server Name</th>
						<th scope="col">Location</th>
						<th scope="col">IPv4</th>
						<th scope="col">Uptime (days)
							<div className='sort-btns'>
								<div
									onClick={()=>sortBy({sortBy: 'uptime', sortType: 'az'})}
								>↑</div>
								<div
									onClick={()=>sortBy({sortBy: 'uptime', sortType: 'za'})}
								>↓</div>
							</div>
						</th>
						<th scope="col">Status
							<div className='sort-btns'>
								<div
									onClick={()=>sortBy({sortBy: 'status', sortType: 'az'})}
								>↑</div>
								<div
									onClick={()=>sortBy({sortBy: 'status', sortType: 'za'})}
								>↓</div>
							</div>
						</th>
						<th scope="col">Stats</th>
						<th scope="col">Created
							<div className='sort-btns'>
								<div
									onClick={()=>sortBy({sortBy: 'created', sortType: 'za'})}
								>↑</div>
								<div
									onClick={()=>sortBy({sortBy: 'created', sortType: 'az'})}
								>↓</div>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{serversList.map(item => {
						return(
							<ServerRow
								key={item.id}
								serverData={item}
							/>
						);
					})}

				</tbody>
			</table>
		</>
	);
};
