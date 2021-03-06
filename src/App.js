import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repositório ${Date.now()}`,
      url: `http://github.com/Roadm11/${Date.now()}`,
      techs: "Node Js, React Native, C#"
    });
    const repository = response.data;
    
    setRepositories([...repositories, repository]);
  };

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repoFiltered = repositories.filter(repo => repo.id !== id);

    setRepositories(repoFiltered);
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
