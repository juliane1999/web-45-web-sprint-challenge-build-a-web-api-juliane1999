// Write your "projects" router here!
const express = require('express')
const {projectId,validateProject, completed} = require('./projects-middleware')
const Project = require('./projects-model')
const router= express.Router()

router.get('/', (req, res, next) => {

    Project.get()
    .then(projects => {
      res.json(projects)
    })
    .catch(next)
  });

  router.get('/:id', projectId, (req, res) => {
      res.json(req.project)
  });

  router.post('/', validateProject, (req, res) => {
    Project.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({message: 'fill in missing required field'})
    })
});


  router.put('/:id', projectId,validateProject,completed, (req, res) => {
    Project.update(req.body)
      .then(project => {
          res.status(201).json(project);
      })
      .catch(error => {
        console.log(error);
        res.status(400).json({message: 'fill in missing required field'});
      });
  });

  router.delete('/:id', projectId, async(req, res, next) => {
    try {
      await Project.remove(req.params.id)
      res.json(req.project)
    } catch (err) {
      next(err)
    }
  });

  router.get('/:id/actions', projectId, async (req, res, next) => {
    try {
      const result = await Project.getProjectActions(req.params.id)
      res.json(result)
    } catch (err) {
      next(err)
    }
  });


module.exports = router