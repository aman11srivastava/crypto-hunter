import React from "react";
import {makeStyles} from "@material-ui/core";

interface SelectButtonProps {
    onClick: () => void
    selected: any
}

export const SelectButton: React.FC<SelectButtonProps> = (props) => {
    const useStyles = makeStyles({
        selectButton: {
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: props.selected ? "gold" : "",
            color: props.selected ? "black" : "",
            fontWeight: props.selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "gold",
                color: "black",
            },
            width: "22%"
        },
    });
    const classes = useStyles();
    return (
        <span {...props} className={classes.selectButton}>
            {props.children}
        </span>
    )
}

export default SelectButton