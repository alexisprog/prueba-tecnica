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
      {/* Contenido principal */}
      <main className="flex-grow">
        <div className="container mx-auto px-4">{children}</div>
      </main>
      {/* Pie de página */}
      <footer className="bg-white dark:bg-gray-900 mt-10">
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
