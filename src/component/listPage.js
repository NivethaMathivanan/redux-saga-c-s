
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReq, deleteReq, getIdReq, clearData, viewReq } from "../redux/actions/formActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import './list.css';

const ListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.formReducer.formData);

  const get = useCallback(() => {
    dispatch(getAllReq());
  }, [dispatch]);

  useEffect(() => {
    get();
  }, [get]);

 
  console.log("Form Data:", data);

  const handleDelete = (id) => {
    dispatch(deleteReq(id));
    toast.error("Form deleted successfully!", { position: "top-right" });
  };

  const handleEdit = (id) => {
    dispatch(getIdReq(id));
    
    navigate(`/Form/${id}`);
  };

  // const handleView = (id) => {
  //   const selectedForm = data.find((form) => form.id === id);
  //   if (selectedForm) {
  //     // Debugging: Log selected form data for view
  //     console.log("Selected Form for View:",data, selectedForm);
      
  //     navigate(`/View/${id}`, { state: { data: selectedForm } });
  //   }
  // };
  const handleView = (id) => {

    if(!id){
      console.error("invaild",id);
      return;
      
    }
    const selectedForm = data.find((form) => form.id === id);
    if (selectedForm) {
      
      const cosmeticsData = selectedForm.products?.length
        ? selectedForm.products.map(({ productId, productName, amount, totalAmount, quantity }) => ({
            productId,
            productName,
            amount,
            totalAmount,
            quantity,
          }))
        : [];
  
      const stationaryData = selectedForm.productsSec?.length
        ? selectedForm.productsSec.map(({ productIdSec, productNameSec, amountSec, totalAmountSec, quantitySec }) => ({
            productIdSec,
            productNameSec,
            amountSec,
            totalAmountSec,
            quantitySec,
          }))
        : [];
  
     
      const viewData = {
        ...selectedForm,
        cosmeticsData,
        stationaryData,
        grandTotalCosmetics: selectedForm.grandTotalCosmetics || 0,
        grandTotalStationary: selectedForm.grandTotalStationary || 0,
        gstCosmetics: selectedForm.gstCosmetics || 0,
        gstStationary: selectedForm.gstStationary || 0,
        discountCosmetics: selectedForm.discountCosmetics || 0,
        discountStationary: selectedForm.discountStationary || 0,
      };
  
      console.log("Selected Form for View:", viewData);
  dispatch(viewReq({id,viewData}))
      navigate(`/View/${id}`, { state: { data: viewData } });
    } else {
      console.error("Form not found");
    }
  };
  
  const handleAdd = () => {
    dispatch(clearData())
    navigate('/Form'); 
  };


  return (
    <div>
      <ToastContainer />
      <h2 className="text-center mt-4">Submitted Forms</h2>

      <table className="mt-4 text-center" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr >
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Phone Number</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Address</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((form) => (
              <tr key={form.id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{form.name}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{form.email}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{form.phoneNumber}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{form.address}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{form.date}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <button  className= "listOne btn" onClick={() => handleDelete(form.id)}>Delete</button>&nbsp;
                  <button  className="listTwo btn" onClick={() => handleEdit(form.id)}>Edit</button>&nbsp;
                  <button  className="listThree btn"  onClick={() => handleView(form.id)}>View</button>&nbsp;
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "8px" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button  className=" buttonFour mt-3 mx-auto d-flex btn" style={{borderRadius:"5px"}}  onClick={handleAdd}>Add to New Form</button>
    </div>
  );
};

export default ListPage;
