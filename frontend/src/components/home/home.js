import React from "react";
import { Box, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles'
import {useTranslation} from 'react-i18next'
import {Link} from "react-router-dom"
const Tr = useTranslation;

const UseStyles = makeStyles({
    text: {
        marginTop: 20,
        color: "green"
    }
})

function home() {
    const classes = UseStyles()
    const {t} = Tr();
    return (
        <Box>
            <Typography className={classes.text} variant="h4" component="h2">
                {t("hello")}
            </Typography>
            <Link to={"/posts"}>Posts</Link>
        </Box>
    );

}

export default home;
