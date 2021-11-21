import {createTheme} from "@material-ui/core";

export type CurrencyType = {
    value: string,
    displayName: string
    id: number
}

export enum currencyEnum {
    USD = "USD",
    INR = "INR"
}

export type ChartDuration = {
    label: string
    value: number
}

export const currencies: CurrencyType[] = [
    {
        id: 1,
        value: currencyEnum.USD,
        displayName: currencyEnum.USD
    },
    {
        id: 2,
        value: currencyEnum.INR,
        displayName: currencyEnum.INR
    }
]

export const carouselResponsiveParams = {
    0: {
        items: 2
    },
    512: {
        items: 4
    }
}

export function numberWithCommas(price: number){
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#fff'
        },
        type: "dark"
    }
})

export const tableHeaders: string[] = ["Coin", "Price", "24h Change", "Market Cap"];

export const handleSearch = (coins: any, search: string) => {
    return coins.filter((coin: any) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(coin))
}


export const chartDays: ChartDuration[] = [
    {
        label: "24 Hours",
        value: 1,
    },
    {
        label: "30 Days",
        value: 30,
    },
    {
        label: "3 Months",
        value: 90,
    },
    {
        label: "1 Year",
        value: 365,
    },
];