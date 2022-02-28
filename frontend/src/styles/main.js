import { styled, alpha } from '@mui/material/styles';
import {InputBase} from '@mui/material';

export const CustomTextField = styled(InputBase)(({ theme }) => ({
    width: '100%',
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        color: "#a2a2a2",
        borderRadius: 4,
        position: 'relative',
        backgroundColor: "rgba(255,255,255,0)",
        border: '1px solid #a2a2a2',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

export const styleAuth = {
    Title: {
        color: "#a2a2a2"
    },
    Div: {
        width: '320px',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
    },
    Button: {
        width: '100%',
        height: '40px',
        marginBottom: 10,
        marginTop: 0,
    },
    TextField: {
        width: '100%',
        marginBottom: '10px',
        color: "#a2a2a2",
    },
    TextareaAutosize: {
        color: "#a2a2a2",
        background: "rgba(255,255,255,0)",
        width: '98%',
        margin: "auto",
        marginBottom: '5px',
        minHeight: 80,
        maxWidth: "98%"
    },
    Form: {
        display: "grid",
        gridRowGap: 8
    }
};

export const styleToolbar = {
    toolbar: {
        background: '#0E082CFF',
        // boxShadow: '0 0 0 0px black, 0 0 0px #333',
        borderBottom: "0.1px solid #a2a2a2"
    },
    button: {
        fontSize: '15px',
    },
    Avatar: {
        boxShadow: '0 0 0 0px black, 0 0 2px #333',
        '&:hover': {
            boxShadow: '0 0 0 0px black, 0 0 5px #333',
        }
    },
    Link: {
        color: "#a2a2a2",
        font: 'italic small-caps bold 15px',
        padding: '10px',
        marginRight: '20px',
        textAlign: 'left',
        textDecoration: 'none',
        '&:hover':{
            color: '#a22929'
        }
    }
}
