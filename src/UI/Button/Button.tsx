import classes from './Button.module.css'
interface ButtonProps{
    name:string;
    onClick?: () => void;
}
function Button({name,onClick}:ButtonProps){
    return <button className={classes.button} onClick={onClick}>{name}</button>
}
export default Button;