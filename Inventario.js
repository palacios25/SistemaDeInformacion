import Articulo from "./Articulo.js";

export default class Inventario {
  constructor(tableProducto, tableInfo) {
    this._tableProducto = tableProducto;
    this._tableInfo = tableInfo;
    this._numProductos = 0;
    this._productos = "";
    this._inicio = null;
    this._temporal = null;
  }

  get inicio(){
    return this._inicio;
  }

  get temporal(){
    return this._temporal;
  }

  set inicio(inicio){
    this._inicio = inicio;
  }

  set temporal(temporal){
    this._temporal = temporal;
  }

  _addObjeto(articulo){
    let objArticulo = {
      codigo : articulo.codigo,
      nombre : articulo.nombre,
      precio : articulo.precio,
      cantidad : articulo.cantidad,
      descripcion : articulo.descripcion 
    };
    this._addToTable(objArticulo);
  }

  add(newArticulo){
    if (this._inicio == null){
      this._inicio = newArticulo;
    } else {
      this._addSiguiente(newArticulo, this._inicio);
    }
    this._addObjeto(newArticulo);
  }

  _addSiguiente(newArticulo, ultimo){
    if (ultimo._siguiente == null){
      ultimo._siguiente = newArticulo;
    } else {
      this._addSiguiente(newArticulo, ultimo._siguiente);
      console.log(ultimo._siguiente);
    }
  }
  

  toString(){
    return "(" + this._articulos + ")";
  }

  _deleteArticulo(value){
  this._temporal = this._inicio;
    while(this._temporal._siguiente.codigo != value){
      this._temporal = this._temporal._siguiente;
    }
    if (this._temporal.codigo == value){
      this._temporal._siguiente._siguiente == this._temporal._siguiente;
    }

      console.log("objeto borrado: " + this._temporal._siguiente);
      console.log(this._articulos);
  } 

  findArticulo(value){
    this._temporal = this._inicio;

    while(this._temporal.codigo != value){
      this._temporal = this._temporal._siguiente;
    }
    console.log(this._temporal);
    this._addToTable(this._temporal);
  }

  
  _addDeleteToRow(row, articulo){

    let btnDelete = document.createElement("input");
    btnDelete.type = "button";
    btnDelete.value = "Eliminar";
    btnDelete.className = "btn btn-danger";
    btnDelete.addEventListener("click", () => {
      this._deleteArticulo(row, articulo);
    });

    row.cells[5].innerHTML = "";
    row.cells[5].appendChild(btnDelete);
  }


  _addToTable(articulo) {
    let row = this._tableProducto.insertRow(-1);

    let cellCodigo = row.insertCell(0);
    let cellNombre = row.insertCell(1);
    let cellPrecio = row.insertCell(2);
    let cellCantidad = row.insertCell(3);
    let cellDescripcion = row.insertCell(4);
    row.insertCell(5);
   

    cellCodigo.innerHTML = articulo.codigo;
    cellNombre.innerHTML = articulo.nombre;
    cellPrecio.innerHTML = articulo.precio;
    cellCantidad.innerHTML = articulo.cantidad;
    cellDescripcion.innerHTML = articulo.descripcion;
    this._addDeleteToRow(row, articulo);

    this._numProductos += parseInt(articulo.cantidad);
    this._productos += articulo.nombre + "<br>";
    
    this._tableInfo.rows[0].cells[1].innerHTML = this._numProductos;
    this._tableInfo.rows[1].cells[1].innerHTML = this._productos;

  }
} 
