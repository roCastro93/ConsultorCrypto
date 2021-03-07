import React, { useState, useEffect } from 'react';
import Cryptomoneda from './Cryptomoneda';
import Error from './Errores';
import Axios from 'axios';

function Formulario({setMoneda,setCriptomoneda}) {

    const [cryptomonedas, setCryptomoneda] = useState([]);
    const [monedaContizar, setMoneCotizar] = useState('');
    const [cryptoCotizar, setCryptCotizar] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {

        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await Axios.get(url);

            // console.log(resultado.data.Data);
            setCryptomoneda(resultado.data.Data);
        }
        consultarAPI();
    }, []);
    
    const cotizarMoneda= e => {
        e.preventDefault();

        //Validar si ambos campos estan llenos
        if(monedaContizar === '' || cryptoCotizar === ''){
            setError(true);
            return;
        }
        //pasar los datos al componente pricipal
        setError(false);
        setMoneda(monedaContizar);
        setCriptomoneda(cryptoCotizar);
        
    }
    
    //mostrar el error en caso de que exista
    const componente = (error) ? <Error mensaje="Ambos campos son obligatorios"/> :null;

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <label htmlFor="">Elige tu moneda</label>
                <select
                    className="u-full-width"
                    onChange={e => setMoneCotizar(e.target.value)}
                >
                    <option value="">--Elige tu moneda--</option>
                    <option value="USD">Dolar estadounidence</option>
                    <option value="CLP">Peso chileno</option>
                    <option value="EUR">Euro</option>
                    <option value="MXN">Peso mexicano</option>
                    <option value="GBP">Libras</option>
                </select>
            </div>
            <div className="row">
                <label>Elige tu Cryptomoneda</label>
                <select className="u-full-width"
                 onChange={e => setCryptCotizar(e.target.value)}
                 >
                      <option value="">--Elige tu Cryptomoneda --</option> 
                    {cryptomonedas.map(cryptomoneda => (
                        <Cryptomoneda
                            key={cryptomoneda.CoinInfo.Id}
                            cryptomoneda={cryptomoneda}
                        />
                    ))}
                </select>
            </div>
            <input type="submit"className="button-primary u-full-width" value="calcular"/>
        </form>
    )
}

export default Formulario;
