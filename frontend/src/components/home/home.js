import React from "react";
import { Box, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles'
import {useTranslation} from 'react-i18next'
import {Link} from "react-router-dom"
import config from "../../config/config";
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
            <Box display={'flex'} style={{width: "100%", backgroundRepeat: "repeat-x"}}>
                <img style={{width: 150}} src={`${config.url}/images/Earth.png`} alt={''}/>
                <div style={{color: "gray"}}>
                    <p>      # 0 1 0 1      </p>
                    <p># 0 1 0 1 0 0 1 0 1 #</p>
                    <p># 0 1 0 1 0 0 1 0 1 #</p>
                    <p>      # 0 1 0 1      </p>
                </div>
            </Box>
            <Typography className={classes.text} variant="h4" component="h2">
                {t("hello")}
            </Typography>
            <Link to={"/posts"}>Posts</Link>
        </Box>
    );

}

export default home;
