import { useRef } from "react";
import { useState,useEffect } from "react";
import useForm from "./UseForm";


const FORM_ENDPOINT = "https://frontend-take-home.fetchrewards.com/form"
const Form = () => {
  const formElement = useRef(null);
  const [val, setVal] = useState([])
  const [state, setState] = useState([])

  //fetching occupation details in select field
  useEffect(() => {
      fetch(FORM_ENDPOINT)
      .then((data) => data.json())
      .then((data) => setVal(data.occupations))
      .catch( error => console.log(error))                                            
  },[])

  //fetching state details in select field
  useEffect(() => {
       fetch(FORM_ENDPOINT)
      .then((data) => data.json())
       .then((data) => setState(data.states))
      .catch( error => console.log(error))                                             
  },[])

  //result status handling
  const { handleSubmit, status, message } = useForm({
    form: formElement.current,
  });

  if (status === "success") {
    return (
      <>
        <div className="text-2xl">Thank you!</div>
        <div className="text-md">{message}</div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div className="text-2xl">Something bad happened!</div>
        <div className="text-md">{message}</div>
      </>
    );
  }

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      target="_blank"
      ref={formElement}
    >
      {/* name input field */}
      <div className="mb-3 pt-0">
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      {/* Email input field */}
      <div className="mb-3 pt-0">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      {/* Password input field */}
      <div className="mb-3 pt-0">
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      {/* Occupation input field */}
      <div className="mb-3 pt-0">
        <select 
            type="select" 
            name="occupation"
            placeholder="occupation"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
        >
            {
            val.map((occ,name) => <option key={name}>{occ}</option>)
            }
        </select>
      </div>
      {/* States input field */}
      <div className="mb-3 pt-0">
        <select 
            name="States"
            name="state"
            placeholder="state"
            className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            required
        >
            {
            state.map((sta,abbreviation) => <option key={abbreviation}>{sta.name}</option>)
            }
        </select>
      </div>
      {/* Submit button field */}
      {status !== "loading" && (
        <div className="mb-3 pt-0">
          <button
            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default Form;