import React from 'react';

import { ArrowBackIos, ArrowBack } from '@material-ui/icons';

interface Props {
    onClick: () => void;
    className?: string;
}

export const BackButton: React.FC<Props> = props => {

    return (
        <>
            <ArrowBackIos
                className={`header-back-btn desktop--hide ${props.className ? props.className : ''}`}
                onClick={() => props.onClick()}
            />
            <ArrowBack
                className={`header-back-btn mobile--hide ${props.className ? props.className : ''}`}
                onClick={() => props.onClick()}
            />
        </>
    )
}
