"use client";

import Link from "next/link";
import {
  Trophy,
  House,
  ArrowBendRightUp,
  ArrowArcLeft,
} from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { AppContext } from "@/context";
import Hamburger from "./Hamburger";

export const Nav = (props: any) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { isDialogOpen } = useContext(AppContext);

  return (
    <nav className="flex h-16 items-center">
      <Link href="/" className="mr-auto text-2xl font-bold">
        SwearWords.co.uk
      </Link>
      <div className="flex space-x-4">
        {isHome ? (
          <div className="relative">
            <Link href="/ranking" className="text-2xl" prefetch={false}>
              <Trophy weight="bold" />
            </Link>
            <>
              <Transition
                show={isDialogOpen}
                as={Fragment}
                appear
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute z-50 -translate-x-[calc(100%+16px-2px)] text-center">
                  <div className="relative w-32 text-center">
                    See the ranking here!{" "}
                    <div className="absolute right-0 top-0 translate-x-full rotate-12">
                      <ArrowBendRightUp size={32} />
                    </div>
                  </div>
                </div>
              </Transition>
            </>
          </div>
        ) : (
          <Link href="/" className="text-2xl">
            <House weight="bold" />
          </Link>
        )}
        <Hamburger />
      </div>
    </nav>
  );
};
