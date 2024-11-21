import { useAuth } from "../context/auth-context";
import { useDatosUsuario } from '../hooks/useDatosUsuario';
import { useNavigate } from "react-router-dom";

import { Layout, Menu, Dropdown, Button, Space, Avatar, message} from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';

const { Header } = Layout;

export default function Component() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const datosUsuario  = useDatosUsuario();

  const handleLogout = () => {
    message.success("Ha cerrado sesión exitosamente!");
    logout();
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/perfil">Ver perfil</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ padding: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "18px",
            textAlign: "center",
            flex: 1,
          }}
        >
          <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
            Bienvenido a SIFHA Web
          </Link>
        </div>

        {/* Menú de navegación en la esquina derecha */}
        <div>
          <Dropdown overlay={menu} trigger={['hover']}>
            <Button style={{ border: 'none', display: 'flex', alignItems: 'center' }}>
              <Space>
                <span style={{ color: 'black' }}>
                  {datosUsuario?.nombre} {datosUsuario?.apellido}
                </span>
                <Avatar
                  src={`http://localhost:5227/${datosUsuario?.foto}`}
                  style={{
                    width: 30, 
                    height: 30,
                    objectFit: 'cover',
                    marginLeft: '3px',
                  }}
                />
                <DownOutlined style={{ color: 'white' }} />
              </Space>
            </Button>
          </Dropdown>
        </div>

      </div>
    </Header>
  );
}
