import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { kahootContex } from "../../contexKahoot/Contexkahoot";

const LayautClient = () => {
    const { preguntass, setPreguntass, notFound, setNotFound, tests, setTests } = useContext(kahootContex)
    const navigate = useNavigate()

    const { codigo } = useParams()

    useEffect(() => {
        const prueba = preguntass.find((item) => item.codigo == codigo)
        if (!prueba) {
            setNotFound(true)
        } else {
            setTests(prueba)
        }
    })
    const start = () => {
        navigate(`/game/${codigo}/start`)
    }
    return (
        <>
            {notFound && <h1> Test No Encotrado </h1>}
            {!notFound &&
                <div className="d-flex flex-column align-items-center ">
                    <img className="border-danger" src='https://unterrichtgestalten.ch/wp-content/uploads/2020/06/Untitled-design-78.png' alt="" />
                    <p className="text-success">the autor fame is: {tests?.autor}</p>
                    <p className="text-success">time to take test: {`${tests?.time} Minutos`}</p>
                    <p className="text-success">total Questions in test: {tests?.preguntas?.length}</p>
                    <Button className="btn btn-violet text-danger bg-dark" onClick={() => start(codigo)} variant=''>start</Button>
                </div>
            }
        </>
    );
}

export default LayautClient;