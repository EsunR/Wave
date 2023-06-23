"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillCompass, AiFillHome } from "react-icons/ai";

const NAV_CONFIG = [
  {
    name: "首页",
    icon: <AiFillHome className="text-2xl" />,
    path: "/home",
  },
  {
    name: "探索",
    icon: <AiFillCompass className="text-2xl" />,
    path: "/explore",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={clsx([
      'bg-white/50 backdrop-blur-xl',
      'h-[--bottom-nav-height] items-center flex absolute bottom-0 w-full z-50'
    ])}>
      <ul className="flex items-center justify-around w-full">
        {NAV_CONFIG.map(({ name, icon, path }) => (
          <li className="w-1/3" key={name}>
            <Link
              href={path}
              className={clsx([
                "flex flex-col items-center text-opacity-20 text-black",
                pathname === path && "!text-opacity-100",
              ])}
            >
              {icon}
              <span className="text-xs">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
