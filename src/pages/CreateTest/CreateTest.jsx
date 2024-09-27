import { useContext, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import ImputRespuesta from "../../components/ImputRespuesta/ImputRespuesta";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { kahootContex } from "../../contexKahoot/Contexkahoot";
import './style.css'

const CreateTest = () => {
    const { shows, setShows, preguntas, setPreguntast, activate, setActivate, 
        eliminarPreguntas, } = useContext(kahootContex)

    const navigate = useNavigate('/')
    const handleClose = () => {
        setShows(false);
        setActivate({
            respuesta1: true,
            respuesta2: true,
            respuesta3: true,
            respuesta4: true,
        })
        reset({
            pregunta: "",
            respuesta1: "",
            respuesta2: "",
            respuesta3: "",
            respuesta4: "",
            respuestaCorrecta: "",
        })
    }
    const handleShow = () => setShows(true);





    const { register, control, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm({
        defaultValues: {
            pregunta: "",
            respuesta1: "",
            respuesta2: "",
            respuesta3: "",
            respuesta4: "",
            respuestaCorrecta: "",
            nombreTest: '',
            autor: '',
            time: '',

        }
    })


    const onChangeTex = (event, onChange, name) => {

        if (event.target.value != '') {
            activate[name] = false
            setActivate({ ...activate })
        } else {
            activate[name] = true
            setActivate({ ...activate })
        }
        onChange(event.target.value)
    }



    const actualizarRespuestaCorrecta = (name) => {
        setValue('respuestaCorrecta', getValues(name))
    }

    const onSubmit = (data) => {
        const { autor, time, nombreTest, ...dataFilter } = data
        setPreguntast([...preguntas, dataFilter])
        handleClose()

    }

    const handleCreateTest = (data) => {
        const { autor, time, nombreTest } = data
        if (preguntas.length <= 0) {
            alert('no puedes guardar')
        } else {
            const guardar = {
                codigo: Math.random().toString(35).substring(2, 9),
                autor,
                time,
                nombreTest,
                preguntas
            }
            const tests = JSON.parse(localStorage.getItem('tests'))
            if (tests) {
                tests.push(guardar)
                localStorage.setItem('tests', JSON.stringify(tests))

            } else {
                localStorage.setItem('tests', JSON.stringify([guardar]))
                alert('guardado')
            }
            navigate('/')
            reset()
            setPreguntast([])
        }
    }

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
                                    placeholder="Nombre del test"
                                    {...register('nombreTest')}
                                />
                            </Form.Group>


                            <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
                                <Form.Label>Autor del test</Form.Label>
                                <Form.Control type="text" className=" border-danger" placeholder="Autor del test"  {...register('autor')} />
                                
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3 text-center " controlId="formBasicEmail">
                                <Form.Label >Duracion de test
                                    <Form.Label>
                                        
                                    </Form.Label>
                                </Form.Label>
                                <Form.Control type="text"  {...register('time')} className=" border-danger"/>
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