import React from 'react';

const StationaryTable = ({
  productsSec,
  availableProductsSec,
  handleProductChangeSec,
  handleQuantityChangeSec,
  removeProductSec,
}) => {

  return (

      <>
        {productsSec.map((productSec, index) => (
          <tr key={productSec.id}>
            <td>{index + 1}</td>
            <td>
              <select
                value={productSec.selectedProductIdSec || ""}
                onChange={(e) =>
                  handleProductChangeSec(productSec.id, parseInt(e.target.value))
                }
              >
                <option value="" disabled>
                  Select Product
                </option>
                {availableProductsSec.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="number"
                value={productSec.quantity}
                min="1"
                onChange={(e) =>
                  handleQuantityChangeSec(productSec.id, parseInt(e.target.value))
                }
                disabled={!productSec.selectedProductIdSec}
              />
            </td>
            <td>
              {productSec.selectedProductIdSec
                ? availableProductsSec.find(
                  (p) => p.id === productSec.selectedProductIdSec
                ).amount
                : "0"}
            </td>
            <td>{productSec.totalAmount}</td>

            <td>
  
                <button className="btn text-white" 
                style ={{backgroundColor:"#8d3b50"}}
                onClick={() => removeProductSec(productSec.id)} >Remove</button>
 
              </td>
              </tr>
            
        ))}
          </>
  
  );
};

export default StationaryTable;
