import React, { useState, useContext } from "react";
import ItemCount from "./ItemCount";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";


function ItemDetail({ item }) {

  const { addItem } = useContext(CartContext);

  const [stock, setStock] = useState(5);

  const [sumado, setSumado] = useState(false);

  const { title, price, pictureUrl, description, categoryId } = item;

  const sumarAlCarrito = (cantidadSeleccionada) => {
    if (stock >= cantidadSeleccionada) {
      addItem({
        item: item,
        cantidad: cantidadSeleccionada,
      });
      setStock(stock - cantidadSeleccionada);
      setSumado(true);
    }
  };


  return (
    <>
      <div className="body-itemdetail">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {categoryId}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        <div className="info-detail">
          <img src={pictureUrl} className="img-detail rounded float-left" />
          <h1> {title} </h1>
          <p className="price-detail"> ${price} </p>
          <p className=" text-detail text-lg-left">{description}</p>
          {sumado ? (
            <div>
              <Link to="/cart" className="btn btn-primary">
               
                Finalizar compra
              </Link>
            </div>
          ) : (
            <div className="precio">
              <ItemCount stock={stock} initial="0" onAdd={sumarAlCarrito} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ItemDetail;
