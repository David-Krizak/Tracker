export const DODAJ_UNOS = "DODAJ_UNOS";
export const UREDI_UNOS = "UREDI_UNOS";
export const OBRISI_UNOS = "OBRISI_UNOS";
export const UPDATE_TOTAL_NORMA = "UPDATE_TOTAL_NORMA";
export const UPDATE_TOTAL_UTROSENO_VRIJEME = "UPDATE_TOTAL_UTROSENO_VRIJEME"; // Define it here

export const dodajUnos = (unos) => ({
  type: DODAJ_UNOS,
  payload: unos,
});

export const urediUnos = (index, izmijenjeniUnos) => ({
  type: UREDI_UNOS,
  index,
  payload: izmijenjeniUnos,
});

export const obrisiUnos = (index) => ({
  type: OBRISI_UNOS,
  index,
});

export const updateTotalNorma = (totalNorma) => ({
  type: UPDATE_TOTAL_NORMA,
  totalNorma,
});

export const updateTotalUtrosenoVrijeme = (totalUtrosenoVrijeme) => ({
  type: UPDATE_TOTAL_UTROSENO_VRIJEME,
  totalUtrosenoVrijeme,
});
