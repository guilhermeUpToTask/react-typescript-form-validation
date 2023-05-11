import {BiCheckCircle} from 'react-icons/bi';
import classes from './index.module.css';
import React from 'react';
interface  IValidProps {
    message: string;
}

export default function (props : IValidProps): React.ReactElement {
    return (
        <p className={classes.Valid}>
            <BiCheckCircle /> {props.message}
        </p>
    )
}