import { InvTable } from "../components/Table"
import { FormInv } from "../components/Form"
import { useState, useEffect } from "react"
import { Data, Employee } from "../types/Types"

export const Home = () => {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [error, setError] = useState([])
    const [rawData, setRawData] = useState<Data[]>([]);
   
    const addRawData = (data: Data) => {
      setRawData((prevData) => [...prevData, data]);
    }

    useEffect(
        () => {
            fetch(
                'https://financed.4netps.co.id/ujian/employee'
            ).then(
                response => response.json()
            ).then(
                res => setEmployees(res)
            ).catch(
                err => setError(err)
            )
        }, []
    )
    
    console.log(rawData)

    return (
        <div className="container mx-auto pt-20">
            <FormInv employees={employees} addRawData={addRawData}/>
            <InvTable data={rawData}></InvTable>
        </div>
    )
}