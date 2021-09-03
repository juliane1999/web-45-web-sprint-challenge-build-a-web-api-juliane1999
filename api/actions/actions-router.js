// Write your "actions" router here!
const express = require('express')
const {actionId,validateAction} = require('./actions-middlware')
const Action = require('./actions-model')
const router= express.Router()

router.get('/', (req, res, next) => {

    Action.get()
    .then(actions => {
      res.json(actions)
    })
    .catch(next)
  });

  
  router.get('/:id', actionId, (req, res) => {
    res.json(req.action)
});

router.post('/', validateAction, (req, res) => {
    Action.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({message: 'fill in missing required field'})
    })
});

router.put('/:id', actionId, validateAction, (req, res) => {
    const changes = req.body;
    Action.update(req.params.id, changes)
      .then(action => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(400).json({ message: 'The action could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(404).json({message: 'fill in missing required field'});
      });
  });

  
  router.delete('/:id', actionId, async(req, res, next) => {
    try {
      await Action.remove(req.params.id)
      res.json(req.action)
    } catch (err) {
      next(err)
    }
  });

module.exports = router