import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useState } from "react";
import AddPres from "./AddPres";
import DelPres from "./DelPres";
import EditPres from "./EditPres";

const PostPres = ({ data, setData, names }) => {
  gsap.registerPlugin(ScrollTrigger);

  const [link, setLink] = useState(null);

  return (
    <>
      <div className="links">
        <div
          className="newPres"
          onClick={(e) => {
            setLink(e.target.className);
          }}
        >
          Add a President
        </div>
        <div
          className="repPres"
          onClick={(e) => {
            setLink(e.target.className);
          }}
        >
          Replace Details
        </div>
        <div
          className="delPres"
          onClick={(e) => {
            setLink(e.target.className);
          }}
        >
          Delete Entry
        </div>
      </div>
      {link === "newPres" && (
        <AddPres setLink={setLink} data={data} setData={setData} />
      )}
      {link === "repPres" && (
        <EditPres
          data={data}
          setData={setData}
          names={names}
          setLink={setLink}
        />
      )}
      {link === "delPres" && (
        <DelPres
          data={data}
          setData={setData}
          names={names}
          setLink={setLink}
        />
      )}
    </>
  );
};

export default PostPres;
