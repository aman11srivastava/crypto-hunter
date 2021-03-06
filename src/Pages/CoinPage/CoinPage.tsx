import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CryptoState} from "../../context/CryptoContext";
import axios from "axios";
import {SingleCoin} from "../../config/config";
import {useStyles} from "./CoinPageStyles";
import CoinInfoChart from "../../components/CoinInfoChart/CoinInfoChart";
import {LinearProgress, Typography} from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import {numberWithCommas} from "../../utils/utils";

interface CoinPageParams {
    id: string | undefined
}

export const CoinPage = () => {
    const {id} = useParams<CoinPageParams>();
    const [coin, setCoin] = useState<any>([])
    const {currency, symbol} = CryptoState();
    const classes = useStyles();

    const fetchSingleCoin = async () => {
        const {data} = await axios.get(SingleCoin(id));
        setCoin(data);
    }

    useEffect(() => {
        fetchSingleCoin();
        // eslint-disable-next-line
    }, [currency])

    if (!coin) return <LinearProgress style={{backgroundColor: "gold"}}/>

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img src={coin?.image?.large} alt={coin?.name} height={"200"} style={{marginBottom: 20}}/>
                <Typography variant={"h3"} className={classes.heading}>{coin?.name}</Typography>
                <Typography variant={"subtitle1"} className={classes.description}>
                    {ReactHtmlParser(coin?.description?.en.split('. ')[0])}.
                </Typography>
                <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{fontFamily: "Montserrat"}}
              >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
                    <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>&nbsp; &nbsp;<Typography variant="h5" style={{fontFamily: "Montserrat"}}>
              {symbol}{" "}{numberWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
                    <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>&nbsp; &nbsp;<Typography variant="h5" style={{fontFamily: "Montserrat"}}>
              {symbol}{" "}{numberWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
            </Typography>
          </span>
                </div>
            </div>
            <CoinInfoChart coin={coin}/>
        </div>
    )
}

export default CoinPage