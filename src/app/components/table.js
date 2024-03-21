"use client";
import { useState } from "react";
import { useEffect } from "react";
export default function TableComponent() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error por parte del servidor:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="sticky inset-y-0 start-0 bg-white px-4 py-2">
              <label htmlFor="SelectAll" className="sr-only">
                Select All
              </label>

              <input
                type="checkbox"
                id="SelectAll"
                className="size-5 rounded border-gray-300"
              />
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Id
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Nombre
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Laboratorio
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Fecha
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((elemento) => (
            <tr id={elemento.id} itemID={elemento.id}>
              <td className="sticky inset-y-0 start-0 bg-white px-4 py-2">
                <label className="sr-only" htmlFor="Row1"></label>
                <input
                  className="size-5 rounded border-gray-300"
                  type="checkbox"
                  id={elemento.id + "Row1"} 
                />
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {elemento.id}
              </td>
              <td id={elemento.id + "nombre"} className="whitespace-nowrap px-4 py-2 text-gray-700">
                {elemento.name}
              </td>
              <td  id={elemento.id + "laboratorio"} className="whitespace-nowrap px-4 py-2 text-gray-700">
                {elemento.laboratorio}
              </td>
              <td  id={elemento.id + "fecha"} className="whitespace-nowrap px-4 py-2 text-gray-700">
                {new Date(elemento.fecha).toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
