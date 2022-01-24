import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const EditPres = ({ setLink, names, data, setData }) => {
  const addPresRef = useRef(null);
  const [key, setKey] = useState("");
  const [name, setName] = useState(names[0]);
  const [details, setDetails] = useState("");
  const [activeKey, setActiveKey] = useState(false);
  const [activeDetails, setActiveDetails] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      addPresRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {
      mounted = false;
    };
  }, []);

  const editPres = async (e) => {
    e.preventDefault();
    if (details === "" || key === "") {
      key === "" ? setActiveKey(true) : setActiveKey(false);
      details === "" ? setActiveDetails(true) : setActiveDetails(false);

      return;
    }
    const pres = { key, name, details };
    try {
      await axios.put("https://potp.herokuapp.com/editpres", pres);

      let tempData = data.slice();
      let updatedDetails = data.filter((pres) => pres.name === name);
      let presName = updatedDetails[0].name;
      let index = tempData.findIndex((el) =>
        el.name === presName ? true : null
      );
      tempData[index].details = pres.details;
      setData(tempData);
      setKey("");
      setDetails("");
      alert("success");
    } catch (error) {
      console.log(error.response.status);
      alert("error");
    }
  };

  return (
    <div ref={addPresRef} className="modalContainer">
      <form className="addPres" onSubmit={editPres}>
        <div className="closeBtn">
          <button
            onClick={() => {
              setLink("");
            }}
          >
            X
          </button>
        </div>
        <header>Edit Details</header>
        <input
          maxLength="10"
          type="password"
          placeholder="Admin Key"
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
            setActiveKey(false);
          }}
        />
        <span className={activeKey ? "form-error active" : "form-error"}>
          Please fill this part
        </span>
        <select onChange={(e) => setName(e.target.value)}>
          {names.map((name, idx) => (
            <option value={name} key={idx}>
              {name}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Replace Details"
          rows="8"
          cols="40"
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
            setActiveDetails(false);
          }}
        ></textarea>
        <span className={activeDetails ? "form-error active" : "form-error"}>
          Please fill this part
        </span>
        <button id="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPres;
