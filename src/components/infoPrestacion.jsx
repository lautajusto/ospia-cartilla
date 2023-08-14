import { useState, useEffect } from "react";

export default function InfoPrestacion ({ especialidad, prestador, localidad }) {

    const [data1, setData1] = useState([]);
    
    useEffect(() => {
        fetchData()
      }, []);
    
    const apiUrl = `https://www.ospiapba.org.ar/app_desarrollo/APP_ReqRes.asp?Modo=10&Usuario=101209&TipoPrestador=${especialidad}&Especialidad=${prestador}&Localidad=${localidad}`
    
    const fetchData = async () => {
        try {
            const response1 = await fetch(apiUrl);
            const jsonData1 = await response1.json();
            setData1(jsonData1.Status);
            console.log(setData1)
        }
        catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    return (
        <>
            {data1}
        </>
    );
}