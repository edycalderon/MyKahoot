import { useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Temporizador from "../Temporizador/Temporizador";
import { kahootContex } from "../../contexKahoot/Contexkahoot";
import { PlayIcon, XMarkIcon,  } from '@heroicons/react/24/solid'
import './style.css'
const MostrarPregunta = () => {
    const { test, setTest, contador, setContador, correctas, setCorrectas,
        incorrectas, setIncorrectas, finish, setFinish, pregutnas, setPreguntas, cambiarPregunta } = useContext(kahootContex)

    const { codigo } = useParams()
    useEffect(() => {
        const prueba = pregutnas.find((item) => item.codigo == codigo);
        setTest(prueba)
    }, [])
    return (
        <>
            {
                finish &&
                <Container>
                    <div className="flex d-flex justify-content-center mt-5  ">
                        <div class="cards">
                            <div class="card red">
                                <h2 class="second-text">Incorrectas: {incorrectas}</h2>
                            </div>
                            <div class="card blue">
                                <h2 class="second-text">Buenas: {correctas}</h2>
                            </div>
                        </div>
                    </div>

                </Container>
            }

            {
                !finish && (
                    <Container>
                        <Temporizador time={test?.time} finish={finish} />
                        <div className="mt-5">
                            <h1 className="text-center Pregunta rounded-pill">{test?.preguntas[contador]?.pregunta}</h1>
                            <Row className="text-center gap-4 mt-5">
                                <Col md={12} className="d-flex justify-content-center  gap-4">
                                    <Button className="border-black" onClick={() => cambiarPregunta(test?.preguntas[contador]?.respuesta1)} variant="primary" size="lg" style={{ width: "200px" }}> <PlayIcon width={55} height={55} />{test?.preguntas[contador]?.respuesta1}</Button>
                                    <Button className="border-black" onClick={() => cambiarPregunta(test?.preguntas[contador]?.respuesta2)} variant="danger" size="lg" style={{ width: "200px" }}> <XMarkIcon width={55} height={55} /> {test?.preguntas[contador].respuesta2} </Button>
                                </Col>
                                <Col md={12} className="d-flex justify-content-center  gap-4">
                                    <Button className="border-black" onClick={() => cambiarPregunta(test?.preguntas[contador]?.respuesta3)} variant="warning" size="lg" style={{ width: "200px" }}><PlayIcon width={55} height={55} /> {test?.preguntas[contador]?.respuesta3}</Button>
                                    <Button className="border-black" onClick={() => cambiarPregunta(test?.preguntas[contador]?.respuesta4)} variant="info" size="lg" style={{ width: "200px" }}> <XMarkIcon width={55} height={55} />{test?.preguntas[contador]?.respuesta4}</Button>
                                </Col>
                            </Row>
                        </div>

                    </Container>
                )
            }
        </>
    );
}

export default MostrarPregunta;