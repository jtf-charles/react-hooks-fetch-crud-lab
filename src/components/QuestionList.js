import {React,useState,useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
    const [items,setItems]=useState([]);

useEffect(()=>{
  fetch("http://localhost:4000/questions")
  .then((res)=>res.json())
  .then((data)=> {
  //console.log(data);
  setItems(data);
  //Setisloaded(true)
})
},[])


 function handleDelete(id){
  //console.log(id);
  fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la suppression");
          }
          // Mets à jour le state local
          const newList=items.filter(item => { return item.id !==id})
          setItems(newList)
        })
        .catch((error) => {
          console.error("Erreur:", error);
        });
    }
 //console.log("after delete")
 //console.log(items);


 function handleChangeCorrectAnswer(id,newCorrectIndex){
   fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
          correctIndex: newCorrectIndex
          }),// Les champs à modifier
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }
      //mise a jour
     setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, correctIndex: newCorrectIndex } : item
        )
      );
    })
    .catch((error) => {
      console.error("Erreur:", error);
    });
 }


  return (
    <section>
      <h1>Quiz Questions</h1>
     <ul>
        {items.map(item => {
          return <QuestionItem key={item.id} question={item} deleteItem={handleDelete} changeItem={handleChangeCorrectAnswer}/>
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
