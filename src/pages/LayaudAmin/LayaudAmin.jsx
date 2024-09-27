import { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { kahootContex } from "../../contexKahoot/Contexkahoot";
import { useNavigate } from "react-router-dom";

const LayaudAmin = () => {
    //const {teste} = useContext(kahootContex)
    const teste = JSON.parse(localStorage.getItem('tests'))
    const navigate = useNavigate('/')

    const CopyLink = (code) => {
        navigator.clipboard.writeText(`${window.location}game/${code}`)
    }
    return (
        <>
            <div className="container pt-5 ">
                <div className="d-flex justify-content-end">

                    <Link to='/create' className="btn btn-outline-danger text-dark">
                        Crear test
                    </Link>

                </div>
                <div className="d-flex flex-column justify-content-center">
                    <Table responsive className="table-dark border-danger text-center" bordered>
                        <thead  bordered> 
                            <tr>
                                <th>#</th>
                                <th>nombre de la prueba</th>
                                <th>duracion</th>
                                <th>Autor</th>
                                <th>total preguntas</th>
                                <th>codigo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody className=" table-dark border-danger ">
                            {teste?.map((pregunta) => (

                                <tr key={pregunta.pregunta} >
                                    
                                    <td>{pregunta.time}</td>
                                    <td>{pregunta.nombreTest}</td>
                                    <td>{pregunta.time}</td>
                                    <td>{pregunta.autor}</td>
                                    <td>4</td>
                                    <td>{pregunta.codigo}</td>

                                    <td> <Button onClick={() => CopyLink(pregunta.codigo)} variant="" className="btn btn-outline-danger text-white">Copy LInk</Button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default LayaudAmin;