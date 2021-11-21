import React from "react";
import {
    AppBar,
    Container,
    MenuItem,
    MuiThemeProvider,
    Select,
    Toolbar,
    Typography
} from "@material-ui/core";
import {currencies, CurrencyType, darkTheme} from "../../utils/utils";
import {useStyles} from "./HeaderStyles";
import {useHistory} from 'react-router-dom';
import {CryptoState} from "../../context/CryptoContext";

export const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const {currency, setCurrency} = CryptoState();

    return (
        <MuiThemeProvider theme={darkTheme}>
            <AppBar color={"transparent"} position={"static"}>
                <Container>
                    <Toolbar>
                        <Typography variant={"h5"} onClick={() => history.push('/')} className={classes.title}>
                            Crypto Hunter
                        </Typography>
                        <Select variant={"outlined"} style={{
                            width: 100,
                            height: 40,
                            marginRight: 15
                        }}
                                value={currency} onChange={(e) => setCurrency(e.target.value)}
                        >
                            {currencies.map((currency: CurrencyType) => (
                                <MenuItem key={currency.id} value={currency.value}>{currency.displayName}</MenuItem>
                            ))}
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </MuiThemeProvider>
    )
}

export default Header