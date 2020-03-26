import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
  const [incidents, setIncidents] = useState([]);

  const ongID = localStorage.getItem('ongID');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongID
      }
    }).then( response => {
      setIncidents(response.data)
    })
  }, [ongID]);

  async function handleDeleteIncident(id){
    try{
      await api.delete(`incident/${id}`, {
        headers: {
          Authorization: ongID,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));

    }catch(err){
      alert("Delete error, try again.");
    }
  }

  function handleLogout(){
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src= {logoImg} alt="Be The Hero"/>
        <span>Welcome, {ongName}</span>
        <Link className="button" to="/incident/new">
            Submit a new incident.
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Registered Incidents</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>INCIDENT:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>

            <strong>VALUE:</strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="##a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}