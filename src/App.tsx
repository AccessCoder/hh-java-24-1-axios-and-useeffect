import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";


type ApiResponse = {
    userId: number,
    id: number,
    title:string,
    completed: boolean
}
function App() {

    const [exampleData, setExampleData] = useState<ApiResponse>(
        {userId:0, id:0, title:"init", completed:true})

    const [id, setId] = useState<number>(1)


    /**
     * Aufbau useEffect:
     * useEffect(
     * Methode die aufgerufen werden soll (im bsp. fetchData)
     * gefolgt von einem KOMMA (,)
     * und dem DependencyArray ([]), dieses stellt die Abhängigkeit zu einem anderen Feld dar, also:
     * Ist er leer ([]) => useEffect wird nur beim initialen Rendern der Komponente ausgeführt
     * Ist er gefüllt, z. B.([Id]) => useEffect wird beim init. Rendern & beim Aktualisieren des Feldes (ID) ausgeführt
     * )
     */
    useEffect(
        //WAS soll er machen?
        fetchData
        //WANN soll er es machen?
    ,[id])

    function fetchData(){
        //axios ermöglicht alle gängigen http-requests (get, post, put, delete)
        axios.get("https://jsonplaceholder.typicode.com/todos/"+id)
            //Axios erhält eine Response, welche wir gezielt auslesen können
            //relevante Daten befinden sich für uns unter data, weshalb wir diesen Inhalt in unserem Setter wollen!
            .then((response) => setExampleData(response.data))
            //Sollte ein Fehler, z. B. Exception im Backend stattfinden, wird diese abgefangen und ausgegeben
            .catch((error) => console.log(error.message))
    }

  return (
    <>
        <button onClick={() => setId(id+1)}>FetchData</button>
        <h3>Response</h3>
        <p>{exampleData.title}</p>
        <p>{exampleData.completed}</p>
    </>
  )
}

export default App
