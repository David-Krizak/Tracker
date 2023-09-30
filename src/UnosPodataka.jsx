import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { dodajUnos } from "../redux/actions";
import PrintTable from "./PrintTable"; // Import the PrintTable component

function UnosPodataka(props) {
  const [imePrograma, setImePrograma] = useState(""); // Changed variable name
  const [norma, setNorma] = useState("");
  const [vrstaPosla, setVrstaPosla] = useState("programiranje");
  const [pocetnoVrijeme, setPocetnoVrijeme] = useState("");
  const [zavrsnoVrijeme, setZavrsnoVrijeme] = useState("");
  const [efikasnost, setEfikasnost] = useState(0);
  const [utrosenoVrijemeMin, setUtrosenoVrijemeMin] = useState(0);
  const [zadanaNorma, setZadanaNorma] = useState(0);

  useEffect(() => {
    let faktorNorme;

    switch (vrstaPosla) {
      case "programiranje":
        faktorNorme = 0.6;
        break;
      case "sklapanje":
        faktorNorme = 0.4;
        break;
      case "paletar":
        faktorNorme = 0.5;
        break;
      case "stoPostoNorme":
        faktorNorme = 1.0;
        break;
      default:
        faktorNorme = 1.0;
    }

    const zadanaNormaIzracun = norma * faktorNorme;
    setZadanaNorma(zadanaNormaIzracun);

    const [pocetniSat, pocetneMinute] = pocetnoVrijeme.split(":").map(Number);
    const [zavrsniSat, zavrsneMinute] = zavrsnoVrijeme.split(":").map(Number);

    const pocetnoVrijemeUMin = (pocetniSat || 0) * 60 + (pocetneMinute || 0);
    const zavrsnoVrijemeUMin = (zavrsniSat || 0) * 60 + (zavrsneMinute || 0);

    const utrosenoVrijeme = zavrsnoVrijemeUMin - pocetnoVrijemeUMin;
    setUtrosenoVrijemeMin(!isNaN(utrosenoVrijeme) ? utrosenoVrijeme : 0);

    const efikasnostProcenat =
      utrosenoVrijeme !== 0 ? (zadanaNormaIzracun / utrosenoVrijeme) * 100 : 0;
    setEfikasnost(
      !isNaN(efikasnostProcenat) ? efikasnostProcenat.toFixed(2) : 0
    );
  }, [pocetnoVrijeme, zavrsnoVrijeme, norma, vrstaPosla]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const noviUnos = {
      imePrograma, // Changed variable name
      norma,
      vrstaPosla,
      pocetnoVrijeme,
      zavrsnoVrijeme,
      utrosenoVrijemeMin,
      zadanaNorma, // Pass zadanaNorma to the App component
    };
    props.dodajUnos(noviUnos);
    setImePrograma(""); // Clear the input field
    setNorma("");
    setVrstaPosla("programiranje");
    setPocetnoVrijeme("");
    setZavrsnoVrijeme("");
  };

  return (
    <div className="container mt-4">
      <h2>Unos podataka</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="imePrograma">Ime programa:</label>
          <input
            type="text"
            className="form-control"
            id="imePrograma"
            value={imePrograma}
            onChange={(e) => setImePrograma(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pocetnoVrijeme">Početno vrijeme:</label>
          <input
            type="time"
            className="form-control"
            id="pocetnoVrijeme"
            value={pocetnoVrijeme}
            onChange={(e) => setPocetnoVrijeme(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zavrsnoVrijeme">Završno vrijeme:</label>
          <input
            type="time"
            className="form-control"
            id="zavrsnoVrijeme"
            value={zavrsnoVrijeme}
            onChange={(e) => setZavrsnoVrijeme(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Vrsta posla:</label>
          <div>
            {/* Radio buttons */}
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="programiranje"
                value="programiranje"
                checked={vrstaPosla === "programiranje"}
                onChange={(e) => setVrstaPosla(e.target.value)}
              />
              <label className="form-check-label" htmlFor="programiranje">
                Programiranje
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="sklapanje"
                value="sklapanje"
                checked={vrstaPosla === "sklapanje"}
                onChange={(e) => setVrstaPosla(e.target.value)}
              />
              <label className="form-check-label" htmlFor="sklapanje">
                Sklapanje
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="paletar"
                value="paletar"
                checked={vrstaPosla === "paletar"}
                onChange={(e) => setVrstaPosla(e.target.value)}
              />
              <label className="form-check-label" htmlFor="paletar">
                Paletar
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="stoPostoNorme"
                value="stoPostoNorme"
                checked={vrstaPosla === "stoPostoNorme"}
                onChange={(e) => setVrstaPosla(e.target.value)}
              />
              <label className="form-check-label" htmlFor="stoPostoNorme">
                100% norme
              </label>
            </div>
            {/* End of radio buttons */}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="norma">Norma:</label>
          <input
            type="number"
            className="form-control"
            id="norma"
            value={norma}
            onChange={(e) => setNorma(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Utrošeno vrijeme (u minutama):</label>
          <span>{utrosenoVrijemeMin}</span>
        </div>
        <div className="form-group">
          <label>Zadana Norma:</label>
          <span>{zadanaNorma}</span>
        </div>
        <div className="form-group">
          <label>Efikasnost (%):</label>
          <span>{efikasnost}%</span>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Spremi
          </button>
        </div>
      </form>
      {imePrograma && <PrintTable zadanaNorma={zadanaNorma} />}
    </div>
  );
}

const mapDispatchToProps = {
  dodajUnos,
};

export default connect(null, mapDispatchToProps)(UnosPodataka);
