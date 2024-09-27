import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LayautClient from "../pages/LayaoutClient/LayautClient";
import LayaudAmin from "../pages/LayaudAmin/LayaudAmin";
import CreateTest from "../pages/CreateTest/CreateTest";
import StarGame from "../pages/StarGame/StarGame";


const RuutesKahoot = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LayaudAmin/>} />
            <Route path="/create" element={<CreateTest/>} />
            <Route path="/game/:codigo" element={<LayautClient/>} />
            <Route path="/game/:codigo/start" element={<StarGame/>} /> 
        </Routes>
        </BrowserRouter>
    );
}

export default RuutesKahoot;