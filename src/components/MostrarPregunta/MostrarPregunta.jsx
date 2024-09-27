import { useContext, useEffect} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Temporizador from "../Temporizador/Temporizador";
import { kahootContex } from "../../contexKahoot/Contexkahoot";

const MostrarPregunta = () => {
    const {test, setTest, contador, setContador, correctas, setCorrectas, 
        incorrectas, setIncorrectas, finish, setFinish, pregutnas, setPreguntas, cambiarPregunta} = useContext(kahootContex)
        
        const {codigo} = useParams()
        useEffect(() => {
            const prueba = pregutnas.find((item) => item.codigo == codigo );
            setTest(prueba)
        }, [])
    return (
        <>
        {
            finish && 
            <Container>
                <span>Buenas: {correctas} </span>
                <span> Malas: {incorrectas} </span>
            </Container>
        }

        {
            !finish && (
                <Container>
                    <Temporizador time={test?.time} finish={finish}/>
                <h1 className="text-center">{test?.preguntas[contador]?.pregunta}</h1>
                    <Row className="text-center gap-4">
                    <Col md={12} className="d-flex justify-content-center  gap-4">
                    <Button onClick={() => cambiarPregunta(test?.preguntas[contador]?.respuesta1)} variant="primary" size="lg" style={{ width: "200px"}}>{test?.preguntas[contador]?.respuesta1}</Button>
                    <Button onClick={() => cambiarPregunta(test?.preguntas[contador]?.respuesta2)} variant="danger" size="lg" style={{ width: "200px"}}> {test?.preguntas[contador].respuesta2} </Button>
                    </Col>
                    <Col md={12}  className="d-flex justify-content-center  gap-4">
                    <Button onClick={() => cambiarPregunta(test?.preguntas[contador]?.respuesta3)} variant="warning" size="lg" style={{ width: "200px"}}>{test?.preguntas[contador]?.respuesta3}</Button>
                    <Button onClick={() => cambiarPregunta(test?.preguntas[contador]?.respuesta4)} variant="info" size="lg" style={ {width: "200px"}}>{test?.preguntas[contador]?.respuesta4}</Button>
                    </Col>
                    </Row>
                
        
                </Container>
            )
        }
        </>
    );
}

export default MostrarPregunta;