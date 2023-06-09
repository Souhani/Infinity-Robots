import CreateCard from "../components/CreateCard";
import SearchBox from "../components/SearchBox";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";


   
const App = () => {
/// in here we fitch robots data( name, ...)
 useEffect(() => {
      fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(res => {setCards(res.users);})
      .catch(err => console.log(err,'fetching error'));
    }, []);

 //states that we use.
   const [cards, setCards] = useState([]);
   const [name, setName] = useState('');
   const [nickname, setNickname] = useState('');
   const [index, setIndex] = useState(0);
   const [create, setCreate] = useState(false);
   const [searchfield, setSearchfield] = useState(''); 
  
///functions used to create cards:
            // handle the create robot button
            const handlCreatClick = () => {
               setCreate(true);
            }
            //get the robot Name
            const handleNameChange = (event) => {
            setName(event.target.value);
            };
            
            //get the robot Nickname
            const handleNicknameChange = (event) => {
            setNickname(event.target.value);
            };
            
            //button the user clicks to create a robot
            const handlAddCards = () => {
             if(name.length!==0 && nickname.length!==0){
               let newCard = { id:cards.length+1, firstName: name, lastName: nickname}
               setCards([newCard,...cards]  );
               setName(''); // Clear the name input field when the user done
               setNickname(''); // Clear the Nickname input field also
               setIndex(index+1);
               }
               };

 //go back to the main page from the create card component
            const handleGoBack = () => {
               setCreate(false)
            }

///functions used to delete a robots
            const handleDeleteCard = (deletedItem) => {
               let filteredCards= cards.filter( card => {
                  return card.id!== deletedItem;
                   })
               setCards(filteredCards)
            };
            const handleDeleteAll = () => {
                      setCards([]);
                      setIndex(0);
            }

///search for a robot
   const onSearchChange = (event) => {
      setSearchfield(event.target.value)
   };
   const filteredRobots = cards.filter(robot => {
      return robot.firstName.toLowerCase().includes(searchfield.toLowerCase()) || robot.lastName.toLowerCase().includes(searchfield.toLowerCase())
   });

/// if there is no robots
   const isCards = (cards) => {
      if(!cards.length){
         return (<h1>No Robots</h1>)
      }else{ 
         return <Card filteredRobots={filteredRobots} handleDeleteCard={handleDeleteCard}/>
      };
   };

// if create state is true we show the user the page where he can create robots
   if(create){
      return(      
       <CreateCard 
                   handleNameChange={handleNameChange} 
                   handleNicknameChange={handleNicknameChange} 
                   handlAddCards={handlAddCards} index={index} 
                   handleGoBack={handleGoBack}
                   />        
      )
 // if create state is false we show the user the page where he can see robots
   } else if(!create){
      return (
         <div>
         <h1>Infinity Robots</h1>
         <SearchBox onSearchChange={onSearchChange}/>
         <button className="b ph2 grow bg-gold pv1  br4 ba b--yellow pointer f6 "
                 onClick={ handleDeleteAll }
                 style={{position: 'absolute', top:'2%', right:'2%'}}>
                 Delete All
         </button> 
         <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                 onClick={handlCreatClick}>
                 Create Robots
         </button>
         <Scroll>
            <ErrorBoundry>
               { 
                  isCards(cards)

               }
             
            </ErrorBoundry>
         </Scroll>   
         </div>
        )
   }; 
};
export default App;