import { Listbox, Transition } from "@headlessui/react";
import { CaretUpDown, Check } from "@phosphor-icons/react";
import { Fragment, SetStateAction } from "react";

interface ISelectField {
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
  option: { value: string; label: string; disabled?: boolean };
  setState: SetStateAction<any>;
  isDisabled?: boolean;
}

export const SelectField: React.FC<ISelectField> = (props) => {
  const { label, option, setState, options, isDisabled } = props;

  return (
    <Listbox value={option} onChange={setState} disabled={isDisabled}>
      <Listbox.Label>{label}</Listbox.Label>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left">
          {/* <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"> */}
          <span className="block truncate">{option.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <CaretUpDown
              size={20}
              aria-hidden="true"
              className="text-slate-400"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((o, i) => (
              <Listbox.Option
                key={o.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-950" : "text-blue-950"
                  }`
                }
                value={o}
                disabled={o.disabled}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-bold" : "font-normal"
                      }`}
                    >
                      {o.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                        <Check size={20} aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
