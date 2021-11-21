import React, {useEffect, useState} from "react";
import {useStyles} from "./CarouselStyles";
import axios from "axios";
import {TrendingCoins} from "../../../config/config";
import {CryptoState} from "../../../context/CryptoContext";
import AliceCarousel from 'react-alice-carousel';
import {carouselResponsiveParams, numberWithCommas} from "../../../utils/utils";
import {Link} from "react-router-dom";

export const Carousel = () => {
    const classes = useStyles();
    const {currency, symbol} = CryptoState();
    const [trending, setTrending] = useState([]);

    const fetchTrendingCoins = async () => {
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data);
    }

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line
    }, [currency])

    const items = trending.map((coin: any) => {
        let priceChange = coin?.price_change_percentage_24h;
        let profit: boolean = priceChange >= 0;
        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin?.name} height={"80"} style={{marginBottom: 10}}/>
                <span>
                    {coin?.symbol} &nbsp;
                    <span style={{
                        color: priceChange > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 'bold'
                    }}>{profit && "+"}{coin?.price_change_percentage_24h.toFixed(2)}%</span>
                </span>
                <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    })

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                responsive={carouselResponsiveParams}
                autoPlay
                items={items}
                disableButtonsControls
            />
        </div>
    )
}

export default Carousel