import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// import moment from 'moment';

import { deleteExperience } from '../../actions/profileActions';

import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
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

class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleTooltipClose = () => {
        this.setState({ open: false });
    };

    handleTooltipOpen = () => {
        this.setState({ open: true });
    };

    onDeleteClick(id) {
        this.props.deleteExperience(id);
    }

    render() {
        const experience = this.props.experience.map(item => {
            return (
                <tr key={item._id} className="row-tbody">
                    <td>{item.company}</td>
                    <td>{item.title}</td>
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
                            <IconButton
                                color="primary"
                                onClick={this.onDeleteClick.bind(this, item._id)}
                                title="Удалить"
                            >
                                <Delete className="delete-icon icon" />
                            </IconButton>
                        </MuiThemeProvider>

                    </td>
                </tr>
            );
        })
        return (
            <div className="table-block">
                <h4 className="table-title">Учётные данные опыта</h4>
                <table className="table-dashboard">
                    <thead className="thead-dashboard">
                        <tr>
                            <th>Компания</th>
                            <th>Название</th>
                            <th>Года</th>
                            <th style={{ borderBottom: 'none' }}></th>
                        </tr>

                        {experience}

                    </thead>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);