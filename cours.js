// METHODE POST
router.post('/', (req, res, next) => {
  delete req.body._id; // effacer les id parce quil se créer automatiquement avec mongodb.
  const thing = new Thing({ // creer nouvelle instance et recuperer avec "..." tous les elements du corps de la req.
    ...req.body
  });
  thing.save() // enregistrer dans la base de donnée.
    .then(() => res.status(201).json({ message: 'Objet enregistré !'})) // envoyer statut et reponse json.
    .catch(error => res.status(400).json({ error }));
});

// UPDATE
router.put('/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

// DELETE
router.delete('/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

// READ - RECUPERER UNE DONNEE SPECIFIQUE
router.get('/:id', (req, res, next) => { // rajouter ":id".
  Thing.findOne({ _id: req.params.id }) // findOne => trouver le modele unique ayant le meme id que dans le parametre de la requete.
    .then(thing => res.status(200).json(thing)) // retourné dans une promis et envoyé au front.
    .catch(error => res.status(404).json({ error })); // si aucun Thing n'est trouvé alors on renvoi erreur 404.
});

//READ - RECUPERER LA LISTE DES DONNEES
router.get('/', (req, res, next) => { // -- api/stuff ==> chemin demandé par le front.
  Thing.find() // => recuperer les donnees
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});
