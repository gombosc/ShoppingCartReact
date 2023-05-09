import './App.css';
import React, {useState} from "react";

// The whole tabel
function FilterableProductsTable({ products }){
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
        <SearchBar 
         filterText = {filterText}
         inStockOnly = {inStockOnly}
         onFilterTextChange = {setFilterText}
         onInStockOnlyChange = {setInStockOnly}/>

        <ProductsTable 
        products = { products } 
        filterText = { filterText }
        inStockOnly = { inStockOnly }/>
    </div>
  );
}

// fruits and vegetables section
function ProductsCategoryRow( {category} ){
  return (
    <tr>
      <th colSpan="2">
         { category } 
      </th>
    </tr>
  );
}

// items from basket section
function ProductsRow( { product }){
  // Check to see if product is in stock then returrn product name if true, if false return name but in red
  const name = product.stocked ? product.name: 
    <span style={{ color: "red" }}>
      {product.name}
    </span>;

    return (
      <tr> 
        <td> { name } </td>
        <td> { product.price } </td>
      </tr>
    );
}

// Section containing Products Row and CategoryRow
function ProductsTable( { products, filterText, inStockOnly }){
  const rows =[ ];
  let lastCategory = null;

  products.forEach( ( product ) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
        ) === -1
    ) {
       return; 
    }

    if( inStockOnly && !product.stocked){
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductsCategoryRow category={ product.category } key={ product.category } />
      );
    }

    rows.push(
      <ProductsRow product={ product } key={ product.name } />
    );

    lastCategory = product.category;
  });

  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody> {rows} </tbody>
    </table>
  );
}

function SearchBar( {filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange} ){
  return(
    <form>
      <input type="text" value={filterText} placeholder="Search..."  onChange={( event ) => onFilterTextChange(event.target.value)}/>

      <label>
        <input type="checkbox" checked={inStockOnly} onChange={ ( event ) => onInStockOnlyChange(event.target.checked)}/>
        {" "} 
        Only Show Products in Stock
      </label>
    </form>
  );  
}


const Products = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1.5", stocked: true, name: "Kiwi"},
    {category: "Fruits", price: "$2", stocked: false, name: "Banana"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkins"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Carrots"}
];

export default function App() {
  // products prop goes to ProductsRow and ProductsTable
  return <FilterableProductsTable products = { Products } />;
}
