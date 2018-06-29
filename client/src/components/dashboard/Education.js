import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// import moment from 'moment';

import { deleteEducation } from '../../actions/profileActions';

import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#FFCDD2',
            main: '#F44336',
            dark: '#FF1744',
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


class Education extends Component {
    onDeleteClick(id) {
        this.props.deleteEducation(id);
    }

    render() {
        const education = this.props.education.map(item => {
            return (
                <tr key={item._id}>
                    <td>{item.school}</td>
                    <td>{item.degree}</td>
                    <td>
                        <Moment format="DD/MM/YYYY">
                            {item.from}
                        </Moment> -
                        {item.to === null ? (' До настоящего момента')
                            :
                            (<Moment format="DD/MM/YYYY">{item.to}</Moment>)}
                    </td>
                    <td>
                        <MuiThemeProvider theme={theme}>
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ textTransform: 'capitalize', color: "#fff" }}
                                onClick={this.onDeleteClick.bind(this, item._id)}
                            >
                                Удалить
                                </Button>
                        </MuiThemeProvider>

                    </td>
                </tr>
            );
        })
        return (
            <div>
                <h4>Учётные данные об образовании</h4>
                <table className="table-dashboard">
                    <thead>
                        <tr>
                            <th>Школа</th>
                            <th>Степень</th>
                            <th>Года</th>
                            <th></th>
                        </tr>

                        {education}

                    </thead>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);