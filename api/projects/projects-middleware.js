// add middlewares here related to projects
const Project = require('./projects-model')

async function projectId(req, res, next) {

   try {
     const project = await Project.get(req.params.id)
     if (!project) {
       next({status:404, message: 'project not found'})
     } else {
       req.project = project
       next()
     }
   } catch (err) {
     console.log(err)
   }
  }

  function projectName (req, res, next) {

    const {name} = req.body
    if(!name) {
      res.status(400).json({
        message: 'missing required name'}) 
      }else {
        next()
    }
  }

  module.exports = {projectId,projectName}