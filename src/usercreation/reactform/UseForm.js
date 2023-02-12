import { useState } from "react";

function useForm({ form }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  //Submit button handling
  const handleSubmit = (e) => {
    if (form) {
      e.preventDefault();
     
      setStatus("loading");
      setMessage("");
    //fetching all form details 
    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }
    console.log(data);
    //sending submitted data to endpoint
    fetch(`https://frontend-take-home.fetchrewards.com/form`, {
        method: "POST",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then ((response)=>console.log(response))
        .then((response) => {
          if (response.status !== 201) {
            throw new Error(response.statusText);
          }
          return response.JSON();
        })
        .then(() => {
          setMessage("data is not sent");
          setStatus("success");
        })
        .catch((err) => {
          setMessage(err.toString());
          setStatus("error");
        });
    }
  };

  return { handleSubmit, status, message };
}

export default useForm;