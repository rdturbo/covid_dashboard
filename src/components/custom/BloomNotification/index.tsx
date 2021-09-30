import React from 'react';

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface BloomNotificationProps {
    message: string;
    positionVertical?: 'top' | 'bottom';
    positionHorizontal?: 'right' | 'left' | 'center';
    type: 'success' | 'error' | 'info' | 'warning';
    visiblity: boolean;
    onClose: () => void;
}


class BloomNotification extends React.Component<BloomNotificationProps, any> {

    render() {
        const { positionHorizontal, positionVertical, message, type, visiblity, onClose } = this.props;
        return (
            <Snackbar
                open={visiblity}
                anchorOrigin={{
                    vertical: positionVertical ? positionVertical : 'top',
                    horizontal: positionHorizontal ? positionHorizontal : 'right'
                }}
                autoHideDuration={1000}
            >
                <Alert onClose={onClose} severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        )
    }
}

export default BloomNotification
