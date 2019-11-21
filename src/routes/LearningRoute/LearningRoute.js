import React, { Component } from 'react';
import LanguageApiService from '../../services/language-service';
import Button from '../../components/Button/Button';
import { Label, Input } from '../../components/Form/Form'

import './LearningRoute.css';


class LearningRoute extends Component {
  state = {
    answer: '',
    currentWord: '',
    nextWord: '',
    lastWord: '',
    correctAnswer: '',
    totalScore: 0,
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    isCorrect: false,
    guessAnswer: false,
    error: null
  }

  componentDidMount() {
    LanguageApiService.fetchWordHead()
      .then(res => {
        this.setState({
          nextWord: res.nextWord,
          currentWord: res.nextWord,
          lastWord: res.nextWord,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount,
          totalScore: res.totalScore
        })
      })
  }

  handleSubmitAnswer = async (e) => {
    e.preventDefault();
    this.setState({ guessAnswer: true})
    // LanguageApiService.postGuess({ guessAnswer: true})

    await LanguageApiService.postGuess(this.state.answer)
     .then(res => {
       console.log('-------res');
       console.log(res);
       if(res.isCorrect){
         this.setState({
           correctAnswer: res.answer,
           wordCorrectCount: this.state.wordCorrectCount + 1,
           totalScore: res.totalScore,
           isCorrect: true,
           nextWord: res.nextWord
         })
       }
       else{
         this.setState({
           totalScore: res.totalScore,
           correctAnswer: res.answer,
           wordIncorrectCount: this.state.wordIncorrectCount + 1,
           isCorrect: false,
           nextWord: res.nextWord
         })
       }
     })
     .catch(error => {
       this.setState({error : error.message})
     })
  
  }

  handleNextButton = e => {
    e.preventDefault();
    this.setState({guessAnswer: false, isCorrect: false, currentWord: this.state.nextWord})
    // LanguageApiService.fetchWordHead()
    //  .then(res => {
    //    this.setState({
    //      answer: '',
    //      correctAnswer: '',
    //      lastWord: res.nextWord,
    //      currentWord: res.nextWord,
    //      wordCorrectCount: res.wordCorrectCount,
    //      wordIncorrectCount: res.wordIncorrectCount,
    //     //  totalScore: res.totalScore
    //    })
    //  })
  }

  displayForm(){
    if(!this.state.guessAnswer){
      return(
        <form id="User-Guess" onSubmit = {this.handleSubmitAnswer} >
          <Label htmlFor="learn-guess-input">
            What's the translation for this word?
          </Label>
          <Input aria-label="type your guess" type="text" name="learn-guess-input" id="learn-guess-input" onChange={(e) => this.setState({answer: e.currentTarget.value})} required/>  
          <Button aria-label="submit your answer" type="submit">Submit your answer</Button>
        </form>
        )
      }
      else
      {
        return (
          <div>
          <Button aria-label="try another word" type="click" onClick = {this.handleNextButton}>Try another word!</Button>
          </div>
        )
      }
  }

  displayResult(){
    if(this.state.isCorrect){
      return(
        <>
          <h2>You were correct! :D</h2>
          <div className="DisplayFeedback"><p>The correct translation for {this.state.currentWord} was {this.state.correctAnswer} and you chose {this.state.answer}!</p></div>
        </>
      )
    }
    else{
      return(
        <>
          <h2>Good try, but not quite right :(</h2>
          <div className="DisplayFeedback"><p>The correct translation for {this.state.currentWord} was {this.state.correctAnswer} and you chose {this.state.answer}!</p></div>
        </>
      )
    }
  }

  render() {
    let cardhead = (this.state.guessAnswer) ?
      <div className="result-content">
        {this.displayResult()} 
      </div>:
     <div className="question-content">
        <h2>Translate the word:</h2>
        <span>{this.state.currentWord}</span>
     </div> 
      return (
        <section>
          <div className='card-container'>      
            {cardhead}
            {this.displayForm()}
            <div className="DisplayScore"><p className="DisplayScore">Your total score is: {this.state.totalScore}</p></div>
            <p className="Correct-Count">You have answered this word correctly {this.state.wordCorrectCount} times.</p>
            <p className="Incorrect-Count">You have answered this word incorrectly {this.state.wordIncorrectCount} times.</p>       
          </div>
        </section>
      );
    }
    
  }


export default LearningRoute;
