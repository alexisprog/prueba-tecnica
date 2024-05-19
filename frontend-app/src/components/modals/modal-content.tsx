/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  Alert,
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { HiOutlineArrowRight, HiInformationCircle } from "react-icons/hi";
import { Category } from "src/models/category";
import { BodyContent } from "src/models/content";
import {
  fetchContentFailure,
  fetchContentStart,
  fetchContentSuccess,
} from "store/slices/content.slice";
import { createContent, uploadImage } from "services/content.service";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const validationSchema = yup.object({
  name: yup.string().required("El titulo del contenido es requerido"),
  category: yup.string().required("El tipo de contenido es requerido"),
  video: yup.string(),
  texto: yup.string(),
});

const ModalContent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}: ModalProps) => {
  const dispatch = useAppDispatch();
  const { currentTopic } = useAppSelector((state) => state.topic);
  const { loading, error } = useAppSelector((state) => state.content);
  const { user } = useAppSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errorFile, setErrorFile] = useState<string>("");

  const handleContent = async (body: BodyContent) => {
    try {
      dispatch(fetchContentStart());
      if (selectedImage) {
        // subir imagen primero
        const { fileName } = await uploadImage(selectedImage);
        await createContent({ ...body, data: fileName });
      } else {
        await createContent(body);
      }
      dispatch(fetchContentSuccess());
      onClose();
    } catch (error: any) {
      if (error?.response?.data?.error) {
        dispatch(fetchContentFailure(error?.response?.data?.error));
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "Seleccionar",
      video: "",
      texto: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data =
        values?.texto !== ""
          ? values.texto
          : values?.video !== ""
          ? values.video
          : "";
      const category = currentTopic?.allowedCategories.find(
        (c) => c.name === values.category
      );
      handleContent({
        name: values.name,
        data,
        category: category?._id ?? "",
        topic: currentTopic?._id ?? "",
        credits: user?._id ?? "",
      });
      formik.resetForm();
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (file.type === "image/png" || file.type === "image/jpeg") {
        const image = new Image();
        image.src = URL.createObjectURL(file);

        image.onload = () => {
          if (image.width <= 800 && image.height <= 400) {
            setSelectedImage(file);
            setErrorFile("");
          } else {
            setSelectedImage(null);
            setErrorFile(
              "La imagen debe tener un tamaño máximo de 800x400 píxeles."
            );
          }
        };
      } else {
        setSelectedImage(null);
        setErrorFile("Solo se permiten archivos PNG y JPG.");
      }
    }
  };

  useEffect(() => {
    setErrorFile("");
    setSelectedImage(null);
    formik.resetForm();
    dispatch(fetchContentSuccess());
  }, [isOpen]);

  const renderDataUpload = () => {
    if (!formik.values.category) {
      return null;
    }

    const type = formik.values.category.toUpperCase();

    if (type === "IMAGENES") {
      return (
        <div>
          <div className="mb-2 block">
            <Label htmlFor="file" value="Imagen del Contenido" />
          </div>
          <FileInput
            id="file"
            name="file"
            accept=".png,.jpg,.jpeg"
            helperText="PNG, JPG (MAX. 800x400px)."
            onChange={handleImageChange}
          />
          {errorFile && <p className="text-red-500">{errorFile}</p>}
          {selectedImage && (
            <div>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Vista previa"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      );
    } else if (type === "VIDEOS") {
      return (
        <div>
          <div className="mb-2 block">
            <Label htmlFor="video" value="Url youtube del Contenido" />
          </div>
          <TextInput
            id="video"
            name="video"
            placeholder="https://youtu.be/EQ3Htw6Z0PY?si=nye3_nM7sBvTuKv"
            value={formik.values.video}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>
      );
    } else if (type === "TEXTOS") {
      return (
        <div>
          <div className="mb-2 block">
            <Label htmlFor="texto" value="Descripción del Contenido" />
          </div>
          <Textarea
            id="texto"
            placeholder="Describe tu contenido..."
            required
            value={formik.values.texto}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={4}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  if (!isOpen || !currentTopic) {
    return null;
  }

  return (
    <Modal dismissible show={isOpen} size="xl" onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header>
          {`Crear contenido para ${currentTopic.name}`}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {error ? (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Error!</span> {error}
              </Alert>
            ) : null}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Titulo" />
              </div>
              <TextInput
                id="name"
                placeholder="Titulo del contenido"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                color={
                  formik.touched.name && formik.errors.name
                    ? "failure"
                    : undefined
                }
                helperText={
                  formik.touched.name && formik.errors.name ? (
                    <>
                      <span className="font-medium">Oops!</span>{" "}
                      {formik.errors.name}
                    </>
                  ) : null
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Tipo de contenido" />
              </div>
              <Select
                id="category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                <option key="0">Seleccionar</option>
                {currentTopic.allowedCategories.map((category: Category) => (
                  <option key={category._id}>{category.name}</option>
                ))}
              </Select>
            </div>
            {renderDataUpload()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            gradientDuoTone="purpleToBlue"
            disabled={loading}
            type="submit"
            className="w-full"
          >
            {loading ? `Subiendo...` : `Publicar`}
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalContent;
