import React, { useState } from 'react';

const EditChaos = ({chaos}) => {
    const [description, setDescription] = useState(chaos.description)


    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch (`http://localhost:5001/chaos/${chaos.post_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            console.log(response);
            window.location ="/"
            
        } catch (err) {
            console.error(err.message)
        }
    }
    console.log(chaos);
  return (
    <div>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        className="edit-delete-button-og"
        id='edit-button-og'
        data-toggle="modal"
        data-target={`#id${chaos.post_id}`}
      >
        Edit
      </button>

      {/* <!-- The Modal --> */}
      <div className="modal" id={`id${chaos.post_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">EDIT POST</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(chaos.description)}>
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
                <textarea id='modal-input' type="text" value={description} onChange={e => setDescription(e.target.value)}/>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
            <button type="button" className="btn btn-danger"  id='inner-edit-btn' data-dismiss="modal" onClick={e => updateDescription(e)}>
                Edit
              </button>
              <button type="button" className="btn btn-danger" id='inner-close-btn' data-dismiss="modal" onClick={() => setDescription(chaos.description)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChaos;
