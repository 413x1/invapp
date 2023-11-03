import { Data } from "../types/Types"
import { formatRupiah } from "../helpers/currency"

type propList = {
    data: Data[];
}

export const InvTable = (props: propList) => {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-800 uppercase bg-teal-500 dark:bg-teal-700 dark:text-zinc-100">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Employee
                        </th>
                        <th scope="col" className="px-6 py-3">
                            No Barang
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nama Barang
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Harga
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Diskon
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((dt, index) => (
                            <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {dt.name}
                                </th>
                                <td className="px-6 py-4">
                                    {dt.invNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {dt.invName}
                                </td>
                                <td className="px-6 py-4">
                                    {formatRupiah(dt.price)}
                                </td>
                                <td className="px-6 py-4">
                                    {dt.discount} %
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    )
}