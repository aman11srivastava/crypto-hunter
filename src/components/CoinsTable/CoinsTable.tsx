import React, {useEffect, useState} from "react";
import axios from "axios";
import {CoinList} from "../../config/config";
import {CryptoState} from "../../context/CryptoContext";
import {
    Container,
    LinearProgress,
    MuiThemeProvider,
    Table, TableCell,
    TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import {darkTheme, tableHeaders} from "../../utils/utils";
import CoinsTableBody from "./CoinsTableBody";
import PaginationComponent from "./Pagination/PaginationComponent";

export const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')
    const [page, setPage] = useState<number>(1);
    const {currency, symbol} = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const {data} = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line
    }, [currency])

    return (
        <MuiThemeProvider theme={darkTheme}>
            <Container style={{textAlign: 'center'}}>
                <Typography variant={"h4"} style={{margin: 18, fontFamily: 'Montserrat'}}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField label={"Search for a cryptocurrency..."} style={{marginBottom: 20, width: '100%'}}
                           variant={"outlined"} value={search} onChange={(e) => setSearch(e.target.value)}/>

                <TableContainer>
                    {
                        loading ? <LinearProgress style={{backgroundColor: 'gold'}}/> : (
                            <Table>
                                <TableHead style={{backgroundColor: '#EEBC1D'}}>
                                    <TableRow>
                                        {tableHeaders.map((head: string) => (
                                            <TableCell style={{
                                                color: 'black',
                                                fontWeight: '700',
                                                fontFamily: "Montserrat"
                                            }}
                                                key={head}
                                                       align={head === "Coin" ? "inherit": "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <CoinsTableBody page={page} coins={coins} symbol={symbol} search={search}/>
                            </Table>
                        )}
                </TableContainer>
                <PaginationComponent setPage={setPage} coins={coins} search={search}/>
            </Container>
        </MuiThemeProvider>
    )
}

export default CoinsTable