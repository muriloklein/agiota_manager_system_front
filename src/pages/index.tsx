import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "../styles/index.module.css";

interface Client {
  id: number;
  name: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  loanSharkId: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState<Partial<Client>>({
    name: "",
    phone: "",
    address: "",
  });

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_URL}/clients`);
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleSaveClient = async () => {
    try {
      if (currentClient.id) {
        await axios.put(`${API_URL}/client/${currentClient.id}`, currentClient);
      } else {
        await axios.post(`${API_URL}/client`, currentClient);
      }
      setShowModal(false);
      fetchClients();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  const handleDeleteClient = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/client/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  const handleEditClient = (client: Client) => {
    setCurrentClient(client);
    setShowModal(true);
  };

  const handleAddClient = () => {
    setCurrentClient({
      name: "",
      phone: "",
      address: "",
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.pageBackground}>
        <div className={styles.containerBackground}>
          <h2>Lista de Clientes</h2>
          <Button variant="primary" onClick={handleAddClient} className="mb-3">
            Adicionar Cliente
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.phone}</td>
                  <td>{client.address}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEditClient(client)}
                      className="me-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClient(client.id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Modal para adicionar/editar cliente */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>
                {currentClient.id ? "Editar Cliente" : "Adicionar Cliente"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formClientName" className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome do Cliente"
                    value={currentClient.name}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
                        name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formClientPin" className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="PIN do Cliente"
                    value={currentClient.phone}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
                        phone: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formClientPin" className="mb-3">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="PIN do Cliente"
                    value={currentClient.address}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
                        address: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSaveClient}>
                {currentClient.id ? "Salvar Alterações" : "Adicionar"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientList;
