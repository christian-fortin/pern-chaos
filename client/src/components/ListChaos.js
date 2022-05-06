import React, { useEffect, useState } from 'react';
import EditChaos from './EditChaos';

const ListChaos = () => {
  const [chaos, setChaos] = useState([]);

  // Delete Function
  const deletePost = async (id) => {
    try {
        const deletePost = await fetch(`http://localhost:5001/chaos/${id}`, {
            method: 'DELETE'
        })

        console.log(deletePost);
        setChaos(chaos.filter(chaos => chaos.post_id !== id))
    } catch (err) {
        console.error(err.message);
      }
  }

  const getChaos = async () => {
    try {
      const response = await fetch('http://localhost:5001/chaos');
      const jsonData = await response.json();

      // console.log(jsonData)
      setChaos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getChaos();
  }, []);

  // console.log(chaos);
  return (
    <div>
      <h1>List of Chaos</h1>
      <div>
        <h3>Description</h3>
        {chaos.map((chaos) => (
          <div key={chaos.post_id}>
            <p>{chaos.description}</p>
            <EditChaos chaos={chaos}/>
            <button onClick={() => deletePost(chaos.post_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListChaos;
