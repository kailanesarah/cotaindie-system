import { useState, useRef, useEffect } from "react";
import {
  QuestionIcon,
  ForumIcon,
  ArrowDownIcon
} from "@/components/UI/icons";

const MenuDesktop = () => {
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownAberto(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  return (
    <div className="hidden lg:ml-auto lg:mr-2 lg:block">
      <ul className="m-2 flex flex-col gap-x-6 gap-y-1 lg:m-0 lg:flex-row lg:items-center">
        <li>
          <a href="#" className="flex justify-center items-center gap-2">
            <QuestionIcon /> Dúvidas e perguntas
          </a>
        </li>
        <li>
          <a href="#" className="flex justify-center items-center gap-2">
            <ForumIcon /> Ajuda e suporte
          </a>
        </li>

        <li className="relative">
          {/* Ref movido para a div */}
          <div ref={dropdownRef}>
            <button
              onClick={() => {
                setDropdownAberto(!dropdownAberto);
                console.log("Botão clicado, abre/fecha:", !dropdownAberto);
              }}
              className="relative   px-5 py-2.5 inline-flex items-start  gap-3"
              type="button"
              aria-haspopup="true"
              aria-expanded={dropdownAberto}
            >
              <div className="p-2 bg-(--color-red-50) rounded-(--corners-rounded) flex items-center justify-center w-10 h-10 text-sm font-bold">
                FC
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="font-semibold">Paulo Cesar</span>
                <span className="text-xs text-[var(--color-gray-500)] lowercase">Administrador</span>
              </div>

              <div>
                <ArrowDownIcon/>
              </div>
            </button>

            {dropdownAberto && (
              <div className="z-10 absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-500"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MenuDesktop;
