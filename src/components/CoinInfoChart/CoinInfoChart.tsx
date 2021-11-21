import React, {useEffect, useState} from "react";
import {CryptoState} from "../../context/CryptoContext";
import axios from "axios";
import {HistoricalChart} from "../../config/config";
import {CircularProgress, MuiThemeProvider} from "@material-ui/core";
import {chartDays, ChartDuration, darkTheme} from "../../utils/utils";
import {useStyles} from "./CoinInfoChartStyles";
import {Line} from 'react-chartjs-2';
import SelectButton from "../SelectButton/SelectButton";

interface CoinInfoChartProps {
    coin: any
}

export const CoinInfoChart = ({coin}: CoinInfoChartProps) => {
    const [historicalData, setHistoricalData] = useState<any>();
    const [days, setDays] = useState<number>(1);
    const {currency} = CryptoState();
    const classes = useStyles();

    const fetchHistoricalData = async () => {
        const {data} = await axios.get(HistoricalChart(coin?.id, days, currency));
        setHistoricalData(data?.prices);
    }

    useEffect(() => {
        fetchHistoricalData()
        // eslint-disable-next-line
    }, [currency, days, coin])

    console.log(historicalData)

    return (
        <MuiThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    !historicalData ? <CircularProgress style={{color: "gold"}} size={250} thickness={1}/> :
                        <>
                            <Line data={{
                             labels: historicalData?.map((coin: any) => {
                                 let date = new Date(coin[0]);
                                 let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
                                 return days === 1 ? time : date.toLocaleDateString()
                             }),
                                datasets: [                  {
                                    data: historicalData?.map((coin: any) => coin[1]),
                                    label: `Price ( Past ${days} Days ) in ${currency}`,
                                    borderColor: "#EEBC1D",
                                }]
                            }} options={{
                                  elements: {
                                      point: {
                                          radius: 1
                                      }}}}
                            />
                            <div style={{
                                display: 'flex', marginTop: 20, justifyContent: "space-around", width: "100%"
                            }}>
                                {chartDays.map((day: ChartDuration) => (
                                    <SelectButton selected={day.value === days} key={day.value} onClick={() => setDays(day.value)}>
                                        {day.label}
                                    </SelectButton>
                                ))}
                            </div>
                        </>
                }
            </div>
        </MuiThemeProvider>
    )
}

export default CoinInfoChart