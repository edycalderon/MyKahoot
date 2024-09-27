import { createContext, useState } from "react";
export const kahootContex = createContext()

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
    const [teste, setTeste] = useState(JSON.parse(localStorage.getItem('tests')))

    //CreateTest//






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
            teste,
            //CreateTest//
            // shows, setShows,
            // activate, setActivate,
            // preguntas, setPreguntast,
            
            // eliminarPreguntas,
            
        }}>
            {children}
        </kahootContex.Provider>
    );
}

