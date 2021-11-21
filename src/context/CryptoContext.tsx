import React, {createContext, useContext, useEffect, useState} from "react";
import {currencyEnum} from "../utils/utils";

const Crypto = createContext<any>('')

export const CryptoContext = ({children}: any) => {
    const [currency, setCurrency] = useState<string>(currencyEnum.INR);
    const [symbol, setSymbol] = useState<string>("₹")

    useEffect(() => {
        if (currency === currencyEnum.INR) {
            setSymbol("₹")
        } else if (currency === currencyEnum.USD) {
            setSymbol("$")
        }
    }, [currency])

    return (
        <Crypto.Provider value={{currency, symbol, setCurrency}}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto);
}