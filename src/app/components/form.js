import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const labs = [
  {
    id: 1,
    name: "Labotorio 1",
    abr: "lab1",
  },

  {
    id: 2,
    name: "Labotorio 2",
    abr: "lab2",
  },
  {
    id: 3,
    name: "Labotorio 3",
    abr: "lab3",
  },
  {
    id: 4,
    name: "Labotorio 4",
    abr: "lab4",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FormComponent() {
  const [selected, setSelected] = useState(labs[1]);
  const [formState, setFormState] = useState({
    name: "",
    laboratorio: "",
    fecha: "",
  });

  const agregarReserva = async (e) => {
    try {
       const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/agregar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              name: formState.name,
              laboratorio: selected.name,
              fecha: formState.fecha,
            }
          ),
        }
      );
      if (response.ok) {
        console.log("Datos enviados correctamente");
        location.reload()
      } else {
        console.error("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const cambiarValores = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8"
      role="alert"
    >
      <div className="flex items-center gap-4"></div>

      <div className="mt-4">
        <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Nombre
            </label>

            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={cambiarValores}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Introduce el nombre"
              />

            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Laboratorio
            </label>

            <div className="relative">
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                      Laboratorio a tomar
                    </Listbox.Label>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <span className="ml-3 block truncate">
                            {selected.name}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {labs.map((lab) => (
                            <Listbox.Option
                              key={lab.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={lab}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "ml-3 block truncate"
                                      )}
                                    >
                                      {lab.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? "text-white"
                                          : "text-indigo-600",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              
            </label>

          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Fecha
            </label>

            <div className="relative">
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formState.fecha}
                onChange={cambiarValores}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Introduce la fecha"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Cancelar</p>

            <button
              onClick={() => agregarReserva()}
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
