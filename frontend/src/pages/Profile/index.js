
import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css';
import api from '../../services/api';

export default function Profile() {

  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const voltar = useNavigate();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      console.log(response.data);
      setIncidents(response.data);
    })
  }, [ongId]);

  //Deletar incident
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId, 
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (erro){
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  function handleLogout () {
    localStorage.clear();
    voltar('/', {replace: true});
  }

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt={'Be the Hero'} />
        <span>Bem vinda, {ongName}</span>

        <Link className='button' to='/incident/new'>Cadastrar</Link>
        <button onClick={handleLogout} type='button'>
          <FiPower size={18} color='#e02041' />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
            </p>
          </li>
        ))}
      </ul>


    </div>
  )
}