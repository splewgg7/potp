import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const DelPres = ({ setLink, names, data, setData }) => {
  const addPresRef = useRef(null);
  const [key, setKey] = useState("");
  const [name, setName] = useState(names[0]);
  const [activeKey, setActiveKey] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      addPresRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {
      mounted = false;
    };
  }, []);

  const delPres = async (e) => {
    e.preventDefault();
    if (key === "") {
      key === "" ? setActiveKey(true) : setActiveKey(false);
      return;
    }
    try {
      let pres = { key, name };
      await axios.delete("http://localhost:3001/deletepres", { data: pres });
      let tempData = data.slice();
      let updatedDetails = tempData.filter((el) => el.name !== pres.name);
      setData(updatedDetails);
      setKey("");
      alert("success");
    } catch (error) {
      alert("error");
    }
  };

  return (
    <div ref={addPresRef} className="modalContainer">
      <form className="addPres" onSubmit={delPres}>
        <div className="closeBtn">
          <button
            onClick={() => {
              setLink("");
            }}
          >
            X
          </button>
        </div>
        <header>Delete Entry</header>
        <div className="delInput">
          <input
            type="password"
            maxLength="10"
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
              <option key={idx} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button id="submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DelPres;
