import { Avatar } from "flowbite-react";
import React, { useState } from "react";
import { Content } from "src/models/content";
import { useAppDispatch, useAppSelector } from "store/hooks";
import ModalSeeContent from "./modals/modal-see-content";
import {
  fetchContentSuccess,
  setCurrentContent,
} from "store/slices/content.slice";
import ModalContent from "./modals/modal-content";
import { getContentsFilters } from "services/content.service";

interface ContentListProps {
  data: Content[];
}

const ContentList: React.FC<ContentListProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { currentTopic } = useAppSelector((state) => state.topic);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const handleOpenModal = (content: Content) => {
    dispatch(setCurrentContent(content));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModalEdit = (content: Content) => {
    dispatch(setCurrentContent(content));
    setIsModalOpenEdit(true);
  };

  const handleCloseModalEdit = () => {
    getContentsFilters({ topic: currentTopic?._id }).then((contents) =>
      dispatch(fetchContentSuccess(contents))
    );
    setIsModalOpenEdit(false);
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
                      onClick={() => handleOpenModal(content)}
                      className="cursor-pointer text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Ver
                    </a>
                  </div>
                ) : null}
                {user && user._id === content.credits._id ? (
                  <div className="inline-flex items-center">
                    <a
                      onClick={() => handleOpenModalEdit(content)}
                      className="cursor-pointer text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Editar
                    </a>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
      <ModalSeeContent isOpen={isModalOpen} onClose={handleCloseModal} />
      <ModalContent isOpen={isModalOpenEdit} onClose={handleCloseModalEdit} />
    </div>
  );
};

export default ContentList;
