import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import SearchIcon from '@mui/icons-material/Search'

export default function AutocompleteCustom({
  value,
  onChange,
  options,
  sx,
  label,
  error,
  nullable = false,
}) {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          (option.nombre + ' ' + option.apellidos)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .includes(
              query
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase(),
            ),
        )

  return (
    <Combobox value={value} onChange={onChange} nullable={nullable}>
      <div className={'relative ' + sx}>
        {label != null && <Combobox.Label>{label}</Combobox.Label>}
        <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-main-500">
          <Combobox.Input
            placeholder="Buscar usuario..."
            className="w-full border-none py-2 rounded-md leading-6 pl-3 pr-10 text-md text-black ring-inset focus:ring-main-500 focus:ring-2 focus:outline-none"
            displayValue={(option) => (option ? option.nombre + ' ' + option?.apellidos : '')}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                No existen usuarios con ese nombre
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-neutral-400 text-white' : 'text-black'
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {option.nombre + ' ' + option.apellidos}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
      {error != '' && <p className="text-red-500 text-md  mt-1 text-left w-full">{error}</p>}
    </Combobox>
  )
}
