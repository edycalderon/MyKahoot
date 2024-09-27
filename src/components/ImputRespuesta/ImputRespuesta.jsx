import { InputGroup, Form } from "react-bootstrap";
const ImputRespuesta = ({ nameRadio, inputRef, onChangeTwo, onChange, name, activate }) => {
    return (
        <>
            <InputGroup>
                <Form.Control onChange={onChange} ref={inputRef} aria-label="Text input with radio button" name={name} />
                <InputGroup.Radio disabled={activate} name={nameRadio} onChange={onChangeTwo} aria-label="Text input with radio button"
                />
            </InputGroup>
        </>
    );
}

export default ImputRespuesta;