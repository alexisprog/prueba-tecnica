import { useState } from "react";
import Layout from "components/layouts/main";
import ModalRegister from "components/modals/modal-register";
import { useAppSelector } from "store/hooks";
import { Button } from "flowbite-react";

function App() {
  const { user } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <main>
      <Layout>
        {!user && (
          <section>
            <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
              <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
                ¿Quieres destacar como el mejor creador de{" "}
                <span className="text-violet-500">contenidos?</span>
              </h2>

              <p className="max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300">
                ¡Regístrate ahora y desata tu potencial para crear contenido
                único y personalizado en cualquier temática y categoría que
                desees!
              </p>

              <div className="inline-flex justify-center w-full mt-6 sm:w-auto">
                <Button
                  gradientDuoTone="purpleToBlue"
                  onClick={handleOpenModal}
                >
                  Registrate
                </Button>
              </div>
            </div>
            <ModalRegister isOpen={isModalOpen} onClose={handleCloseModal} />
          </section>
        )}
      </Layout>
    </main>
  );
}

export default App;
