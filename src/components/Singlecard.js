import './Singlecard.css'

export default function Singlecard({card,handleChoice,flipped,disabled}) {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }

  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img src={card.src} className='front' alt='front'/>
        <img 
            src='/img/cover.png' 
            onClick={handleClick}
            className='back' 
            alt='back'
        />
    </div>
    </div>
  )
}
