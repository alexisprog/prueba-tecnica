import { Button, Card, Tabs, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ContentList from "./content-list";
import {
  HiPhotograph,
  HiOutlineFilm,
  HiOutlineDocumentText,
  HiOutlineGlobe,
  HiOutlineCloudUpload,
  HiOutlineSearch,
  HiTrash,
} from "react-icons/hi";
import { getContentsFilters } from "services/content.service";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Role } from "../models/user";
import ModalContent from "./modals/modal-content";
import {
  fetchContentSuccess,
  setCurrentContent,
} from "store/slices/content.slice";
import { deleteTopic, getAllTopics } from "services/topic.service";
import { fetchTopicSuccess, setCurrentTopic } from "store/slices/topic.slice";
import ModalConfirm from "./modals/modal-confirm";

const CardTopic = () => {
  const dispatch = useAppDispatch();
  const { currentTopic } = useAppSelector((state) => state.topic);
  const { contentsList } = useAppSelector((state) => state.content);
  const { user } = useAppSelector((state) => state.user);
  const [active, setActive] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [search, setSearch] = useState<string>("");

  const handleOpenModal = () => {
    dispatch(setCurrentContent(null));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    getContentsFilters({ topic: currentTopic?._id }).then((_contents) =>
      dispatch(fetchContentSuccess(_contents))
    );
  };

  const handleOpenModalDelete = () => {
    setIsModalOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleConfirmModalDelete = () => {
    if (currentTopic?._id) {
      deleteTopic(currentTopic?._id).then(() => {
        getAllTopics().then((data) => {
          dispatch(fetchTopicSuccess(data));
          if (data.length > 0) {
            dispatch(setCurrentTopic(data[0]));
          }
        });
      });
    }

    setIsModalOpenDelete(false);
  };

  const renderIcon = (nameCategory: string) => {
    const _name = nameCategory.toUpperCase();
    switch (_name) {
      case "IMAGENES":
        return <HiPhotograph />;
      case "VIDEOS":
        return <HiOutlineFilm />;
      case "TEXTOS":
        return <HiOutlineDocumentText />;
      default:
        return <HiOutlineGlobe />;
    }
  };

  useEffect(() => {
    if (!currentTopic?._id) {
      return;
    }
    setActive(0);
    getContentsFilters({ topic: currentTopic?._id }).then((contents) =>
      dispatch(fetchContentSuccess(contents))
    );
  }, [currentTopic?._id]);

  if (!currentTopic || !contentsList) {
    return null;
  }
  return (
    <Card className="w-full">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex flex-row">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {currentTopic.name}
          </h5>
          {user && user.role === "Admin" ? (
            <>
              <HiTrash
                className="ml-5 h-5 w-5 text-white cursor-pointer"
                onClick={handleOpenModalDelete}
              />
            </>
          ) : null}
        </div>

        {user?.role && user?.role !== Role.Reader ? (
          <Button gradientDuoTone="purpleToBlue" onClick={handleOpenModal}>
            <HiOutlineCloudUpload className="mr-2 h-5 w-5" />
            Crear Contenido
          </Button>
        ) : null}
      </div>
      <div className="max-w-md">
        <TextInput
          type="search"
          icon={HiOutlineSearch}
          placeholder={`Busca un contenido`}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div>
        <Tabs aria-label={currentTopic._id} style="default">
          {currentTopic.allowedCategories.map((category, index) => {
            const _data = contentsList
              .filter((r) => r.category._id === category._id)
              .filter((s) =>
                s.name.toLowerCase().includes(search.toLowerCase())
              );
            return (
              <Tabs.Item
                key={index}
                active={active === index}
                title={`${_data.length} ${category.name}`}
                icon={() => renderIcon(category.name)}
                onClick={() => setActive(index)}
              >
                <ContentList data={_data} />
              </Tabs.Item>
            );
          })}
        </Tabs>
      </div>
      <ModalContent isOpen={isModalOpen} onClose={handleCloseModal} />
      <ModalConfirm
        isOpen={isModalOpenDelete}
        onClose={handleCloseModalDelete}
        onConfirm={handleConfirmModalDelete}
        text="Seguro de eliminar la temáticas?"
      />
    </Card>
  );
};

export default CardTopic;
