import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [repository, setRepository] = useState({ title: "" });

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    if (repository.title.length < 1) return;

    api.post("/repositories", repository).then((response) => {
      setRepositories([...repositories, response.data]);
      setRepository({ title: "" });
    });
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(1)}>Remover</button>
          </li>
        ))}
      </ul>

      <input
        onChange={(e) =>
          setRepository({ ...repository, title: e.target.value })
        }
        value={repository.title}
        autoFocus
        type="text"
      />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
