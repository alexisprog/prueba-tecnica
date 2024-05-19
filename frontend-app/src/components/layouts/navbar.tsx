import ModalLogin from "components/modals/modal-login";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logOut } from "store/slices/user.slice";
import { Button } from "flowbite-react";

export function NavbarComponent() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Contenidos" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Contenidos
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <Dropdown arrowIcon={false} inline label={<Avatar rounded />}>
            <Dropdown.Header>
              <span className="block text-sm">{`Usuario: ${user.username}`}</span>
              <span className="block text-sm">{`Correo: ${user.email}`}</span>
              <span className="block text-sm">{`Rol: ${user.role}`}</span>
            </Dropdown.Header>
            {/* <Dropdown.Item>Dashboard</Dropdown.Item> */}
            <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button
            outline
            gradientDuoTone="purpleToBlue"
            onClick={handleOpenModal}
          >
            Ingresar
          </Button>
        )}

        {/* <Navbar.Toggle /> */}
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
      <ModalLogin isOpen={isModalOpen} onClose={handleCloseModal} />
    </Navbar>
  );
}
