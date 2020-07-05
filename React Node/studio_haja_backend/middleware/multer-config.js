const multer = require('multer');

//dictionnaires extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // indique à multer où enregistrer les fichiers entrants.
  destination: (req, file, callback) => { // DESTINATION = indique de mettre les fichiers dans "images"
    callback(null, 'images'); // sortie..
  },
  filename: (req, file, callback) => { // utiliser le nom d'origine
    const name = file.originalname.split(' ').join('_'); // enlever les espaces et remplacer par "_"
    const extension = MIME_TYPES[file.mimetype]; // gestion des extensions fichiers appropriées
    callback(null, name + Date.now() + '.' + extension);// sortie + timestamp
  }
});

module.exports = multer({storage: storage}).single('image'); // export de multer avec const storage en indiquant juste que ce sont des images qui seront gérées.
