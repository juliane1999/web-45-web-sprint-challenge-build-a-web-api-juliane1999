// add middlewares here related to actions
const Action = require('./actions-model')

async function actionId(req, res, next) {

   try {
     const action = await Action.get(req.params.id)
     if (!action) {
       next({status:404, message: 'action not found'})
     } else {
       req.action = action
       next()
     }
   } catch (err) {
     console.log(err)
   }
  }

  function validateAction (req, res, next) {
    const { notes, description,project_id } = req.body
    if(!notes || !description || !project_id ) {
        res.status(400).json({
            message: 'missing either notes or description'
        })
    } else {
        req.notes = notes
        req.description = description
        req.project_id= project_id
        next()
    }
}

  module.exports = {actionId,validateAction}