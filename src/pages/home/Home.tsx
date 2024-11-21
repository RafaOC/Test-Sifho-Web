import "./Home.css";
import Navbar from "../../componentes/Navbar";
import { Row, Col, Typography, Card  } from 'antd';

const { Title, Paragraph } = Typography;

export const Home = () => {
  return (
    <div>
      <Navbar />

      <div style={{ padding: "80px 20px 20px" }}>
      <Row gutter={[16, 16]} align="middle">
        
        <Col span={8}>
          <img
            src="/src/assets/Sifha_logo_d.png"
            alt="Imagen de empresa"
            style={{
              width: "100%",
              objectFit: "cover",
              height: "auto",
            }}
          />
        </Col>

        <Col span={16}>
          <Typography>
            <Title level={2} style={{ fontSize: '28px', fontWeight: 'bold' }}>
            SIFHA le ofrece cubrir todas las áreas necesarias, tanto administrativas,financieras como hospitalarias
            </Title>

            {/* Card para Administración Hospitalaria */}
            <Card style={{ marginBottom: '20px' }} title="Administración Hospitalaria">
              <Paragraph>
                Emergencia, Internamiento, Receta Médica, Evolución Médica,
                Evolución de Enfermería, Módulo de Citas Médicas, Resultados de
                Estudios, Resultados de Análisis, Reporte del Servicio de
                Cirugía, Epicrisis, Evaluación Pre-
              </Paragraph>
            </Card>

            {/* Card para Contabilidad General */}
            <Card style={{ marginBottom: '20px' }} title="Contabilidad General">
              <Paragraph>
                Entrada de Cheques, Entrada de Egresos (Compras y Proveedores),
                Entrada de Depósitos, Entrada de Facturación, Entrada de Caja,
                Entrada de Nómina, Entrada de Notas de Débito Pacientes y
                Seguros, Entrada de Notas de
              </Paragraph>
            </Card>

            {/* Card para Auditoria y Envío a las ARS */}
            <Card style={{ marginBottom: '20px' }} title="Auditoria y Envío a las ARS">
              <Paragraph>
                Se genera un reporte para verificar todas las transacciones de
                las diferentes ARS, tales como Emergencia, Ambulatoria e
                Internamiento antes de Generar la Factura que generará el NCF.
              </Paragraph>
            </Card>

            {/* Card para Nómina de Empleados */}
            <Card style={{ marginBottom: '20px' }} title="Nómina de Empleados">
              <Paragraph>
                Registro de Personal, Manejo de Varios tipos de Nóminas,
                Descuento de Empleados, Actualización de Novedades, Volante de
                Pago, Generación de Archivo para pagos Electrónicos, Generación
                del archivo DGT-3.
              </Paragraph>
            </Card>
          </Typography>
        </Col>
      </Row>
    </div>
    </div>
  );
};
