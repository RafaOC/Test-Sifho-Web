/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Login.css";
import { Form, Input, Button, message, Upload, Select, Typography, Row, Col  } from "antd";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useObtenerGeneros } from "../../hooks/useObtenerGeneros";
import { useObtenerNacionalidades } from "../../hooks/useObtenerNacionalidades";
import  useCrearCuenta  from "../../hooks/useCrearCuenta";
import { useState } from "react";

import { UploadOutlined, UserOutlined, LockOutlined, ArrowLeftOutlined  } from "@ant-design/icons";
const { Title } = Typography;

export const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, loading, error } = useLogin();
  const generos = useObtenerGeneros();
  const nacionalidades = useObtenerNacionalidades();
  const { isLoadingC, errorC, successC, crearCuenta } = useCrearCuenta();

  const [fileList, setFileList] = useState([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formKey, setFormKey] = useState(0); 
  const [form] = Form.useForm();

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      setPhoto(fileList[0].originFileObj);
    } else {
      setPhoto(null);
    }
  };

  const onFinishLogin = async (values: { usuarioCorreo: string; contraseña: string }) => {
    try {
      const successMessage = await handleLogin(values);
      message.success(successMessage);
      navigate("/home");
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleSignUp = async (values: any) => {
    try {
      const dataToSend = {
        ...values,
      };
  
      if (photo) {
        dataToSend.Foto = photo;
      }
  
      await crearCuenta(dataToSend, () => {
        message.success("¡Cuenta creada exitosamente!");
        form.setFieldsValue({});
        form.resetFields();
        setFileList([]);
        setPhoto(null);
        setIsLogin(true);
        setFormKey((prevKey) => prevKey + 1);
      });
    } catch (error) {
      if (errorC) {
        message.error(errorC); 
      } else {
        message.error("Error al crear la cuenta");
      }
    }
  };
  
  return (
    <>
      {isLogin ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Contenedor de la imagen */}
              <div
                style={{
                  marginRight: "60px",
                  marginLeft: "20px",
                  paddingRight: "40px",
                }}
              >
                <img
                  src="/src/assets/Sifha_logo_d.png"
                  alt="Logo SIFHA"
                  style={{ maxWidth: "600px", height: "auto" }}
                />
              </div>

              {/* Contenedor del formulario */}
              <div style={{ width: 300, textAlign: "center" }}>
                <Title level={2}>Bienvenido a SIFHA</Title>
                <Form name="login" onFinish={onFinishLogin}>
                  <Form.Item
                    name="usuarioCorreo"
                    rules={[
                      {
                        required: true,
                        message:
                          "Por favor ingrese su nombre de usuario o correo!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Nombre de usuario o correo"
                      size="default"
                    />
                  </Form.Item>

                  <Form.Item
                    name="contraseña"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese su contraseña!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Contraseña"
                      size="default"
                    />
                  </Form.Item>

                  {errorC && <p>{errorC}</p>}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      style={{ width: "100%" }}
                    >
                      Iniciar sesión
                    </Button>
                  </Form.Item>

                  <Button
                    type="link"
                    onClick={() => setIsLogin(false)}
                    style={{ width: "100%", paddingBottom: "20px" }}
                  >
                    ¿No tienes cuenta? Crea una ahora!!!
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
        {/* Crear un cuenta de usuario */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div style={{ width: "80%" }}>
              {/* Icono y Titulo */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <ArrowLeftOutlined
                  onClick={() => setIsLogin(true)}
                  style={{
                    marginRight: 8,
                    cursor: "pointer",
                    fontSize: 24,
                    lineHeight: 1,
                  }}
                />
                <Title level={2} style={{ margin: 0 }}>
                  Formulario Para Registrarse
                </Title>
              </div>

              {/* Formulario crear cuenta */}
              <Form key={formKey} form={form} onFinish={handleSignUp} layout="vertical" >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="Nombre"
                      label="Nombre"
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingrese su nombre",
                        },
                      ]}
                    >
                      <Input placeholder="Ingrese su nombre" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="Apellido"
                      label="Apellido"
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingrese su apellido",
                        },
                      ]}
                    >
                      <Input placeholder="Ingrese su apellido" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="Direccion"
                      label="Dirección"
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingrese su dirección",
                        },
                      ]}
                    >
                      <Input placeholder="Ingrese su dirección" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="Cedula"
                      label="Cédula"
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingrese su cédula",
                        },
                      ]}
                    >
                      <Input placeholder="Ingrese su cédula" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="IdNacionalidad"
                      label="Seleccione su nacionalidad"
                      rules={[
                        {
                          required: true,
                          message: "Por favor seleccione su nacionalidad",
                        },
                      ]}
                    >
                      <Select placeholder="Seleccione su nacionalidad">
                        {nacionalidades.map((n) => (
                          <Select.Option
                            key={n.idNacionalidad}
                            value={n.idNacionalidad}
                          >
                            {n.nombre}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="IdGenero"
                      label="Seleccione su género"
                      rules={[
                        {
                          required: true,
                          message: "Por favor seleccione su género",
                        },
                      ]}
                    >
                      <Select placeholder="Seleccione su género">
                        {generos.map((g) => (
                          <Select.Option key={g.idGenero} value={g.idGenero}>
                            {g.texto}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="NombreUsuario"
                      label="Nombre de Usuario"
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingrese su nombre de usuario",
                        },
                      ]}
                    >
                      <Input placeholder="Ingrese su nombre de usuario" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="Correo"
                      label="Correo"
                      rules={[
                        {
                          required: true,
                          type: "email",
                          message: "Por favor ingrese un correo válido",
                        },
                      ]}
                    >
                      <Input placeholder="Ingrese su correo" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="Contraseña"
                      label="Contraseña"
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingrese su contraseña",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Ingrese su contraseña" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Foto" label="Foto">
                      <Upload
                        fileList={fileList}
                        onChange={handleFileChange}
                        beforeUpload={() => false}
                        listType="picture"
                      >
                        <Button icon={<UploadOutlined />}>Subir Foto</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item style={{ textAlign: "end" }}>
                  <Button type="primary" htmlType="submit" loading={isLoadingC} disabled={isLoadingC}>
                    Crear Cuenta
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

