import {makeStyles} from '@material-ui/core/styles'

export const UseStyles =  makeStyles((theme)=>({
    toolbar: {
        backgroundColor: '#989898',
    },
    root: {
        flexGrow: 1,
    },
    a: {
        font: 'italic small-caps bold 15px',
        padding: '10px',
        marginRight: '20px',
        textAlign: 'left',
        color: 'black',
        textDecoration: 'none',
        '&:hover':{
            color: '#110022'
        }
    },
    button: {
        fontSize: '15px',
        // fontFamily: 'initial',
    },
    homeDiv: {
        flexGrow: 7,
        textAlign: 'left',
    },
    img: {
        boxShadow: '0 0 0 0px black, 0 0 2px #333',
        '&:hover': {
            boxShadow: '0 0 0 0px black, 0 0 5px #333',
        }
    },
}));
