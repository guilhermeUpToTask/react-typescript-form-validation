import React from 'react';
import {BiErrorCircle} from 'react-icons/bi';
import classes from './index.module.css';
interface  IInvalidProps {
    message: string;
}

export default function (props : IInvalidProps) : React.ReactElement {
    return (
        <p className={classes.Invalid}>
            <BiErrorCircle /> {props.message}
        </p>
    )
}