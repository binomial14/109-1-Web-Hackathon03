import React, { Component } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

const send_ans = async (ans) => {
  const {
    data: { score }
  } = await instance.post('/checkAns', { params: { ans } })
  console.log(score)
  return score
}

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,    // true if answered all questions
      contents: [],       // to store questions
      ans: [],            // to record your answers
      score: 0,           // Your score
      current_question: 0 // index to current question
    }
  }

  

  next = async () => {
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question    
    //console.log("next")
    if(this.state.current_question+1 === this.state.contents.length)
    {
      var my_score = 0
      console.log("show answer")
      send_ans(this.state.ans).then(function(result)
      {
        console.log(result)
        my_score = result
      }
      )
      this.setState({score: my_score})
      //console.log(this.state.score)
      // const action = send_ans(this.state.ans)
      // action.then(function(result)
      // {
      //   console.log(result)
      // })
    }
    else
    {
      this.setState({current_question: this.state.current_question+1})
    }
  }

  choose = (index) => {
    // TODO : update 'ans' for the option you clicked
    //console.log("choose")
    //console.log(index['target']['id'].split('_')[1])
    var selection = parseInt(index['target']['id'].split('_')[1])
    console.log(selection)
    var new_ans = this.state.ans
    if(this.state.current_question+1 === new_ans.length)
    {
      new_ans.pop()
    }
    new_ans.push(selection)
    console.log(new_ans)
    this.setState({ans: new_ans})
  }

  getQuestions = async () => {
    // TODO : get questions from backend
    const {
      data: { contents }
    } = await instance.get('/getContents')
    //console.log(contents)
    var question_box = contents
    // for(var i=0; i < contents.length; i++)
    // {
    //   //console.log(contents[i]['questionID'])
    //   //console.log(contents[i]['question'])
    //   question_box.push(contents[i]['question'])
    // }
    this.setState({contents: question_box})
    this.setState({current_question: 0})
    console.log(this.state.contents)
    console.log(this.state.current_question)
  }

  componentDidMount() {
    this.getQuestions()
  }

  // TODO : fill in the rendering contents and logic
  render() {
    const question_contents = this.state.contents
    const current_id = this.state.current_question
    const score = this.state.score
    const ans = this.state.ans
    var options = []
    //console.log(question_contents)

    //for(var i=0; i < question_contents[current_id]['options'].length;i++)
    if(question_contents.length !== 0)
    {
      for(var i=0; i < question_contents[current_id]['options'].length;i++)
      {
        var the_id = 'q' + (current_id+1) + '_' + (i+1)
        console.log(the_id)
        options.push(
        <div className="each-option">
        {ans[current_id]===(i+1) ? 
        <input type="radio" id={the_id} onClick={this.choose} value=''/> 
        :<input type="radio" id={the_id} onClick={this.choose} value=''/> 
        }
        <span>{question_contents[current_id]['options'][i]}</span>
        </div>)
      }
    }
    
    
    
    //console.log(question_contents)
    return (
      <div id="quiz-container">
        {question_contents.length ?
          <React.Fragment>
            <div id="question-box">
              <div className="question-box-inner">
              Question {current_id+1} of {question_contents.length}
              </div>
            </div>

            <div id="question-title">
            {question_contents[current_id]['question']}
            </div>

            <div id="options">
            {options}
            </div>
            
            <div id="actions" onClick={this.next}>
              NEXT
            </div>
          </React.Fragment>
          : <React.Fragment></React.Fragment>
        }
      </div>
    )
  }
}

export default Question
