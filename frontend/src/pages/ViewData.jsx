import React, { useState, useEffect } from 'react';
import { Table, Form, Dropdown, Button, Col, Row, Pagination, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Funnel, Download, Pencil  } from 'react-bootstrap-icons'; // Importando ícone de funil
import axios from 'axios';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

const ViewData = () => {
  const util = require('../utils/index');
  const [filters, setFilters] = useState({
    nome: '',
    data_nascimento: '',
    genero: '',
    nacionalidade: '',
    data_criacao: '',
    data_atualizacao: '',
  });

  const [showFilters, setShowFilters] = useState({
    nome: false,
    data_nascimento: false,
    genero: false,
    nacionalidade: false,
    data_criacao: false,
    data_atualizacao: false,
    rowsPerPage: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const fetchDataCount = async () => {
    try {
      const response = await axios.get('http://localhost:3000/leads/count');
      if (response.status === 200) {
        setDataCount(response.data._count || 0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async (page) => {
    const skip = page - 1;
    try {
      const response = await axios.get('http://localhost:3000/leads', {
        params: {
          skip,
          take: rowsPerPage,
          ...filters,
        },
      });
      if (response.status === 200) {
        setData(response.data || []);
        if (handleFilterChangeReturn(filters)) {
          setDataCount(response.data.length / rowsPerPage);
        } else {
          fetchDataCount();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDataCount();
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, filters, rowsPerPage]);

  useEffect(() => {
    setCurrentPage(1); // Resetar a página atual ao alterar filtros
  }, [filters]);

  useEffect(() => {
    filterData();
  }, [searchQuery, data]);

  const totalPages = dataCount > 0 ? Math.ceil(dataCount / rowsPerPage) : 1;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterChangeReturn = (e) => {
    for (const chave in e) {
      if (e.hasOwnProperty(chave) && e[chave] !== '') {
        return true;
      }
    }
    return false;
  };

  const handleToggleFilters = (filterName) => {
    setShowFilters((prevShowFilters) => ({
      ...prevShowFilters,
      [filterName]: !prevShowFilters[filterName],
    }));
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleRowsPerPageSelect = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1);
    setShowFilters((prev) => ({ ...prev, rowsPerPage: false }));
  };

  const filterData = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toLowerCase().includes(lowercasedQuery)
      )
    );
    if (searchQuery) {
      setDataCount(filtered.length);
      setFilteredData(filtered);
    } else {
      fetchData(1)
      setFilteredData(filtered);
    }
    
    
  };

  // Define the pages to show in pagination
  const getPaginationPages = () => {
    const pages = [];

    if (currentPage > 1) pages.push(currentPage - 1);
    pages.push(currentPage);
    if (currentPage < totalPages) pages.push(currentPage + 1);

    return pages;
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.click();
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-itens-center flex-column">
      <Row className="mb-3">
        {['nome', 'data_nascimento', 'genero', 'nacionalidade', 'data_criacao', 'data_atualizacao'].map((filterName) => (
          <Col xs={12} sm={6} md={4} lg={2} className="mb-2" key={filterName}>
            <Button
              variant="outline-primary"
              onClick={() => handleToggleFilters(filterName)}
              className="w-100"
            >
              <Funnel /> {filterName.charAt(0).toUpperCase() + filterName.slice(1).replace('_', ' ')}
            </Button>
            <Dropdown show={showFilters[filterName]} className="mt-2">
              <Dropdown.Menu style={{ minWidth: '200px' }}>
                <Form.Control
                  type="text"
                  placeholder={`Filtrar por ${filterName.charAt(0).toUpperCase() + filterName.slice(1).replace('_', ' ')}`}
                  name={filterName}
                  value={filters[filterName]}
                  onChange={handleFilterChange}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        ))}
        <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
          <Button
            variant="outline-primary"
            onClick={() => handleToggleFilters('rowsPerPage')}
            className="w-100"
          >
            <Funnel /> Registros por Página
          </Button>
          <Dropdown show={showFilters.rowsPerPage} className="mt-2">
            <Dropdown.Menu style={{ minWidth: '200px' }}>
              <Dropdown.Item onClick={() => handleRowsPerPageSelect(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRowsPerPageSelect(20)}>20</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRowsPerPageSelect(50)}>50</Dropdown.Item>
              <Dropdown.Item onClick={() => handleRowsPerPageSelect(100)}>100</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} className='d-flex justify-content-between'>
          <InputGroup className="mb-30 m-3" style={{width: '50%'}}>
            <Form.Control
              placeholder="Digite para filtrar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Button
            variant="outline-secondary"
            onClick={() => { navigate('/create-lead') }}
            className="w-25 m-3"
          >
             Criar Lead
          </Button>
          <Button
            variant="outline-success"
            onClick={downloadCSV}
            className="w-25 m-3"
          >
            <Download /> Exportar CSV
          </Button>
        </Col>
      </Row>

      <div className="table-responsive mt-3" style={{ maxHeight: '300px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Gênero</th>
              <th>Nacionalidade</th>
              <th>Data de Criação</th>
              <th>Data de Atualização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{util.formatDate(item.data_nascimento)}</td>
                <td>{item.genero}</td>
                <td>{item.nacionalidade}</td>
                <td>{util.formatDate(item.data_criacao)}</td>
                <td>{util.formatDate(item.data_atualizacao)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate(`/edit-lead/${item.id}`)}
                  >
                    <Pencil /> {/* Ícone de editar */}
                  </Button>
                </td>
              </tr>
            )) : <tr><td colSpan="6">Nenhum dado encontrado</td></tr>}
          </tbody>
        </Table>
      </div>

      <div className="mt-3 d-flex justify-content-center">
        <Pagination className="pagination">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {getPaginationPages().map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
      <button variant='secondary' onClick={() => {navigate('/home')}} className='m-3 btn btn-outline-secondary'
          style={{alignSelf: 'center', justifySelf: 'center'}}
          >Voltar</button>
    </div>
  );
};

export default ViewData;
