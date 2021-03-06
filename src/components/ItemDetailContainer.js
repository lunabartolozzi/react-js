import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { firestore } from "../firebaseConfig";

const ItemDetailContainer = ({articulos}) => {
  const [detalles, setDetalles] = useState({});
  const { id } = useParams();


  useEffect(() => {
    if(id){
        const db = firestore
        const collection = db.collection('articulos')
        const query = collection.doc(id).get()
        query
        .then((result) => {
            setDetalles({id: result.id, ...result.data()})
          })
          .catch((error) => {
            console.log(error)
          })
    }
    else{
        setDetalles(articulos)
    }     

}, [id, articulos])


  return (
    <div className="itemDetailContainer">
      <ItemDetail item={detalles} />
    </div>
  );
};

export default ItemDetailContainer;
