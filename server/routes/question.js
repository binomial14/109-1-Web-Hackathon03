import Question from '../models/Question'
import Answer from '../models/Answer'

exports.GetContents = async (req, res) => {
  // TODO : get questions from mongodb and return to frontend
  //console.log("get contents")
  Question.find().exec((error, result) => {
    if(error)
    {
      res.status(403).send({message: 'error', contents: []})
    }
    else
    {
      res.status(200).send({message: 'success', contents: result})
    }
  })
  
}

exports.CheckAns = async (req, res) => {
  // TODO : get answers from mongodb,
  // check answers coming from frontend and return score to frontend
  console.log("check ans")
  console.log(req)
  Answer.find().exec((error, result) => {
    if(error)
    {
      res.status(403).send({message: 'error', score: -1})
      //console.log('gg')
    }
    else
    {
      //console.log(req)
      //console.log(result)
      //res.status(200).send({message: 'success', score:})

    }
  })
}
