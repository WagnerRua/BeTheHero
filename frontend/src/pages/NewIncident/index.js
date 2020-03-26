import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongID = localStorage.getItem('ongID');

  const history = useHistory();

  async function handleNewIncident(e){
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try{
      await api.post('incident', data, {
        headers: {
          Authorization: ongID,
        }
      });

      history.push('/profile');
    }catch(err){
      alert("Submit incident error, try again.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src= {logoImg} alt="Be The Hero"/>
          <h1>Submit New Incident</h1>
          <p>Describe the incident in detail to find a hero who can solve it.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Back to home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Incident Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Value"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}