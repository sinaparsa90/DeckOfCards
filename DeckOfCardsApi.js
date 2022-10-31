import React ,{useState ,useEffect} from "react";
import "./DeckOfCardsApi.css"
import axios from "axios";

function DeckOfCardsApi (){
    // to ask for show the card : https://deckofcardsapi.com/api/deck/y7hgdkgle69v/draw/
    // send new order: https://deckofcardsapi.com/api/deck/new/
    
    const [DeckId, setDeckId]=useState('')
    const [addCard , setAddCard]=useState([])
    const [desc, setDesc]=useState("")
    
useEffect(()=>{
    const Api_url= "https://deckofcardsapi.com/api/deck/new/shuffle"
    const fetchData= async()=>{
     const res= await axios.get(Api_url)
     console.log(res.data)
     setDeckId(res.data.deck_id)
    }
    fetchData()
},[]
    

)
  
    

 const handleDeck = () =>{
    const Api_url= "https://deckofcardsapi.com/api/deck/new/shuffle"
    const fetchData= async ()=>{
        const res= await axios.get(Api_url)
        console.log(res.data)
        setDeckId(res.data.deck_id)
    }


   
  fetchData()

 }

 const handleNewCard = () =>{
    const urlId= `https://deckofcardsapi.com/api/deck/${DeckId}/draw/`
    const fetchData= async ()=>{
    const resId=await axios.get(urlId)
            // console.log(resId.data.cards[0].image)
            let card=resId.data.cards[0];
            let plusOrNeg= Math.random() > 0.5 ? 1 : -1;
            let rand= plusOrNeg * Math.floor(Math.random()*20);
            console.log(card)
            setAddCard(
                [...addCard,{code:card.code ,  image:card.image, pos:rand , name:`${card.value} of ${card.suit}`}]
            )
           
            console.log(addCard)
            console.log(desc)

             
    }
    fetchData()
 }
 


    return(
     
        <div className="content" >
            <h1>DeckOfCardsApi</h1>
            <button onClick={handleDeck}>ask for new deck</button>
            <button onClick={handleNewCard}>shuffle new card</button>
            <div className="Image-content">
               
            {addCard.map((c,i) => 
            <img style={{rotate:`${c.pos}deg`,right:`${c.pos}px`,up:`${c.pos}px`}} className="imgCards"  src={c.image} />
          
            
            )}
            
            </div>
             {addCard.length>0 ? 
             <h5>{addCard[addCard.length- 1].name}</h5>
             : null
            }
            <h2>there are remaining cards</h2>
        </div>
    )
}


export default DeckOfCardsApi;




