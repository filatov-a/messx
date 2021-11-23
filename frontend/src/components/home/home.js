import React from "react";
import { Box, Typography } from '@material-ui/core';
import {CustomCard} from '../extra/card'
import {makeStyles} from '@material-ui/core/styles'
import {useTranslation} from 'react-i18next'
const Tr = useTranslation;

const UseStyles = makeStyles({
    text: {
        marginTop: 20
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
            <Box display='block'>
                <CustomCard title={t("contact")}
                            content={t("contactText")}
                            to={`/contacts`}/>
                <CustomCard title={t("cost")}
                            content={t("costText")}
                            to={`/cost`}/>
                <CustomCard title={t("location")}
                            content={t("locationText")}
                            to={`map`}/>
            </Box>
            <Box display='flex' justifyContent={'center'}>

            </Box>
        </Box>
    );

}

export default home;
