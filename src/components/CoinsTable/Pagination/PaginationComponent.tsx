import React from "react";
import {Pagination} from "@material-ui/lab";
import {handleSearch} from "../../../utils/utils";
import {useStyles} from "../CoinsTableStyles";

interface PaginationComponentProps {
    coins: any
    search: string
    setPage: (val: number) => void;
}

export const PaginationComponent = ({coins, search, setPage}: PaginationComponentProps) => {
    const classes = useStyles();
    return (
        <Pagination classes={{ul: classes.pagination}}
            style={{padding: 20, width: "100%", display: 'flex', justifyContent: "center"}}
            count={Number((handleSearch(coins, search)?.length/10).toFixed())}
            onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
            }}
        />

    )
}

export default PaginationComponent