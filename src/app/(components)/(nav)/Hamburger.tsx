import { Menu, Transition } from "@headlessui/react";
import { List } from "@phosphor-icons/react";
import Link from "next/link";
import { Fragment } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Hamburger() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center">
        <Menu.Button className="text-2xl">
          <span className="sr-only">Menu</span>
          <List weight="bold" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            {links.map(({ href, label }) => {
              return (
                <Menu.Item key={label}>
                  {({ active }) => (
                    <Link
                      href={href}
                      className={`${
                        active ? "bg-blue-500 text-blue-50" : "text-blue-950"
                      } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      {label}
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
