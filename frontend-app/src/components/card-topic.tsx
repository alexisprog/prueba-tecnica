import { Button, Card, Tabs } from "flowbite-react";
import { useEffect, useState } from "react";
import ContentList from "./content-list";
import {
  HiPhotograph,
  HiOutlineFilm,
  HiOutlineDocumentText,
  HiOutlineGlobe,
  HiOutlineCloudUpload,
} from "react-icons/hi";
import { Content } from "src/models/content";
import { getContentsFilters } from "services/content.service";
import { useAppSelector } from "store/hooks";
import { Role } from "../models/user";
import ModalContent from "./modals/modal-content";

const CardTopic = () => {
  const { currentTopic } = useAppSelector((state) => state.topic);
  const { user } = useAppSelector((state) => state.user);
  const [active, setActive] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    getContentsFilters({ topic: currentTopic?._id }).then((contents) =>
      setData(contents)
    );
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
  const [data, setData] = useState<Content[]>([]);

  useEffect(() => {
    if (!currentTopic?._id) {
      return;
    }
    setActive(0);
    getContentsFilters({ topic: currentTopic?._id }).then((contents) =>
      setData(contents)
    );
  }, [currentTopic?._id]);

  if (!currentTopic) {
    return null;
  }
  return (
    <Card className="w-full">
      <div className="mb-1 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {currentTopic.name}
        </h5>
        {user?.role && user?.role !== Role.Reader ? (
          <Button gradientDuoTone="purpleToBlue" onClick={handleOpenModal}>
            <HiOutlineCloudUpload className="mr-2 h-5 w-5" />
            Crear Contenido
          </Button>
        ) : null}
      </div>
      <div>
        <Tabs aria-label={currentTopic._id} style="default">
          {currentTopic.allowedCategories.map((category, index) => {
            const _data = data.filter((r) => r.category._id === category._id);
            return (
              <Tabs.Item
                key={index}
                active={active === index}
                title={` ${_data.length} ${category.name}`}
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
    </Card>
  );
};

export default CardTopic;
