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

function PostAvatar(props) {
    const { classes } = props;
    
    return (
        <div className={classes.row}>
            <Avatar
                alt={props.itemPost.name}
                src={props.itemPost.avatar}
                className={classNames(classes.avatar, classes.bigAvatar)}
            />
        </div>
    );
}

PostAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostAvatar);