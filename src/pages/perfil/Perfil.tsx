import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Card, Col, Row, Select, Typography, Popconfirm } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDatosUsuario }  from "../../hooks/useDatosUsuario";
import  useEditarUsuario  from "../../hooks/useEditarUsuario";
import { useEliminarCuenta }  from "../../hooks/useEliminarCuenta";
import Navbar from "../../componentes/Navbar";
import { useObtenerGeneros } from "../../hooks/useObtenerGeneros";
import { useObtenerNacionalidades } from "../../hooks/useObtenerNacionalidades";
import { EditOutlined } from '@ant-design/icons'; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const { Title, Paragraph } = Typography;

const EditarPerfil: React.FC = () => {
  const navigate = useNavigate();
  const  datosUsuario  = useDatosUsuario();
  const { actualizarPerfil } = useEditarUsuario();
  const { eliminarCuenta, loading, error, success } = useEliminarCuenta();
  const { logout } = useAuth();
  const generos = useObtenerGeneros();
  const nacionalidades = useObtenerNacionalidades();

  const [form] = Form.useForm();

  const [editMode, setEditMode] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [photoMode, setPhotoMode] = useState(false);

  const handleFileChange = ({ fileList }: any) => {
  const newFileList = fileList.slice(-1);
  setFileList(newFileList);
  if (newFileList.length > 0) {
    setPhoto(newFileList[0].originFileObj);
    setPreviewImage(URL.createObjectURL(newFileList[0].originFileObj));
    setPhotoMode(true);
  } else {
    setPhoto(null);
    setPreviewImage(undefined);
    setPhotoMode(false);
  }
};

useEffect(() => {
  form.setFieldsValue({
    idNacionalidad: nacionalidades.find(
      (nac) => nac.nombre === datosUsuario?.nacionalidad
    )?.idNacionalidad,
    idGenero: generos.find(
      (gen) => gen.texto === datosUsuario?.genero
    )?.idGenero,
  });
}, [datosUsuario, nacionalidades, generos, form]);

const onFinish = (values: any) => {
  const idNacionalidad = 
    values.idNacionalidad ??
    nacionalidades.find((nac) => nac.nombre === datosUsuario?.nacionalidad)?.idNacionalidad;

  const idGenero = 
    values.idGenero ??
    generos.find((gen) => gen.texto === datosUsuario?.genero)?.idGenero;

  const payload = {
    ...values,
    idNacionalidad,
    idGenero,
    Foto: photo,
  };

  actualizarPerfil(payload);
  setEditMode(false);
  message.success("Perfil actualizado correctamente.");
  window.location.reload();
};

const handleEliminarCuenta = () => {
  eliminarCuenta();
  message.success("Cuenta eliminada correctamente.");
  logout();
  navigate("/login");
};

  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        {!editMode ? (
          <Card
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title level={3} style={{ margin: 0 }}>
                  Información Personal
                </Title>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  style={{ fontSize: "18px" }}
                  onClick={() => setEditMode(true)}
                />
              </div>
            }
            style={{ maxWidth: "600px", margin: "auto" }}
          >
            <Row gutter={[16, 16]} align="middle">
              <Col span={24} style={{ textAlign: "center" }}>
                <img
                  src={`http://localhost:5227/${datosUsuario?.foto}`}
                  alt="Foto del usuario"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: "20px",
                  }}
                />
              </Col>
              <Col span={12}>
                <p>
                  <strong>Nombre:</strong> {datosUsuario?.nombre}
                </p>
                <p>
                  <strong>Apellido:</strong> {datosUsuario?.apellido}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Cédula:</strong> {datosUsuario?.cedula}
                </p>
                <p>
                  <strong>Correo:</strong> {datosUsuario?.correo}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Dirección:</strong> {datosUsuario?.direccion}
                </p>
                <p>
                  <strong>Nacionalidad:</strong> {datosUsuario?.nacionalidad}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <strong>Género:</strong> {datosUsuario?.genero}
                </p>
                <p>
                  <strong>Nombre de Usuario:</strong>{" "}
                  {datosUsuario?.nombreUsuario}
                </p>
              </Col>
            </Row>
            <div style={{ textAlign: "right", marginTop: "20px" }}>
              <Popconfirm
                title="¿Está seguro de que desea eliminar su cuenta?"
                description="Esta acción no se podrá deshacer."
                onConfirm={handleEliminarCuenta}
                okText="Sí"
                cancelText="No"
              >
                <Button type="primary" danger loading={loading}>
                  Eliminar Cuenta
                </Button>
              </Popconfirm>
            </div>
          </Card>
        ) : (
          <Card
            title="Editar Información"
            style={{ maxWidth: "600px", margin: "auto" }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={datosUsuario}
            >
              <Row gutter={[16, 16]} align="middle">
                <Col span={24} style={{ textAlign: "center" }}>
                  <Form.Item name="foto" label="Foto">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={
                          previewImage ||
                          `http://localhost:5227/${datosUsuario?.foto}`
                        }
                        alt="Foto del usuario"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          marginRight: "20px",
                        }}
                      />
                      <Upload
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleFileChange}
                        listType="picture-circle"
                      >
                        <Button icon={<UploadOutlined />}>Subir Foto</Button>
                      </Upload>
                    </div>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="nombre" label="Nombre">
                    <Input />
                  </Form.Item>
                  <Form.Item name="apellido" label="Apellido">
                    <Input />
                  </Form.Item>
                  <Form.Item name="direccion" label="Dirección">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="correo" label="Correo">
                    <Input />
                  </Form.Item>
                  <Form.Item name="nombreUsuario" label="Nombre de Usuario">
                    <Input />
                  </Form.Item>
                  <Form.Item name="nuevaContraseña" label="Nueva Contraseña">
                    <Input.Password />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="idNacionalidad" label="Nacionalidad">
                    <Select>
                      {nacionalidades.map((nacionalidad) => (
                        <Select.Option
                          key={nacionalidad.idNacionalidad}
                          value={nacionalidad.idNacionalidad}
                        >
                          {nacionalidad.nombre}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="idGenero" label="Género">
                    <Select>
                      {generos.map((genero) => (
                        <Select.Option
                          key={genero.idGenero}
                          value={genero.idGenero}
                        >
                          {genero.texto}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit">
                  Guardar
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setEditMode(false);
                    setFileList([]);
                    setPreviewImage(undefined);
                  }}
                >
                  Cancelar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EditarPerfil;
