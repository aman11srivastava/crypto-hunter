import React from "react";
import {useStyles} from "./BannerStyles";
import {Container, Typography} from "@material-ui/core";
import Carousel from "./Carousel/Carousel";

export const Banner = () => {
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography variant={"h2"} style={{
                        fontWeight: 'bold',
                        marginTop: 15,
                        fontFamily: 'Montserrat'
                    }}>
                        Crypto Hunter
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}
                    >
                        Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                </div>
                <Carousel/>
            </Container>
        </div>
    )
}

export default Banner;