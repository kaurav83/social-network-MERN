import React, { Component } from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
    cssUnderline: {
      '&:after': {
        borderBottomColor: purple[500]
      }
    }
  });
  
  const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fff9c4',
            main: '#ffeb3b',
            dark: '#ffc107',
            contrastText: '#000',
        },
        secondary: {
            light: '#CCFF90',
            main: '#76FF03',
            dark: '#64DD17',
            contrastText: '#000',
        },
    },
  });
  
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(user, 'user');
    }

    render() {
        const {classes} = this.props;
        return (
            <section className="auth">
                <div className="auth-container">
                    <div className="auth-content">
                        <div className="auth-inner">
                            <h1 className="auth-title">Авторизуйтесь</h1>
                                <p className="auth-lead">Войдите в ваш аккаунт</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <Input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email адрес"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            classes={{
                                                underline: classes.cssUnderline
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Input
                                            type="password"
                                            className="form-control"
                                            placeholder="Пароль"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                            classes={{
                                            underline: classes.cssUnderline
                                            }}
                                        />
                                    </div>
                                    <MuiThemeProvider theme={theme}>
                                        <Button 
                                            variant="contained" 
                                            type="submit" 
                                            color="secondary" 
                                            style={{width: "100%", margin: "2rem 0 0 0", borderRadius: "0"}}
                                            >Отправить
                                        </Button>
                                    </MuiThemeProvider>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
        )
    }
}

export default withStyles(styles)(Login);