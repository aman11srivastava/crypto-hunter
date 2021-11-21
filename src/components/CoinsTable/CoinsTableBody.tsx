import React from "react";
import {TableBody, TableCell, TableRow} from "@material-ui/core";
import {handleSearch, numberWithCommas} from "../../utils/utils";
import {useStyles} from "./CoinsTableStyles";
import {useHistory} from "react-router-dom";

interface CoinsTableBodyProps {
    coins: any
    search: string
    symbol: string
    page: number
}

export const CoinsTableBody = ({coins, search, symbol, page}: CoinsTableBodyProps) => {
    const classes = useStyles();
    const history = useHistory();
    let initialPage: number = (page-1)*10;
    let finalPage: number = (page-1)*10 + 10;
    return (
        <TableBody>
            {handleSearch(coins, search).slice(initialPage, finalPage).map((row: any) => {
                let priceChange = row?.price_change_percentage_24h;
                let profit: boolean = priceChange >= 0;
                return (
                    <TableRow
                        className={classes.row} key={row.name}
                        onClick={() => history.push(`/coins/${row.id}`)}>
                        <TableCell scope={"row"} component={"th"} style={{display: 'flex', gap: 15}}>
                            <img src={row.image} alt={row.name} height={"50"} style={{marginBottom: 10}}/>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{textTransform: "uppercase", fontSize: 22,}}>
                                    {row.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>{row.name}</span>
                            </div>
                        </TableCell>
                        <TableCell align="right">{symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}</TableCell>
                        <TableCell align="right" style={{color: priceChange > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500}}>
                            {profit && "+"} {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                            {symbol}{" "} {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                    </TableRow>
                )})}
        </TableBody>
    )
}

export default CoinsTableBody