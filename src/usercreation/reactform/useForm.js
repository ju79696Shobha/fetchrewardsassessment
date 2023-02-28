import { React,useState } from "react";

const useForm = (formData,updateFormData) => {
    //const [message, setMessage] = useState("");
    const [submitstatus, setsubmitstatus] = useState();
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://frontend-take-home.fetchrewards.com/form`, {
            method: "POST",
            headers: {
              'Accept': "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then ((response)=>console.log(response))
            .then((response) => {
              console.log('Success:', formData);
              document.getElementById("registerform").reset();
              if (response.status !== 200) {
                throw new Error(response.statusText);
                //setMessage("User created successfully");
              }
              return response.json(); 
            })
            .then(() => setsubmitstatus("ok"))
            .catch((err) => setsubmitstatus("error", err.toString()));
    };
    
    return{handleChange ,handleSubmit,submitstatus}     
        
}

export default useForm;


