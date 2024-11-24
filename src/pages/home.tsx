import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Header from "@/components/header";
import Footer from "@/components/footer";
import styles from "../styles/index.module.css";
import withAuth from "../components/withAuth";

interface Client {
  id: number;
  name: string;
  phone: string;
  address: string;
  bill: string;
  createdAt: Date;
  updatedAt: Date;
  loanSharkId: number;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api/webmob";

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentClient, setCurrentClient] = useState<Partial<Client>>({
    name: "",
    phone: "",
    address: "",
    bill: "",
  });

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/clients`);
      setClients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClient = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClient = async (id: number) => {
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/client/${id}`);
      fetchClients();
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    } finally {
      setIsLoading(false);
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
      bill: "",
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
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
            <span>Carregando...</span>
          </div>
        )}
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
                <th>Valor Devido</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(clients) && clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>{client.phone}</td>
                    <td>{client.address}</td>
                    <td>{client.bill}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
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
                    required
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
                <Form.Group controlId="formClientPhone" className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Telefone do Cliente"
                    value={currentClient.phone}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
                        phone: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formClientAddress" className="mb-3">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Endereço do Cliente"
                    value={currentClient.address}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
                        address: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formClientBill" className="mb-3">
                  <Form.Label>Valor Devido</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="Valor Devido"
                    value={currentClient.bill}
                    onChange={(e) =>
                      setCurrentClient({
                        ...currentClient,
                        bill: e.target.value,
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

export default withAuth(ClientList);
