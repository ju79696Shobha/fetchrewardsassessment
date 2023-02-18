import { React } from "react";

const useForm = (formData,updateFormData) => {

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
            //   if (response.status === 200) {
            //     setMessage("User created successfully");
            //   } else {
            //     setMessage("Some error occured");
            //   }
            })
            .catch((error) => {
              console.error('Error:', error);
            })
      };
    return{handleChange ,handleSubmit};
}

export default useForm;


