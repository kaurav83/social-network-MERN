import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fff9c4',
            main: '#ffeb3b',
            dark: '#ffc107',
            contrastText: '#000',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const Relevant = () => {


    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <Button variant="contained" color="primary">
                    MuiThemeProvider
                </Button>
            </MuiThemeProvider>
        </div >
    )

}

export default Relevant;