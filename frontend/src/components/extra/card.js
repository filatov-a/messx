import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Button, ButtonBase} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import config from "../../config/config";
import * as rd from "react-router-dom";

const UseStyles = makeStyles({
    root: {
        // width: 240,
        margin: '20px'
    },
    media: {
        height: 130,
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        width: "100%",
        height: "100%",
        textTransform: "none"
    },
    text: {
        // whiteSpace: 'wrap',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    right: {
        display: 'flex',
        flex:1,
        textAlign:'left',
        "& > *": {
            marginRight: 15,
        }
    },
});

export const CustomCard = (props) => {
    const classes = UseStyles();
    const history = rd.useHistory();

    let width = props.width, height = props.height;

    const onClick = () => {
        history.push(props.to)
    }

    return (
        <Card className={classes.root} style={{width: width, height: height}}>
            <Button className={classes.link} onClick={onClick}>
                {props.image &&
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="Contemplative Reptile"
                />
                }
                <CardContent>
                    <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                        {props.content}
                    </Typography>
                </CardContent>
            </Button>
            {props.cardActions &&
            <CardActions>
                <Box display='flex' style={{width: '100%'}}>
                    <Box className={classes.right}>
                        <Button size="small" color="primary" href={props.to} >
                            Learn More
                        </Button>
                    </Box>
                    {props.author && props.userId &&
                    <Box style={{flex:1, textAlign:'right'}}>
                        <ButtonBase href={`/users/${props.userId}`} style={{borderRadius:'100%', padding:10}}>
                            <Avatar alt="Remy Sharp" src={`${config.url}/${props.author}`} style={{width: 30, height:30}}/>
                        </ButtonBase>
                    </Box>
                    }
                </Box>
            </CardActions>
            }
        </Card>
    );
}
