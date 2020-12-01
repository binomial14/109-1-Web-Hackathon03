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
  //console.log("check ans")
  //console.log(req)
  Answer.find().exec((error, result) => {
    if(error)
    {
      res.status(403).send({message: 'error', score: -1})
      //console.log('gg')
    }
    else
    {
      //console.log('get')
      //console.log()
      //console.log("ii")
      //console.log(result)
      //res.status(200).send({message: 'success', score:})
      var my_ans = req['body']['params']['ans']
      //console.log(result)
      var my_score = 0;
      for(var i = 0; i < result.length; i++)
      {
        //console.log(result[i]['answer'])
        if(my_ans[i] === result[i]['answer'])
        {
          my_score += 1
        }
      }
      console.log(my_score)
      res.status(200).send({message: 'success', score: my_score})

    }
  })
}
