import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import Card from "./Card";
import Hero from "./Hero";
import PostPres from "./PostPres";

const Presidents = () => {
  gsap.registerPlugin(ScrollTrigger);
  const [data, setData] = useState([]);
  const [play] = useState(false);
  const [selected, setSelected] = useState(null);
  const [names, setNames] = useState([]);
  const selectedPresRef = useRef(null);
  const timeline = useMemo(
    () => gsap.timeline({ paused: true, reversed: true }),
    []
  );
  const presidentsRef = useRef(null);
  const selectedRef = useRef(null);

  const getPresArray = useCallback(async () => {
    let result = await axios.get("https://potp.herokuapp.com/getpres");
    setData(result.data);
  }, []);

  useEffect(() => {
    getPresArray();
  }, [getPresArray]);

  const getNames = useCallback(() => {
    setNames(data.map((pres) => pres.name));
  }, [data, setNames]);

  useEffect(() => {
    getNames();
  }, [getNames]);

  useEffect(() => {
    timeline.to(presidentsRef.current, {
      width: "50%",
      ease: "power3.out",
      duration: 0.7,
    });
    if (play) {
      gsap.fromTo(
        selectedRef.current,
        {
          opacity: 0,
          right: "10%",
          top: "70%",
        },
        {
          opacity: 1,
        }
      );
    } else {
      gsap.to(selectedRef.current, {
        opacity: 0,
        right: "10%",
        top: "70%",
        ease: "power3.out",
      });
    }
  }, [timeline, play]);

  useEffect(() => {
    gsap.fromTo(
      selectedRef.current,
      {
        opacity: 0,
        right: "10%",
        top: "70%",
      },
      {
        opacity: 1,
      }
    );
  }, [selected]);

  useEffect(() => {
    gsap.from(presidentsRef.current, {
      scrollTrigger: {
        trigger: presidentsRef.current,
        start: "20px 50%",
        end: "+=300 10%",
      },
      opacity: 0,
      duration: 2.3,
    });
  }, []);

  return (
    <div>
      <Hero />
      <div className="parent-card" ref={presidentsRef}>
        {data &&
          data.map((pres, idx) => (
            <Card
              key={idx}
              idx={idx}
              info={pres}
              setSelected={setSelected}
              timeline={timeline}
              selectedPresRef={selectedPresRef}
            />
          ))}
      </div>
      {selected && (
        <>
          <div ref={selectedRef} className="selectedPres">
            <BsArrowReturnLeft
              className="arrow"
              onClick={() => {
                timeline.reverse();
                setSelected(null);
              }}
            />

            <img ref={selectedPresRef} src={selected.image} alt="president" />
            <h1>{selected.name}</h1>
            <p>{selected.details}</p>
          </div>
        </>
      )}
      <div>
        {data !== [] && (
          <PostPres names={names} data={data} setData={setData} />
        )}
      </div>
    </div>
  );
};

export default Presidents;
