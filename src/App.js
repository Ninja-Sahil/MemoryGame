import './App.css';
import {useEffect, useState} from 'react'
import Singlecard from './components/Singlecard';

const cardImages = [
  { "src" : "/img/helmet-1.png",matched: false},
  { "src" : "/img/potion-1.png",matched: false},
  { "src" : "/img/ring-1.png",matched: false},
  { "src" : "/img/scroll-1.png",matched: false},
  { "src" : "/img/shield-1.png",matched: false},
  { "src" : "/img/sword-1.png",matched: false}
]

function App() {

  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false)

  const reset = () => {
    setDisabled(false)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns( prevTurn => prevTurn+1 )
  }

  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card,matched : true}
            } else{
              return card;
            }
          })
        })
        reset()
      } else{
        setTimeout(() =>reset(), 1000 )
      }
    }
  },[choiceOne,choiceTwo])

  const suffleCard = () => {
    const sufCards = [...cardImages,...cardImages]
      .sort(() => 0.5-Math.random())
      .map((card) => ({...card , id: Math.random()}))
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(sufCards)
      setTurns(0)

  }

  useEffect(()=>{
    suffleCard();
  },[])

  console.log(cards,turns)

  return (
    <div className="App">
      <h1>Magic Game</h1>
      <button onClick={suffleCard}>New Game</button>
      <div className='card-Grid'>
      {
        cards.map(card => (
          <Singlecard
            key={card.id} card={card}
            handleChoice={handleChoice}
            flipped={card===choiceOne || card===choiceTwo || card.matched }
            disabled={disabled}
          />
        ))
      }
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;