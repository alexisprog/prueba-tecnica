import { Avatar } from "flowbite-react";
import React, { useState } from "react";
import { Content } from "src/models/content";
import { useAppDispatch, useAppSelector } from "store/hooks";
import ModalSeeContent from "./modals/modal-see-content";
import { setCurrentContent } from "store/slices/content.slice";

interface ContentListProps {
  data: Content[];
}

const ContentList: React.FC<ContentListProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (content: Content) => {
    dispatch(setCurrentContent(content));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flow-root">
      {data.length === 0 ? (
        <h2 className="text-center p-10 mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
          No hay contenidos en esta categoria, se el primero en crearlo!!!
        </h2>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((content) => (
            <li key={content._id} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <Avatar size="md" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {content.name}
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    {`Créditos: ${content.credits.username}`}
                  </a>
                  <p className="truncate text-xs font-medium text-gray-900 dark:text-gray-400">
                    {`Publicado: ${content.createdAt}`}
                  </p>
                </div>
                {user ? (
                  <div className="inline-flex items-center">
                    <a
                      href="#"
                      onClick={() => handleOpenModal(content)}
                      className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Ver
                    </a>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
      <ModalSeeContent isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ContentList;
