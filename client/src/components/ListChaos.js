import React, { useEffect, useState } from 'react';
import EditChaos from './EditChaos';

const ListChaos = () => {
  const [chaos, setChaos] = useState([]);

  // Delete Function
  const deletePost = async (id) => {
    try {
        const deletePost = await fetch(`/chaos/${id}`, {
            method: 'DELETE'
        })
        // THIS IS DIFFERENT^ --- WILL IT CAUSE ERRORS?

        console.log(deletePost);
        setChaos(chaos.filter((chaos) => chaos.post_id !== id))
    } catch (err) {
        console.error(err.message);
      }
  }

  // Get ALL posts function
  const getChaos = async () => {
    try {
      const response = await fetch('/chaos');
      const jsonData = await response.json();

      // console.log(jsonData)
      setChaos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // 
  useEffect(() => {
    getChaos();
  }, []);

  // console.log(chaos);
  return (
    <div>
      {/* <h1>List of Chaos</h1> */}
      <div>
        {/* <h3>Description</h3> */}
        {chaos.map((chaos) => (
          <div className='post-container' key={chaos.post_id}>
            <p className='ptag-description'>{chaos.description}</p>
            <div className='edit-delete-div'>
            <EditChaos chaos={chaos}/>
            <button id='delete-button-og' className="edit-delete-button-og" onClick={() => deletePost(chaos.post_id)}>Delete</button>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListChaos;
