import React from "react";

const CosmeticsTable = ({ products, availableProducts, handleProductChange, handleQuantityChange, removeProduct }) => (
  <>
    {products.map((product, index) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>
          <select
            value={product.selectedProductId || ""}
            onChange={(e) => handleProductChange(product.id, Number(e.target.value))}
          >
            <option value="">Select Product</option>
            {availableProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </td>
        <td>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
            disabled={!product.selectedProductId}
          />
        </td>
        <td>{availableProducts.find(p => p.id === product.selectedProductId)?.amount || 0}</td>
        <td>{product.totalAmount}</td>
        <td>
          <button className="btn text-white"
          style={{backgroundColor:"#8d3b50"}}
           onClick={() => removeProduct(product.id)}>Remove</button>

          
        </td>
      </tr>
    ))}
  </>
);

export default CosmeticsTable;
