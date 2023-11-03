import { useState } from "react";
import { Data, Employee, selectOptions } from "../types/Types";
import Select from 'react-select'

type propList = {
    employees: Employee[];
    addRawData: (data: Data) => void;
}

export const FormInv = (props: propList) => {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [ordNo, setOrderNo] = useState(1)
    const [invNumber, setInvNumber] = useState('')
    const [invName, setInvName] = useState('')
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const empOptions: selectOptions[] = props.employees.map(
        (emp) => ({
            value: emp.ID,
            label: emp.NAME
        })
    )

    const handleEmployeeSelectChange = (selected: number | undefined) => {
        if(selected) {
            const selectedEmployee = props.employees.find((employee) => employee.ID === selected);
            if (selectedEmployee) {
                setInvNumber(selectedEmployee.CODE_DEPT + ordNo.toString().padStart(4, '0'))
                setSelectedEmployee(selectedEmployee);
            }
        }
    }

    const hadleInvNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedEmployee) {
            setInvNumber(selectedEmployee.CODE_DEPT + ordNo.toString().padStart(4, '0'))
        }
    }

    const handleInvName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInvName(event.target.value)
    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let _price = parseInt(event.target.value)
        if(discount > 0){
            setTotalPrice(_price - ((discount / 100) * _price))
        } else {
            setTotalPrice(_price)
        }
        setPrice(_price)
    }

    const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let _discount = parseInt(event.target.value)
        if(_discount > 0){
            setTotalPrice(price - ((_discount / 100) * price))
        } else {
            setTotalPrice(price)
        }
        setDiscount(_discount)
    }

    const clearForm = (selectedEmployee: Employee) => {
        setInvName('')
        setPrice(0)
        setDiscount(0)
        setTotalPrice(0)
        setOrderNo(ordNo + 1)
        setInvNumber('')
        setSelectedEmployee(null)
    }

    const handleSubmitData = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (selectedEmployee) {
            const newData: Data = {
                name: selectedEmployee?.NAME,
                invNumber: invNumber,
                invName: invName,
                price: price,
                discount: discount,
                total: totalPrice
            }

            props.addRawData(newData)
            clearForm(selectedEmployee)

        }
    }

    return (
        <div className="py-5">
            <form className="w-full max-w-lg" onSubmit={handleSubmitData}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                            Employee / User
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <Select 
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="employeeName"
                            options={empOptions}
                            onChange={(e) => handleEmployeeSelectChange(e?.value)}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                            No. Barang
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="invNumber"
                            type="text"
                            value={invNumber}
                            onChange={e => hadleInvNumber(e)}
                            readOnly
                            required
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                            Nama Barang
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="invNumber"
                            type="text"
                            value={invName}
                            onChange={e => handleInvName(e)}
                            required
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                            Harga (Rp.)
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="invPrice"
                            type="number"
                            min={0}
                            value={price}
                            onChange={e => handlePriceChange(e)}
                            required
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                            Diskon (%)
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="invDiscount"
                            type="number" min={0}
                            value={discount}
                            onChange={e => handleDiscountChange(e)}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                            Total
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="totalPrice"
                            type="number"
                            min={0}
                            value={totalPrice}
                            readOnly
                            required
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-3/3">
                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                            Simpan
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}