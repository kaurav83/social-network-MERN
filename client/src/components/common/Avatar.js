import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    row: {
        display: 'flex',
        // justifyContent: 'center',
    },
    avatar: {
        // margin: 100,
    },
    bigAvatar: {
        width: 100,
        height: 100,
    },
};

function ImageAvatars(props) {
    const { classes } = props;
    console.log(props, 'avatar')
    return (
        <div className={classes.row}>
            <Avatar
                alt={props.profile.user.name}
                src={props.profile.user.avatar}
                className={classNames(classes.avatar, classes.bigAvatar)}
            />
        </div>
    );
}

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);