import {BiErrorCircle} from 'react-icons/bi';
import classes from './index.module.css';
interface  IInvalidProps {
    message: string;
}

export default function (props : IInvalidProps) {
    return (
        <p className={classes.Invalid}>
            <BiErrorCircle /> {props.message}
        </p>
    )
}