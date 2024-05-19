import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { logOut } from "store/slices/user.slice";
import ModalLogin from "./modals/modal-login";

const DropdownUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    dispatch(logOut());
  };

  return (
    <>
      <>
        {user ? (
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={toggleDropdown}
          >
            <div
              className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
              onClick={toggleDropdown}
            >
              <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="font-medium dark:text-white">
              <div>{`@${user.username}`}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {user.role}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleOpenModal}
            className="block text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
            type="button"
          >
            Iniciar Sesión
          </button>
        )}
      </>
      {isDropdownOpen && (
        <div className="absolute top-20 right-10 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div className="py-1">
            <div
              onClick={handleLogout}
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Cerrar Sesión
            </div>
          </div>
        </div>
      )}
      <ModalLogin isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DropdownUser;
