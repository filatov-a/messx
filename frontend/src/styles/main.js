export const styleAuth = {
    Div: {
        width: '320px',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5%',
    },
    Button: {
        width: '100%',
        height: '40px',
        marginTop: '10px'
    },
    TextField: {
        width: '100%',
        marginBottom: '10px',
    },
    TextareaAutosize: {
        width: '98%',
        margin: "auto",
        marginBottom: '5px',
        minHeight: 80,
        maxWidth: "98%"
    }
};

export const styleToolbar = {
    toolbar: {
        background: '#9f9f9f',
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
        font: 'italic small-caps bold 15px',
        padding: '10px',
        marginRight: '20px',
        textAlign: 'left',
        color: 'black',
        textDecoration: 'none',
        '&:hover':{
            color: '#a22929'
        }
    }
}
