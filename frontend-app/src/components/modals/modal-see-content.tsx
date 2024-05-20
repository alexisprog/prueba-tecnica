import { useAppSelector } from "../../store/hooks";
import { Avatar, Blockquote, Modal } from "flowbite-react";
import ReactPlayer from "react-player";
import { serverURL } from "services/api";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSeeContent = ({ isOpen, onClose }: ModalProps) => {
  const { currentContent } = useAppSelector((state) => state.content);

  if (!isOpen || !currentContent) {
    return null;
  }

  return (
    <Modal dismissible show={isOpen} size="2xl" onClose={onClose}>
      <Modal.Header>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {currentContent.name}
        </h5>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="flex flex-row justify-start">
            <Avatar rounded>
              <div className="space-y-1 font-medium dark:text-white">
                <div>{currentContent.credits.username}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {`Publicado el: ${currentContent.createdAt}`}
                </div>
              </div>
            </Avatar>
          </div>
          <div className="flex flex-row justify-start">
            <p className="font-bold tracking-tight text-gray-900 dark:text-white">
              {`Temática: ${currentContent.topic.name}`}
            </p>
          </div>
          <div className="flex flex-row justify-start mt-10">
            {currentContent.category.name.toUpperCase() === "IMAGENES" ? (
              <img
                src={`${serverURL}/${currentContent.data}`}
                alt="Vista previa"
                className="w-full h-auto"
              />
            ) : currentContent.category.name.toUpperCase() === "TEXTOS" ? (
              <Blockquote>{currentContent.data}</Blockquote>
            ) : currentContent.category.name.toUpperCase() === "VIDEOS" ? (
              <>
                {ReactPlayer.canPlay(currentContent.data) ? (
                  <ReactPlayer url={currentContent.data} />
                ) : (
                  <a
                    href={currentContent.data}
                    target="_blanck"
                    className="text-xs tracking-tight text-red-500"
                  >
                    {`Error al cargar el link del video: ${currentContent.data}`}
                  </a>
                )}
              </>
            ) : null}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSeeContent;
