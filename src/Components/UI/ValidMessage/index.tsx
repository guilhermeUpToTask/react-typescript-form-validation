import {BiCheckCircle} from 'react-icons/bi';
import classes from './index.module.css';
interface  IValidProps {
    message: string;
}

export default function (props : IValidProps) {
    return (
        <p className={classes.Valid}>
            <BiCheckCircle /> {props.message}
        </p>
    )
}