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
  
  function validateProject(req, res, next) {
    const { name, description } = req.body
    if(!name || !description) {
        res.status(400).json({
            message: 'missing either name or description'
        })
    } else {
        req.name = name
        req.description = description
        next()
    }
}

// function completed (req,res,next) {
//   const {completed} = req.body
//   if (!completed) {
//     res.status(400).json({
//       message: 'not completed'
//     })
//   } else {
//     req.completed = true
//     next()
//   }
// }

  module.exports = {projectId,validateProject}