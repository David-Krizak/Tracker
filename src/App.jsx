import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import anime from "animejs";
import UnosPodataka from "./UnosPodataka";
import Statistika from "./Statistika";
import PrintTable from "./PrintTable";
import Vrijeme from "./Vrijeme";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App(props) {
  const [imeRadnika, setImeRadnika] = useState("");
  const [isNameSaved, setIsNameSaved] = useState(false);
  const [zadanaNorma, setZadanaNorma] = useState(0);

  const trackerRef = useRef(null);
  const unosPodatakaRef = useRef(null);
  const ispisiButtonRef = useRef(null);

  useEffect(() => {
    const storedImeRadnika = localStorage.getItem("ime_radnika");
    if (storedImeRadnika) {
      setImeRadnika(storedImeRadnika);
      setIsNameSaved(true);
    } else {
      const promptedImeRadnika = window.prompt("Unesite ime radnika:");
      if (promptedImeRadnika) {
        localStorage.setItem("ime_radnika", promptedImeRadnika);
        setImeRadnika(promptedImeRadnika);
        setIsNameSaved(true);
      }
    }

    // Animations
    anime({
      targets: trackerRef.current,
      opacity: [0, 1],
      translateY: [-50, 0],
      duration: 1000,
      easing: "easeInOutQuad",
    });

    if (unosPodatakaRef.current) {
      anime({
        targets: unosPodatakaRef.current,
        opacity: [0, 1],
        duration: 1200,
        easing: "easeInOutQuad",
      });
    }

    if (ispisiButtonRef.current) {
      anime({
        targets: ispisiButtonRef.current,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000,
        easing: "easeInOutQuad",
      });
    }
  }, [isNameSaved]);

  const hasDataToPrint = props.unos.length > 0;

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a ref={trackerRef} className="navbar-brand" href="#">
            Tracker poslova
          </a>
          <span className="navbar-text welcome-message ml-auto">
            {isNameSaved ? `Dobrodošli, ${imeRadnika}` : null}
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            {isNameSaved && (
              <div className="mb-3" ref={unosPodatakaRef}>
                <UnosPodataka setZadanaNorma={setZadanaNorma} />
              </div>
            )}
          </div>
          <div className="col-md-6">
            {hasDataToPrint ? (
              <div className="text-center mb-3">
                <PrintTable
                  data={props.unos}
                  imeRadnika={imeRadnika}
                  zadanaNorma={zadanaNorma}
                />
              </div>
            ) : (
              <div className="text-center mb-3" ref={ispisiButtonRef}>
                <button disabled className="btn btn-secondary">
                  Ispisi
                </button>
              </div>
            )}
            <Vrijeme />
          </div>
        </div>
      </div>

      {/* Statistika */}
      {props.unos.map((unos, index) => (
        <Statistika
          key={index}
          unos={unos}
          index={index}
          ukloniUnos={props.ukloniUnos}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  unos: state.unos,
});

export default connect(mapStateToProps)(App);
