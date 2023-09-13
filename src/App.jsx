import { useEffect, useState } from 'react';
import './styles/styles.css'

export default function App () {
  
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');
  const [dataFinal, setDataFinal] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  /* Llamados a las APIS para completar los campos de los selects */

  const fetchData = async () => {

    try {
      const response1 = await fetch('https://www.ospiapba.org.ar/app_desarrollo/APP_ReqRes.asp?Modo=9');
      const response2 = await fetch('https://www.ospiapba.org.ar/app_desarrollo/APP_ReqRes.asp?Modo=8');
      const response3 = await fetch('https://www.ospiapba.org.ar/app_desarrollo/APP_ReqRes.asp?Modo=13');

      const jsonData1 = await response1.json();
      const jsonData2 = await response2.json();
      const jsonData3 = await response3.json();

      setData1(jsonData1[0].Data);
      setData2(jsonData2[0].Data);
      setData3(jsonData3.Data);

    } catch (error) {
      console.log(error);
    }
  };

  /* Tomamos los ID de los campos seleccionados */

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleOptionChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

  /* Hacemos el call a la API y nos traemos los datos*/

  const handleClick = (e) => {
   e.preventDefault()
   const apiUrl = `https://www.ospiapba.org.ar/app_desarrollo/APP_ReqRes.asp?Modo=10&Usuario=101209&TipoPrestador=${selectedOption2}&Especialidad=${selectedOption1}&Localidad=${selectedOption3}`
  

   const fetchData = async () => {
       try {
           const response = await fetch(apiUrl);
           const jsonData = await response.json();
           const resFinal = jsonData.Data
            setDataFinal(resFinal);
       }
       catch (error) {
           console.log('Error fetching data:', error);
       }
   }
   fetchData()
  }

/* Si existen más resultados, acá recorremos el response final */

  const results = [];
  if (dataFinal) {
    dataFinal.forEach((item, index) => {
      results.push(
        <div className="resultContainer">
          <li className="itemContainer" key={index}>
            <div className="result-container-text">
              <span className="itemText">{item.Prestador}</span>
              <br />
              <span className="itemText">Domicilio: {item.Domicilio}</span>
              <br />
              <span className="itemText">Turnos: {item.Contactos[0].Detalle}</span>
              <br />
              <br />
            </div>
              <div className="result-container-map">
              <a className='btn-map'
                href={`https://maps.google.com/?q=${item.Latitud.toString().replace(",", ".")},${item.Longitud.toString().replace(",", ".")}`}
                target='_blank'
                rel='noreferrer'
                >
                Ir al Mapa
              </a>
              <br />
              </div>
          </li>
        </div>
      )
     })
  }


  return (
    <div className="container">
      <div className='containerPrincipal'>
        <form className='formPrincipal'>
          <div className='selector-container'>
            <label>Especialiadad</label>
            <select id="selector1" value={selectedOption1} onChange={handleOptionChange1}>
              <option value="">Selecciona una opción</option>
              {data1.map((item) => (
                <option key={item.Id} value={item.Id}>
                  {item.Especialidad}
                </option>
              ))}
            </select>
          </div>
          <div className='selector-container'>
            <label>Tipo de Prestador </label>
            <select id="selector2" value={selectedOption2} onChange={handleOptionChange2}>
              <option value="">Selecciona una opción</option>
              {data2.map((item) => (
                <option key={item.Id} value={item.Id}>
                  {item.TipoPrestador}
                </option>
              ))}
            </select>
          </div>
          <div className='selector-container'>
            <label>Localidad</label>
            <select id="selector3" value={selectedOption3} onChange={handleOptionChange3}>
              <option value="">Selecciona una opción</option>
              {data3.map((item) => (
                <option key={item.Id} value={item.Id}>
                  {item.Localidad}
                </option>
              ))}
            </select>
                <button className='btn-search' onClick={handleClick}>Buscar</button>
                {/* { dataFinal === ''
                ? <></>
                : <button className='btn-clean' onClick={handleClean}>Limpiar búsqueda</button>
                } */}
          </div>
        </form>

        <div>
          { dataFinal === undefined || ''
          ? <p className='noResult'>No existen coincidencias. Por favor realice una nueva busqueda</p>
          : <div className='containerResult'>
              <div className='results'>
                  {results}
              </div>
            </div>
          }
        </div>
      </div>
  </div>
   
  );
}
