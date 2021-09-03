// Write your "projects" router here!
const express = require('express')
const {projectId,validateProject,} = require('./projects-middleware')
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


router.put('/:id', projectId,validateProject, (req, res) => {
  const changes = req.body;
  Project.update(req.params.id, changes)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(400).json({ message: 'The project could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({message: 'fill in missing required field'});
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

  router.get('/:id/projects', projectId, async (req, res, next) => {
    try {
      const result = await Project.getProjectprojects(req.params.id)
      res.json(result)
    } catch (err) {
      next(err)
    }
  });


module.exports = router