import React, { useState } from "react";
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import './styles.css';
import { FiLogIn } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import api from '../../services/api';



export default function Logon() {
  const [id, setId] = useState('');
  const voltar = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {

      console.log(id);
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      voltar('/profile')
    } catch (erro) {
      alert(`Falha no Login, tente Novamente.`);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID:"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to={'/register'}>
            <FiLogIn className="svgImg" color="#e02041"></FiLogIn>
            Não tenho cadastro
          </Link>

        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>

  )
}