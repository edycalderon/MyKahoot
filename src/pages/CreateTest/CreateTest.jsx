import { useContext } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import ImputRespuesta from "../../components/ImputRespuesta/ImputRespuesta";
import { Controller, useForm } from "react-hook-form";

import { kahootContex } from "../../contexKahoot/Contexkahoot";
import './style.css'

const CreateTest = () => {
    const { shows, setShows, preguntas, setPreguntast, activate, setActivate, actualizarRespuestaCorrecta, onChangeTex,
        handleCreateTest, eliminarPreguntas, navigate, onSubmit, handleShow, handleClose ,
        register, control, handleSubmit, formState: { errors }, setValue, getValues, reset
    } = useContext(kahootContex)



    return (
        <>
            <Container>
                <h1 className="text-center"> Crear una Evaluacion</h1>
                <Form className="mt-5 " >
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
                                <Form.Label>Nombre del test</Form.Label>
                                <Form.Control
                                    className=" border-danger"
                                    type="text"
                                    name={"nombreTest"}
                                    placeholder="Nombre del test"
                                    {...register('nombreTest', { required: 'campo Obligatorio' })}
                                />
                                {errors.nombreTest && <p className=" text-danger">{errors.nombreTest.message}  </p>}
                            </Form.Group>


                            <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
                                <Form.Label>Autor del test</Form.Label>
                                <Form.Control
                                    name={"autor"}
                                    type="text"
                                    className=" border-danger"
                                    placeholder="Autor del test"
                                    {...register('autor', { required: 'campo Obligatorio' })}
                                />
                                {errors.autor && <p className=" text-danger">{errors.autor.message}  </p>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3 text-center " controlId="formBasicEmail">
                                <Form.Label >Duracion de test
                                    <Form.Label>

                                    </Form.Label>
                                </Form.Label>
                                <Form.Control
                                    name={"time"}
                                    type="text"
                                    className=" border-danger"
                                    placeholder="Tiemp De Examen"
                                    {...register('time',  { required: 'campo Obligatorio' })}
                                />
                                {errors.time && <p className=" text-danger">{errors.time.message}  </p>}
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col>
                        <Row>
                            <Col className="d-flex gap-3 justify-content-end">
                                <Button variant="" className="btn btn-danger text-danger bg-dark" onClick={handleSubmit(handleCreateTest)}>
                                    Guardar Cambios
                                </Button>
                                <Button variant="" className="btn btn-danger text-danger bg-dark" onClick={handleShow}>
                                    Crear Preguntas
                                </Button>
                            </Col>
                        </Row>
                        <Table className="table-dark border-danger" border>
                            <thead>
                                <tr>
                                    <th>key</th>
                                    <th>Id</th>
                                    <th>preguntas</th>
                                    <th>respuestas</th>
                                    <th>respuestas correcas</th>
                                    <th>opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {preguntas.map((pregunta) => (
                                    <tr key={pregunta.pregunta}>
                                        <th>{pregunta.pregunta}</th>
                                        <th>{pregunta.contador}</th>
                                        <td>{pregunta.pregunta}</td>
                                        <td>{`${pregunta.respuesta1}, ${pregunta.respuesta2}, ${pregunta.respuesta3}, ${pregunta.respuesta4}`}</td>
                                        <td>{`${pregunta.respuestaCorrecta}`}</td>
                                        <td> <p className="btn btn-danger" onClick={() => eliminarPreguntas(pregunta.pregunta)}>Eliminar</p> </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Container>


            <Modal show={shows} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear pregunta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Pregunta</Form.Label>
                            <Controller
                                name={"pregunta"}
                                rules={{ required: 'Campo obligatorio' }}
                                control={control}
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        placeholder="ingrese su pregunta"
                                        autoFocus
                                        {...field}
                                    />
                                )}
                            />
                            {errors.pregunta && <p className=" text-danger">{errors.pregunta.message}  </p>}
                        </Form.Group>


                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Respuesta 1</Form.Label>
                            <Controller

                                name="respuesta1"
                                control={control}
                                rules={{ required: 'Campo obligatorio' }}
                                render={({ field }) => (

                                    <ImputRespuesta

                                        activate={activate[name]}
                                        onChange={(e) => onChangeTex(e, field.onChange, field.name)}
                                        inputRef={field.ref}
                                        control={field.control}
                                        name={field.name}
                                        onChangeTwo={(e) => actualizarRespuestaCorrecta(field.name)}
                                        nameRadio='respuestaCorrecta'
                                    />
                                )}
                            />
                            {errors.respuesta1 && <p className=" text-danger">{errors.respuesta1.message}  </p>}
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Respuesta 2</Form.Label>
                            <Controller
                                name="respuesta2"
                                control={control}
                                rules={{ required: 'Campo obligatorio' }}
                                render={({ field: { onChange, name, ref } }) => (

                                    <ImputRespuesta
                                        activate={activate[name]}
                                        onChange={(e) => onChangeTex(e, onChange, name)}
                                        inputRef={ref}
                                        control={control}
                                        name={name}
                                        onChangeTwo={(e) => actualizarRespuestaCorrecta(name)}
                                        nameRadio='respuestaCorrecta'
                                    />
                                )}
                            />
                            {errors.respuesta2 && <p className=" text-danger">{errors.respuesta2.message}  </p>}
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Respuesta 3</Form.Label>

                            <Controller
                                name="respuesta3"
                                control={control}
                                rules={{ required: 'Campo obligatorio' }}
                                render={({ field: { onChange, name, ref } }) => (

                                    <ImputRespuesta
                                        activate={activate[name]}
                                        onChange={(e) => onChangeTex(e, onChange, name)}
                                        inputRef={ref}
                                        control={control}
                                        name={name}
                                        onChangeTwo={(e) => actualizarRespuestaCorrecta(name)}
                                        nameRadio='respuestaCorrecta'
                                    />

                                )}
                            />
                            {errors.respuesta3 && <p className=" text-danger">{errors.respuesta3.message}  </p>}
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea"
                        >
                            <Form.Label>Respuesta 4</Form.Label>
                            <Controller
                                name="respuesta4"
                                control={control}
                                rules={{ required: 'Campo obligatorio' }}
                                render={({ field: { onChange, name, ref } }) => (



                                    <ImputRespuesta
                                        activate={activate[name]}
                                        onChange={(e) => onChangeTex(e, onChange, name)}
                                        inputRef={ref}
                                        control={control}
                                        name={name}
                                        onChangeTwo={(e) => actualizarRespuestaCorrecta(name)}
                                        nameRadio='respuestaCorrecta'
                                    />

                                )}
                            />
                            {errors.respuesta4 && <p className=" text-danger">{errors.respuesta4.message}  </p>}
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateTest;