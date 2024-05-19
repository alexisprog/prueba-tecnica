// import DropdownUser from "components/dropdown-user";
import { ReactNode } from "react";
import { NavbarComponent } from "./navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Encabezado */}
      <NavbarComponent />
      {/* <nav className="bg-white shadow dark:bg-gray-900">
        <div className="container flex items-center justify-end p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <DropdownUser />
        </div>
      </nav> */}
      {/* Contenido principal */}
      <main className="flex-grow">
        <div className="container mx-auto px-4">{children}</div>
      </main>
      {/* Pie de página */}
      <footer className="bg-white dark:bg-gray-900">
        <div className="container flex justify-center flex-col items-center p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © Copyright 2024. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
