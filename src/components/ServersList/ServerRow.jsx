import { getDaysFromSeconds } from "../../utils/helpers";

export const ServerRow = (props) => {
    const { serverData: {
        ipv4, location, serverName, status, uptime, created,
        stats: {cpu, ram, disk, },
    },
} = props;


    return(
        <tr>
            <td>{serverName}</td>
            <td>{location}</td>
            <td>{ipv4}</td>
            <td>{getDaysFromSeconds(uptime)}</td>
            <td>{status}</td>
            <td className="cpu-util"><span>CPU: {cpu}</span> <span>RAM: {ram}</span> <span>Disk: {disk}</span></td>
            <td>{created}</td>
        </tr>
    )
}