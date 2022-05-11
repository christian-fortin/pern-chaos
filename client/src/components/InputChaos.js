import React, { useState } from 'react'


const InputChaos = () => {

const [description , setDescription] = useState("");
// state, and change state


const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
        const body = { description };
        const response = await fetch("/chaos", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })

        console.log(response);
        window.location = "/"
        // will refresh and show the changes.
        
    } catch (err) {
        console.error(err.message)
    }
}

  return (
    <div>
        <h1 className='title'>Chaos</h1>
        <form className="add-post-form" action="" onSubmit={onSubmitForm}>
            <textarea className="add-post-textarea" type="text" placeholder="Say whatever...." value={description} onChange={(e) => setDescription(e.target.value)} />
            {/* value taken from state, onChange is taking what ever is in the text field "e" and using it to change the state. */}
            <button className='post-button' >Post</button>
        </form>
        
    </div>
  )
}

export default InputChaos