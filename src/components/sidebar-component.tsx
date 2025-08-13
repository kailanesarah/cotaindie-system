import NavbarComponent from "./navbar-component";
import {
  DashboardIcon,
  ClientsIcon,
  DocumentScannerIcon,
  InventoryIcon,
  LogoutIcon,
} from "./UI/icons";
import Image from "next/image";
import logo from "@/assets/imgs/logo-white.svg";
import {ROUTES} from "@/constants/urls";
import { RotateCwSquare } from "lucide-react";

const SidebarComponent = () => {
  return (
    <>
      {/* Botão mobile */}
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full py-4 bg-[var(--color-dark-500)] flex flex-col">
          {/* Logo */}
          <div className="px-8 pb-4 border-b border-[var(--color-gray-200)]">
            <a href="#" className="flex items-center justify-start">
              <Image src={logo} alt="Logo" width={150} height={150} />
            </a>
          </div>

          {/* Menu com rolagem */}
          <div className="flex-1 overflow-y-auto border-b border-[var(--color-gray-200)]">
            <ul className="space-y-2 font-medium px-2 py-3">
              <li>
                <a href={ROUTES.PRIVATE.DASHBOARD} className="flex items-center p-2 text-white hover:bg-gray-700 group">
                  <span className="flex items-center gap-4 ms-3 whitespace-nowrap">
                    <DashboardIcon /> Dashboard
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-white hover:bg-gray-700 group">
                  <span className="flex items-center gap-4 ms-3 whitespace-nowrap">
                    <DocumentScannerIcon /> Orçamentos
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-white hover:bg-gray-700 group">
                  <span className="flex items-center gap-4 ms-3 whitespace-nowrap">
                    <InventoryIcon /> Materiais
                  </span>
                </a>
              </li>
              <li>
                <a href={ROUTES.PRIVATE.CLIENTS} className="flex items-center p-2 text-white hover:bg-gray-700 group">
                  <span className="flex items-center gap-4 ms-3 whitespace-nowrap">
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
                <a href={ROUTES.PUBLIC.SIGNOUT} className="flex items-center p-2 text-white hover:bg-gray-700 group">
                  <span className="flex items-center gap-4 ms-3 whitespace-nowrap">
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
