import React from 'react';
import { useNavigate } from 'react-router-dom';
import './bill.css';
import { useSelector } from 'react-redux';

const ViewPage = () => {
  const navigate = useNavigate();
  // const { data } = location.state;

const data=useSelector((state)=>state.formReducer.viewData)
console.log(data)
  
if(!data){
  return <div>loading......</div>
}


  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 2);

    const day = String(tomorrow.getDate()).padStart(2, '0'); 
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); 
    const year = tomorrow.getFullYear(); 

    return `${year}-${month}-${day}`; 
  };

  const filteredStationary = data.stationary.filter(product => product.totalAmount > 0);
  const filteredCosmetics = data.cosmetics.filter(product => product.totalAmount > 0);

  const handleLogin=()=>{
    navigate("/")
  }

  return (
    <div className='invoice-container'>
      <div className='invoice-card'>
        <div className='invoice-header'>
          <h1>Trend Hunters.</h1>
          <p>62, E-Shop, Trichy Road, Tamil Nadu, 613005</p>
        </div>

        <div className='bill-details'>
          <div className='bill-to'>
            <h4>Bill To:</h4>
            <p>{data.name}</p>
            <p>{data.address}</p>
            <p>{data.email}</p>
            <p>{data.phoneNumber}</p>
          </div>
         
          <div className='invoice-info'>
            <h4>Invoice #:</h4>
            <p>US-001</p>
            <h4>Invoice Date:</h4>
            <p>{data.date}</p>
            <h4>Due Date:</h4>
            <p>{data.dueDate || getTomorrowDate()}</p> 
          </div>
        </div>

        <h3 className='invoice-total'>Invoice Total: <span>${(data.grandTotalStationary + data.grandTotalCosmetics).toFixed(2)}</span></h3>

        <div className='product-section'>
          <h4>Products</h4>
          <table className='product-table'>
            <thead>
              <tr>
                <th>Qty</th>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredStationary.map((product, index) => (
                <tr key={index}>
                  <td  >{product.quantity}</td>
                  <td   >{product.productName}</td>
                  <td>${product.amount}</td>
                  <td>${product.totalAmount}</td>
                </tr>
              ))}
              {filteredCosmetics.map((product, index) => (
                <tr key={index}>
                  <td>{product.quantity}</td>
                  <td>{product.productName}</td>
                  <td>${product.amount}</td>
                  <td>${product.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='financial-summary mt-2'>
          <p>Discount: ${(data.discountStationary + data.discountCosmetics).toFixed(2)}</p>
          <p>GST: ${(data.gstStationary + data.gstCosmetics).toFixed(2)}</p>
          <h3>Grand Total: ${(data.grandTotalStationary + data.grandTotalCosmetics).toFixed(2)}</h3>
        </div>

        <div className='signature'>
          <p>Authorized Signature:</p>
          <p className='signature-line'>John Smith</p>
        </div>

      </div>
      <>
    <button className=' loginButton btn mt-4' onClick={handleLogin} style={{borderRadius:"4px",}}> Return login

    </button>
    </>
    </div>
   
  );
};

export default ViewPage;
