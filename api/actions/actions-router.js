// Write your "actions" router here!
const express = require('express')
const {actionId,actionName} = require('./actions-middlware')
const Action = require('./actions-model')
const router= express.Router()
// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.
// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.
// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.

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

router.post('/', actionName, (req, res) => {
    Action.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({message: 'fill in missing required field'})
    })
});

module.exports = router