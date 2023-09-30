import React, { useRef } from "react";

function PrintTable({ data, imeRadnika }) {
  const printContentRef = useRef(null);

  const formatDate = () => {
    const now = new Date();
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  };

  const calculateEfficiency = (utrosenoVrijemeMin, zadanaNorma) => {
    const efficiency = (zadanaNorma / utrosenoVrijemeMin) * 100;
    return efficiency.toFixed(2);
  };

  const calculateZadanaNorma = (norma, vrstaPosla) => {
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

    return norma * faktorNorme;
  };

  const calculateTotalUtrosenoVrijeme = (data) => {
    return data.reduce((total, item) => total + item.utrosenoVrijemeMin, 0);
  };

  const calculateAverageEfficiency = (data) => {
    if (data.length === 0) {
      return "N/A";
    }

    const totalEfficiency = data.reduce(
      (total, item) =>
        total +
        (calculateZadanaNorma(item.norma, item.vrstaPosla) /
          item.utrosenoVrijemeMin) *
          100,
      0
    );
    const averageEfficiency = totalEfficiency / data.length;

    return averageEfficiency.toFixed(2);
  };

  const handlePrint = () => {
    const averageEfficiency = calculateAverageEfficiency(data);
    const showSmileyFace = parseFloat(averageEfficiency) > 120; // efikasnost veca od 120% show sad smily

    const printWindow = window.open("", "_blank");
    printWindow.document.title = "Ispis tablice";
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Ispis tablice</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .header {
              display: flex;
              justify-content: space-between;
            }
            .header-left {
              text-align: left;
              font-size: 18px;
            }
            .header-right {
              text-align: right;
            }
            .title {
              display: none;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="header-left">
              <p>${imeRadnika}${showSmileyFace ? "  😔" : ""}</p>
            </div>
            <div class="header-right">
              <p>Datum: ${formatDate()}</p>
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Ime Programa</th>
                  <th>Norma</th>
                  <th>Zadana Norma</th>
                  <th>Utrošeno Vrijeme</th>
                  <th>Efikasnost (%)</th>
                  <th>Vrsta Posla</th>
                </tr>
              </thead>
              <tbody ref={printContentRef}>
                ${printContentRef.current.innerHTML}
              </tbody>
            </table>
          </div>
          <p>Utrošeno vrijeme: ${calculateTotalUtrosenoVrijeme(data)} / 440</p>
          <p>Prosječna Efikasnost (%): ${averageEfficiency}%</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="print-button-container">
      {data ? (
        <div>
          {/* Hidden table using inline style */}
          <div style={{ display: "none" }}>
            <table>
              <thead>
                <tr>
                  <th>Ime Programa</th>
                  <th>Norma</th>
                  <th>Zadana Norma</th>
                  <th>Utrošeno Vrijeme</th>
                  <th>Efikasnost (%)</th>
                  <th>Vrsta Posla</th>
                </tr>
              </thead>
              <tbody ref={printContentRef}>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.imePrograma}</td>
                    <td>{item.norma}</td>
                    <td>{calculateZadanaNorma(item.norma, item.vrstaPosla)}</td>
                    <td>{item.utrosenoVrijemeMin}</td>
                    <td>
                      {calculateEfficiency(
                        item.utrosenoVrijemeMin,
                        calculateZadanaNorma(item.norma, item.vrstaPosla)
                      )}
                      %
                    </td>
                    <td>{item.vrstaPosla}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Move the button to the navbar */}
          <button onClick={handlePrint} className="btn btn-primary">
            Ispiši
          </button>
        </div>
      ) : (
        <div>
          <h4>Nema podataka</h4>
        </div>
      )}
    </div>
  );
}

export default PrintTable;
