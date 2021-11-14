import './InputComponent.css'

const InputComponent = ({
    type,
    placeHolder,
    value,
    isRequired,
    onChangeFunction,
}) => {
    return (
        <input
            className='form-control input-field'
            type={type}
            placeholder={placeHolder}
            value={value}
            required={isRequired}
            onChange={(e) => onChangeFunction(e.target.value)}
        />
    )
}

export default InputComponent
