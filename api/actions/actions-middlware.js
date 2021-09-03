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

  function actionName (req, res, next) {

    const {name} = req.body
    if(!name) {
      res.status(400).json({
        message: 'missing required name'}) 
      }else {
        next()
    }
  }

  module.exports = {actionId,actionName}