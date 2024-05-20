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
import { deleteContent, getContentsFilters } from "services/content.service";
import ModalConfirm from "./modals/modal-confirm";

interface ContentListProps {
  data: Content[];
}

const ContentList: React.FC<ContentListProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { currentTopic } = useAppSelector((state) => state.topic);
  const { currentContent } = useAppSelector((state) => state.content);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

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

  const handleOpenModalDelete = (content: Content) => {
    dispatch(setCurrentContent(content));
    setIsModalOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    dispatch(setCurrentContent(null));
    setIsModalOpenDelete(false);
  };

  const handleConfirmDelete = () => {
    if (currentContent?._id) {
      deleteContent(currentContent._id).then(() => {
        getContentsFilters({ topic: currentTopic?._id }).then((contents) =>
          dispatch(fetchContentSuccess(contents))
        );
      });
    }
    dispatch(setCurrentContent(null));
    setIsModalOpenDelete(false);
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
                {user && user.role === "Admin" ? (
                  <div className="inline-flex items-center">
                    <a
                      onClick={() => handleOpenModalDelete(content)}
                      className="cursor-pointer text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Eliminar
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
      <ModalConfirm
        isOpen={isModalOpenDelete}
        onClose={handleCloseModalDelete}
        onConfirm={handleConfirmDelete}
        text="Seguro de eliminar el contenido?"
      />
    </div>
  );
};

export default ContentList;
