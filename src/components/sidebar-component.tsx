import logo from "@/assets/imgs/logo-white.svg";
import { ROUTES } from "@/constants/urls";
import Image from "next/image";
import NavbarComponent from "./navbar-component";
import {
  ClientsIcon,
  DashboardIcon,
  DocumentScannerIcon,
  InventoryIcon,
  LogoutIcon,
} from "./ui/icons";

const SidebarComponent = () => {
  return (
    <>
      {/* Botão mobile */}
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col bg-[var(--color-dark-500)] py-4">
          {/* Logo */}
          <div className="border-b border-[var(--color-gray-200)] px-8 pb-4">
            <a href="#" className="flex items-center justify-start">
              <Image src={logo} alt="Logo" width={150} height={150} />
            </a>
          </div>

          {/* Menu com rolagem */}
          <div className="flex-1 overflow-y-auto border-b border-[var(--color-gray-200)]">
            <ul className="space-y-2 px-2 py-3 font-medium">
              <li>
                <a
                  href={ROUTES.PRIVATE.DASHBOARD}
                  className="group flex items-center p-2 text-white hover:bg-gray-700"
                >
                  <span className="ms-3 flex items-center gap-4 whitespace-nowrap">
                    <DashboardIcon /> Dashboard
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex items-center p-2 text-white hover:bg-gray-700"
                >
                  <span className="ms-3 flex items-center gap-4 whitespace-nowrap">
                    <DocumentScannerIcon /> Orçamentos
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex items-center p-2 text-white hover:bg-gray-700"
                >
                  <span className="ms-3 flex items-center gap-4 whitespace-nowrap">
                    <InventoryIcon /> Materiais
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={ROUTES.PRIVATE.CLIENTS}
                  className="group flex items-center p-2 text-white hover:bg-gray-700"
                >
                  <span className="ms-3 flex items-center gap-4 whitespace-nowrap">
                    <ClientsIcon /> Clientes
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Logout fixo no rodapé */}
          <div className="mt-auto px-2 pt-3">
            <ul>
              <li>
                <a
                  href={ROUTES.PUBLIC.SIGNOUT}
                  className="group flex items-center p-2 text-white hover:bg-gray-700"
                >
                  <span className="ms-3 flex items-center gap-4 whitespace-nowrap">
                    <LogoutIcon /> Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="sm:ml-64">
        {/* Navbar fixa */}
        <NavbarComponent />
      </div>
    </>
  );
};

export default SidebarComponent;
