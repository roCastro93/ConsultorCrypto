import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Formulario from './component/Formulario';
import Cotizacion from './component/Cotizacion';
import imagen from './cryptomonedas.png';
import Spinner from './component/Spinner';

function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [cargando, setCargardo] = useState(false);
  const [resultado,setResultado ] = useState({});

  useEffect(() => {
    const contizarCriptoMoneda = async () => {

      //Si no hay moneda no ejecutar
      if (moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await Axios.get(url);

      //Mostrar resultado de la respuesta de la api y escalando con parametros
      //console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
      
      //Mostrar spinner
      setCargardo(true);
      //Ocultar spinner y mostrar resultados
      setTimeout(()=>{
        setCargardo(false);
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 1500);
      
    }
    contizarCriptoMoneda();
  }, [moneda, criptomoneda]);

  //Mostrar spinner o resultado
  const componente  = (cargando) ? <Spinner />  : <Cotizacion resultado={resultado} />;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen cryptoMonedas" className="logotipo" />
        </div>
        <div className="one-half column">
          <h1>Cotiza Cryptomonedas al instante</h1>
          <Formulario
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
          />
          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
