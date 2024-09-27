import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RuutesKahoot from './routes/Ruttes.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { KahootProvider } from './contexKahoot/Contexkahoot.jsx';

createRoot(document.getElementById('root')).render(

  
    <StrictMode>
      <RuutesKahoot />
    </StrictMode>,
  

)
