import { useContext, useEffect, useState, } from "react";
import { kahootContex } from "../../contexKahoot/Contexkahoot";
import './style.css'
const Temporizador = ({ time }) => {
    // const [horas, setHoras] = useState(0)
    // const [minutes, setMinutes] = useState(0)
    // const [seconds, setSeconds] = useState(59)


    const { horas, setHoras, minutes, setMinutes, seconds, setSeconds, correctas, incorrectas } = useContext(kahootContex)
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
            <div class="card bg-black text-center">
                <div data-status="inprogress" class="teams">
                    <span class="team-info team-away">
                        <span class="team-info-container">
                            <span class="team-info-container"></span>
                            <span class="team-name-info">Correctas {correctas}</span>
                        </span>
                    </span>
                    <span class="event-scoreboard">
                        <span class="event-score-container">
                            <span class="current-time-container">
                                <span class="event-current-time">
                                    <span class="current-part">{horas} Horas</span>
                                </span>
                                <span class="progress-dots" data-progress="1S">
                                    <span class="load"></span>
                                </span>
                            </span>
                            <span class="score-container">
                                <span class="score-home">{horas}</span>
                                <span class="custom-sep">-</span>
                                <span class="score-away">{minutes}</span>
                                <span class="custom-sep">-</span>
                                <span class="score-away">{seconds}</span>
                            </span>
                        </span>
                    </span>
                    <span class="team-info team-home">
                        <span class="team-info-container">
                            <span class="team-name-info">Inconrrectas {incorrectas}</span>
                        </span>
                    </span>
                </div>
            </div>

        </>
    );
}

export default Temporizador;

