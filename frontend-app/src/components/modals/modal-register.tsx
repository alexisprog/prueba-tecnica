/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BodyRegister } from "../../models/auth";
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "../../store/slices/user.slice";
import { register } from "../../services/auth.services";
import { Alert, Button, Label, Modal, TextInput } from "flowbite-react";
import {
  HiOutlineArrowRight,
  HiMail,
  HiUser,
  HiInformationCircle,
} from "react-icons/hi";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const validationSchema = yup.object({
  username: yup.string().required("El nombre de usuario es requerido"),
  email: yup
    .string()
    .email("El formato del email es inválido")
    .required("El email es requerido"),
  role: yup.string(),
});

const ModalRegister: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}: ModalProps) => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.user);

  const handleRegister = async (body: BodyRegister) => {
    try {
      dispatch(fetchUserStart());
      const data = await register(body);
      dispatch(fetchUserSuccess(data));
      onClose();
    } catch (error: any) {
      if (error?.response?.data?.error) {
        dispatch(fetchUserFailure(error?.response?.data?.error));
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      role: "Creator",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleRegister(values as BodyRegister);
    },
  });

  const handleSwitchChange = () => {
    const newRole = formik.values.role === "Creator" ? "Reader" : "Creator";
    formik.setFieldValue("role", newRole);
  };

  const isChecked = useMemo(
    () => formik.values.role === "Reader",
    [formik.values.role]
  );
  const switchColor = isChecked ? "bg-violet-400" : "bg-gray-400";

  if (!isOpen) {
    return null;
  }

  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Completa el registro
            </h3>
            {error ? (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Error!</span> {error}
              </Alert>
            ) : null}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Nombre de usuario" />
              </div>
              <TextInput
                id="username"
                placeholder="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                icon={HiUser}
                color={
                  formik.touched.username && formik.errors.username
                    ? "failure"
                    : undefined
                }
                helperText={
                  formik.touched.username && formik.errors.username ? (
                    <>
                      <span className="font-medium">Oops!</span>{" "}
                      {formik.errors.username}
                    </>
                  ) : null
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Correo" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                icon={HiMail}
                color={
                  formik.touched.email && formik.errors.email
                    ? "failure"
                    : undefined
                }
                helperText={
                  formik.touched.email && formik.errors.email ? (
                    <>
                      <span className="font-medium">Oops!</span>{" "}
                      {formik.errors.email}
                    </>
                  ) : null
                }
              />
            </div>
            <div className="mb-4 block">
              <div className="flex flex-row">
                <div className="flex items-center mr-5">
                  <label
                    className={`switch relative inline-block w-10 h-6 rounded-full cursor-pointer ${switchColor}`}
                  >
                    <input
                      id="role"
                      type="checkbox"
                      className="absolute top-0 left-0 opacity-0 w-0 h-0"
                      checked={isChecked}
                      onChange={handleSwitchChange}
                    />
                    <span
                      className={`toggle absolute top-1 ${
                        isChecked
                          ? "right-1 bg-violet-900"
                          : "left-1 bg-gray-800"
                      } w-4 h-4 rounded-full transition-all duration-300`}
                    ></span>
                  </label>
                </div>
                <label htmlFor="role" className="block mb-1 text-white text-sm">
                  Quiero ser solo lector unicamente
                </label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            gradientDuoTone="purpleToBlue"
            disabled={loading}
            type="submit"
            className="w-full"
          >
            Registrarme
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalRegister;
