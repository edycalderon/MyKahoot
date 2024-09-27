import { useContext, useEffect, } from "react";
import { kahootContex } from "../../contexKahoot/Contexkahoot";

const Temporizador = ({ time }) => {
    const { horas, setHoras, minutes, setMinutes, seconds, setSeconds } = useContext(kahootContex)
    useEffect(() => {
        const hora = parseInt(time / 60)
        const minutos = time - (hora * 60)
        setHoras(minutos === 0 ? hora - 1 : hora)
        setMinutes(minutos == 0 ? 59 : minutos - 1)
    }, [time])


    useEffect(() => {
        function play() {
            setSeconds(seconds - 1)
        }
        if (seconds > 0) {
            var IntervalId = setInterval(play, 1000);
            setTimeout(() => {
                clearInterval(IntervalId)
            }, 1000);
        } else if (minutes > 0) {
            setMinutes(minutes - 1)
            setSeconds(59)
        } else if (horas > 0) {
            setHoras(horas - 1)
            setMinutes(59)
            setSeconds(59)
        }
    }, [seconds])


    return (
        <>
            <h1> {`${horas}: ${minutes}: ${seconds}`} </h1>

        </>
    );
}

export default Temporizador;