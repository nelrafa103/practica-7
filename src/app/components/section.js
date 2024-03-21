"use client";
import TableComponent from "./table";
import FormComponent from "./form";
import { useState } from "react";
import { flushSync } from "react-dom";

export default function SectionComponent() {
  const [newElement, setNewElement] = useState(false);

  const eliminarReserva = async (id) => {
    try {
      console.log(id)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/borrar`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          laboratorio: document.getElementById(`${id}laboratorio`).innerHTML,
          name: document.getElementById(`${id}nombre`).innerHTML,
          fecha: new Date(document.getElementById(`${id}fecha`).innerHTML)
        })
      });
      if (response.ok) {
        console.log('Reserva eliminado correctamente');
       
      } else {
        console.error('Error al eliminar el recurso');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  function limpiar() {
    let i = 1;
    while (i < 100) {
      const input = document.getElementById(`${i}Row1`);
      i++;
      if(input != null) {
        if (input.checked == true) {
          eliminarReserva(i - 1);
          document.getElementById(`${i - 1}`).style.display = 'none'
        } else {
          continue;
        }
      } else {
        continue
      }
      
    }
  }
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        {newElement ? <FormComponent></FormComponent> : <></>}
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Reservaciones de espacios
            <strong className="font-extrabold text-red-700 sm:block">
              {" "}
              Añade o Marca como completa{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Creado por Nelcido Rafael Diaz Delgado
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              onClick={() => setNewElement(true)}
              href="#"
            >
              Añadir nuevo
            </a>

            <button
              onClick={() => limpiar()}
              className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="#"
            >
              Completado
            </button>
          </div>
        </div>
        <TableComponent></TableComponent>
      </div>
    </section>
  );
}
