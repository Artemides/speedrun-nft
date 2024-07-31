"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  Bars3Icon,
  BugAntIcon,
  CircleStackIcon,
  InboxStackIcon,
  PhotoIcon,
  WalletIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { RainbowConnectButton } from "./scaffold-eth/rainbow-kit-custom-connect";
import FaucetButton from "./scaffold-eth/faucet-button";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    href: "/",
    label: "Menu",
  },

  {
    label: "My NFTs",
    href: "/mynfts",
    icon: <PhotoIcon className="h-4 w-4" />,
  },
  {
    label: "IPFS Upload",
    href: "/ipfsUpload",
    icon: <ArrowUpTrayIcon className="h-4 w-4" />,
  },
  {
    label: "IPFS Download",
    href: "/ipfsDownload",
    icon: <ArrowDownTrayIcon className="h-4 w-4" />,
  },
  {
    label: "Staker",
    href: "/staker",
    icon: <CircleStackIcon className="size-4" />,
  },
  {
    label: "Stakings",
    href: "/stakings",
    icon: <InboxStackIcon className="size-4" />,
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="size-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();
  return menuLinks.map(({ label, href, icon }) => {
    const isActive = pathname === href;
    return (
      <li key={href}>
        <Link
          href={href}
          passHref
          className={`${
            isActive ? "bg-secondary shadow-md" : ""
          } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
        >
          {icon}
          <span>{label}</span>
        </Link>
      </li>
    );
  });
};
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), [])
  );
  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 border-b-[1px] border-primary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${
              isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"
            }`}
            onClick={() => {
              setIsDrawerOpen((prevIsOpenState) => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link
          href="/"
          passHref
          className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
        >
          <div className="flex relative w-10 h-10">
            <Image
              alt="SE2 logo"
              className="cursor-pointer"
              fill
              src="/logo.svg"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Scaffold-ETH</span>
            <span className="text-xs">Ethereum dev stack</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
