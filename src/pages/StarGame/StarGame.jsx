import { useContext, useEffect, } from "react";
import MostrarPregunta from "../../components/MostrarPregunta/MostrarPregunta";
import { kahootContex } from "../../contexKahoot/Contexkahoot";
import './style.css'

const StarGame = () => {
    const { count, setCount, show, setShow } = useContext(kahootContex)
    useEffect(() => {
        function myCallback() {
            setCount(count - 1)
        }
        if (count > 0) {
            var IntervalId = setInterval(myCallback, 1000);
            setTimeout(() => {
                clearInterval(IntervalId)
            }, 1000)
        } else {
            setShow(false)
        }
    }, [count])


    return (
        <>
            {show && (
                <>
                    <h1 className="text-center">Listo empezando...</h1>
                    <h1 className="text-center">{count}</h1>
                    <div class="loader3">
                        <div class="circle1"></div>
                        <div class="circle1"></div>
                        <div class="circle1"></div>
                        <div class="circle1"></div>
                        <div class="circle1"></div>
                    </div>
                </>
            )}
            {!show && <>
                <MostrarPregunta />
            </>
            }

        </>
    );
}

export default StarGame;