// Requiring the module
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.options("*", cors());
const port = 8000;

const reader = require("xlsx");

// Reading our test file
const file = reader.readFile("./liste.xlsx");

// Printing data
// console.log(data[23]);
// var monObjet = data[23];
// var monTableau = Object.keys(monObjet).map(function (cle) {
//   return [Number(cle), monObjet[cle]];
// });
// console.log(monTableau[1][1], "tab");

app.get("/", (req, res) => {
  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }

  function triAleatoire(tableau) {
    // Copier le tableau d'origine pour ne pas le modifier directement
    let resultat = tableau.slice();

    // Parcours du tableau de la fin vers le début
    for (let i = resultat.length - 1; i > 0; i--) {
      // Générer un index aléatoire entre 0 et i
      const j = Math.floor(Math.random() * (i + 1));

      // Échanger les éléments à l'index i et j
      const temp = resultat[i];
      resultat[i] = resultat[j];
      resultat[j] = temp;
    }

    return resultat;
  }

  const tableauTrieAleatoire = triAleatoire(data);

  console.log(tableauTrieAleatoire, "e");
  res.json(tableauTrieAleatoire[23]);
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));
