"use client";

import { useState } from "react";

const MenuMobile = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <>
      {/* Botão mobile */}
      <div className="ml-auto cursor-pointer lg:hidden">
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="grid min-h-[34px] min-w-[34px] place-items-center rounded-md border bg-transparent hover:bg-slate-200/10"
          aria-expanded={menuAberto}
        >
          <svg
            width="1.5em"
            height="1.5em"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="currentColor"
            className="h-4 w-4"
          >
            <path
              d="M3 5H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out lg:hidden`}
        style={{
          maxHeight: menuAberto ? "200px" : "0px",
        }}
      >
        <ul className="m-2 flex flex-col gap-y-1">
          <li>
            <a href="#" className="block p-1">
              Pages
            </a>
          </li>
          <li>
            <a href="#" className="block p-1">
              Account
            </a>
          </li>
          <li>
            <a href="#" className="block p-1">
              Blocks
            </a>
          </li>
          <li>
            <a href="#" className="block p-1">
              Docs
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuMobile;
