import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AddPres = ({ setLink, data, setData }) => {
  const addPresRef = useRef(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [key, setKey] = useState("");
  const [activeKey, setActiveKey] = useState(false);
  const [activeName, setActiveName] = useState(false);
  const [activeImage, setActiveImage] = useState(false);
  const [activeDetails, setActiveDetails] = useState(false);

  const presSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || image === "" || key === "" || details === "") {
      key === "" ? setActiveKey(true) : setActiveKey(false);
      name === "" ? setActiveName(true) : setActiveName(false);
      image === "" ? setActiveImage(true) : setActiveImage(false);
      details === "" ? setActiveDetails(true) : setActiveDetails(false);
      return;
    }

    try {
      const newPres = { key, name, image, details };
      await axios.post("https://potp.herokuapp.com/postpres", newPres);
      alert("success");
      setData([...data, newPres]);
      setKey("");
      setName("");
      setImage("");
      setDetails("");
    } catch (error) {
      alert("error");
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      addPresRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div ref={addPresRef} className="modalContainer">
      <form className="addPres" onSubmit={presSubmit}>
        <div className="closeBtn">
          <button
            onClick={() => {
              setLink("");
            }}
          >
            X
          </button>
        </div>
        <header>Add President</header>
        <input
          maxLength="10"
          id="delInput"
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
        <input
          type="text"
          placeholder="President Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);

            setActiveName(false);
          }}
        />
        <span className={activeName ? "form-error active" : "form-error"}>
          Please fill this part
        </span>
        <input
          type="text"
          placeholder="Image Link"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
            setActiveImage(false);
          }}
        />
        <span className={activeImage ? "form-error active" : "form-error"}>
          Please fill this part
        </span>
        <textarea
          placeholder="Add Details"
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

export default AddPres;
