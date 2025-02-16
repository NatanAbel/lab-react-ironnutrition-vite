import { useState } from 'react'
import { Card, Row, Col, Divider, Input, Button } from 'antd'
import foods from './foods.json'
import AddFoodForm from './components/AddFoodForm'
import SearchBar from './components/SearchBar'

import './App.css'
import FoodBox from './components/FoodBox'

function App() {
  const [foodsState, setFoodsState] = useState(foods)
  const [searchString, setSearchString] = useState('')
  const [addFoodForm, setAddFoodForm] = useState(false)
  const [emptyFood, setEmptyFood] = useState(false)


  const togglePicture = () =>{
    setAddFoodForm(!addFoodForm)
  }


  const removeFood =(name)=>{

    // console.log("lengthhhh",foodsState.length)
    if(foodsState.length > 0 ){
      const newFoods = foodsState.filter(food => food.name !==name)
    
      setFoodsState(newFoods)
    }
    if(foodsState.length === 1){
      console.log(foodsState.length)
      setEmptyFood(true)
    }
    
  
  }

  return (
    <div className="App">
      {/* Display Add Food component here */}

      <Button onClick={togglePicture}> {addFoodForm === true ? "Add New Food" : "Hide Form"} </Button>
      <AddFoodForm setFoodsState={setFoodsState} addFoodForm={addFoodForm} setAddFoodForm={setAddFoodForm}/>

      {/* Display Search component here */}
      <SearchBar setSearchString={setSearchString} searchString={searchString} setFoodsState={setFoodsState} foodsState={foodsState}/>

      <Divider>Food List</Divider>

      <Row style={{ width: '100%', justifyContent: 'center' }}>
        {/* Render the list of Food Box components here */}
        {foodsState.filter((food)=>{
          if(searchString ===""){
            return food
          }
          if(food.name.toLowerCase().includes(searchString.toLowerCase())){
            return food
          }
        }).map((food)=>{
          return <FoodBox food={food} removeFood={removeFood}/>
        })}

        
      </Row>
        {emptyFood === true ? "nope" : ""}
    </div>
  );
}
export default App