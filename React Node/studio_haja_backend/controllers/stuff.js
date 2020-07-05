const Thing = require('../models/things');
const fs = require('fs'); // fs donne acces au systeme des fichiers pour pouvoir les supp.

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ? // on créer l'objet pour veirfier si req.file existe ou non.
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // SI OUI on traite la nouvelle image
    } : { ...req.body }; // SI NON, on traite qu el'onjet entrant.
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // Trouver le fichier..
    .then(thing => { // en callback on recup un thing..
      const filename = thing.imageUrl.split('/images/')[1]; // on recup l'image avec url, le split pour le nom, le [1] pour le 2eme element du tableau: le nom.
      fs.unlink(`images/${filename}`, () => { // unlink suppression du fichier.
        Thing.deleteOne({ _id: req.params.id }) // callback du unlink, suppresion de l'objet dans la base
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
