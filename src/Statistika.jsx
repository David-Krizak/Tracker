import React, { useState } from "react";
import { connect } from "react-redux";
import {
  urediUnos as urediUnosAction,
  obrisiUnos,
  updateTotalNorma,
  updateTotalUtrosenoVrijeme,
} from "../redux/actions";

function Statistika({
  unos,
  index,
  obrisiUnos,
  urediUnosAction,
  updateTotalNorma,
  updateTotalUtrosenoVrijeme,
}) {
  const { imePrograma, norma, utrosenoVrijemeMin, vrstaPosla } = unos;

  const [isEditing, setIsEditing] = useState(false);
  const [editedImePrograma, setEditedImePrograma] = useState(imePrograma);
  const [editedNorma, setEditedNorma] = useState(norma);
  const [editedVrstaPosla, setEditedVrstaPosla] = useState(vrstaPosla);
  const [editedPocetnoVrijeme, setEditedPocetnoVrijeme] = useState("");
  const [editedZavrsnoVrijeme, setEditedZavrsnoVrijeme] = useState("");

  const handleUkloniClick = () => {
    obrisiUnos(index);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (editedUtrosenoVrijemeMin) => {
    const izmijenjeniUnos = {
      imePrograma: editedImePrograma,
      norma: editedNorma,
      vrstaPosla: editedVrstaPosla,
      pocetnoVrijeme: editedPocetnoVrijeme,
      zavrsnoVrijeme: editedZavrsnoVrijeme,
    };
    urediUnosAction(index, izmijenjeniUnos);
    setIsEditing(false);

    const totalNorma =
      editedNorma *
      (editedVrstaPosla === "programiranje"
        ? 0.6
        : editedVrstaPosla === "sklapanje"
        ? 0.4
        : editedVrstaPosla === "paletar"
        ? 0.5
        : 1);
    const totalUtrosenoVrijeme = editedUtrosenoVrijemeMin;

    updateTotalNorma(totalNorma);
    updateTotalUtrosenoVrijeme(totalUtrosenoVrijeme);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Ime Programa: "{imePrograma}"</h5>
              <p className="card-text">
                Zadana Norma:{" "}
                {norma *
                  (vrstaPosla === "programiranje"
                    ? 0.6
                    : vrstaPosla === "sklapanje"
                    ? 0.4
                    : vrstaPosla === "paletar"
                    ? 0.5
                    : 1)}
              </p>
              <p className="card-text">
                Utrošeno vrijeme: {utrosenoVrijemeMin}
              </p>
              <p className="card-text">Vrsta posla: {vrstaPosla}</p>
              <div className="d-flex justify-content-between">
                {!isEditing && (
                  <button onClick={handleEditClick} className="btn btn-primary">
                    Uredi
                  </button>
                )}
                <button onClick={handleUkloniClick} className="btn btn-danger">
                  Ukloni
                </button>
              </div>
              {isEditing && (
                <div>
                  <hr />
                  <h5>Uredi unos</h5>
                  <div className="mb-3">
                    <label className="form-label">Norma:</label>
                    <input
                      type="number"
                      value={editedNorma}
                      onChange={(e) => setEditedNorma(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Vrsta posla:</label>
                    <select
                      value={editedVrstaPosla}
                      onChange={(e) => setEditedVrstaPosla(e.target.value)}
                      className="form-select">
                      <option value="programiranje">Programiranje</option>
                      <option value="sklapanje">Sklapanje</option>
                      <option value="paletar">Paletar</option>
                      <option value="stoPostoNorme">100% norme</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Početno vrijeme:</label>
                    <input
                      type="time"
                      value={editedPocetnoVrijeme}
                      onChange={(e) => setEditedPocetnoVrijeme(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Završno vrijeme:</label>
                    <input
                      type="time"
                      value={editedZavrsnoVrijeme}
                      onChange={(e) => setEditedZavrsnoVrijeme(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <button
                    onClick={() => handleSaveClick(utrosenoVrijemeMin)}
                    className="btn btn-success">
                    Spremi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, {
  urediUnosAction,
  obrisiUnos,
  updateTotalNorma,
  updateTotalUtrosenoVrijeme,
})(Statistika);
