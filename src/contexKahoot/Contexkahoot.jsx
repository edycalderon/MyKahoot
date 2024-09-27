import { createContext, useState } from "react";
export const kahootContex = createContext()
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const KahootProvider = ({ children }) => {
    //StarGame//
    const [count, setCount] = useState(3)
    const [show, setShow] = useState(true)
    //MostrarPregunta//
    const [test, setTest] = useState()
    const [contador, setContador] = useState(0)
    const [correctas, setCorrectas] = useState(0)
    const [incorrectas, setIncorrectas] = useState(0)
    const [finish, setFinish] = useState(false)
    const [pregutnas, setPreguntas] = useState(JSON.parse(localStorage.getItem('tests')))

    const cambiarPregunta = (value) => {
        if (test.preguntas.length - 1 > contador) {
            setContador(contador + 1)
        } else {
            setFinish(true)
        }

        if (test?.preguntas[contador].respuestaCorrecta === value) {
            setCorrectas(correctas + 1)
            console.log('soy correctas')
        } else {
            setIncorrectas(incorrectas + 1)
            console.log('soy incorrectas')
        }
    }

    //Temporizador//
    const [horas, setHoras] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(59)

    //LayautClient//
    const [preguntass, setPreguntass] = useState(JSON.parse(localStorage.getItem('tests')))
    const [notFound, setNotFound] = useState(false)
    const [tests, setTests] = useState({})

    //LayautAdmin//
    // const teste = JSON.parse(localStorage.getItem('tests'))

    //CreateTest//
    const [shows, setShows] = useState(false);
    const [activate, setActivate] = useState({ respuesta1: true, respuesta2: true, respuesta3: true, respuesta4: true, contador: 1 })
    const [preguntas, setPreguntast] = useState([])

    const eliminarPreguntas = (items) => {
        const filtredData = preguntas.filter(item => item.pregunta !== items);
        setPreguntast(filtredData)
    }



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

    const actualizarRespuestaCorrecta = (name) => {
        setValue('respuestaCorrecta', getValues(name))
    }



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

    const onSubmit = (data) => {
        if (data.respuestaCorrecta) {
            const { autor, time, nombreTest, ...dataFilter } = data
            setPreguntast([...preguntas, dataFilter])
            handleClose()
        } else {
            alert('Marque La Respuesta Correcta')
        }
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
        <kahootContex.Provider value={{
            //StarGame//
            count, setCount,
            show, setShow,
            //MostrarPregunta/
            test, setTest,
            contador, setContador,
            correctas, setCorrectas,
            incorrectas, setIncorrectas,
            finish, setFinish,
            pregutnas, setPreguntas,
            cambiarPregunta,
            //Temporizador//
            horas, setHoras,
            minutes, setMinutes,
            seconds, setSeconds,
            //LayautClient//
            preguntass, setPreguntass,
            notFound, setNotFound,
            tests, setTests,
            //LayautAdmin//
            //teste,
            //CreateTest//
            shows, setShows,
            activate, setActivate,
            preguntas, setPreguntast,
            eliminarPreguntas,
            actualizarRespuestaCorrecta,
            onChangeTex,
            handleCreateTest,
            navigate,
            handleShow,
            onSubmit,
            register, control, handleSubmit, formState: { errors }, setValue, getValues, reset,
        }}>
            {children}
        </kahootContex.Provider>
    );
}