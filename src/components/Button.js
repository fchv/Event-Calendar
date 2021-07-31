import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {
    return <button onClick={onClick} 
            style = {{backgroundColor: color}} 
            className = 'btn'>
        {text}
        </button>
}

Button.defaultProps = {
    color: 'steelblue', text: 'Button'
}
Button.propTypes = {
    text: PropTypes.string, color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button


//This implementation would also work
/*
const Button = (props) => {
    return <button style = {{backgroundColor: props.color}} className = 'btn'>{props.text}</button>
}
*/