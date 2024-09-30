import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Form.css";
import Nav from "../component/Nav";
import CosmeticsTable from "./Table";
import StationaryTable from "./StationaryTable";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { postReq, updateReq } from "../redux/actions/formActions"



const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const validationSchema = Yup.object({
  name: Yup.string().required("*Enter your Name!"),
  email: Yup.string().email("*Invalid email address").required("*Enter your Email!"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "*Invalid Phone Number!")
    .required("*Enter you PhoneNumber!"),
  address: Yup.string().required("*Enter your address!"),
});

const FieldLevelValidationExample = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({  //intialvalues form and table
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    date: getTodayDate(),
    cosmetics: [],
    stationary: [],
    grandTotalCosmetics: 0,
    grandTotalStationary: 0,
  });
  const state = useSelector((state) => state.formReducer);


  useEffect(() => {
    if (state.obj) {
      setFormValues({
        //form and table all correclty bind to list page and  intialvalues change or empty  
        id: state.obj?.id,
        name: state.obj.name || "",
        email: state.obj.email || "",
        phoneNumber: state.obj.phoneNumber || "",
        address: state.obj.address || "",
        date: state.obj.date || getTodayDate(),
        cosmetics: state.obj.cosmetics || [],
        stationary: state.obj.stationary || [],
        grandTotalCosmetics: state.obj.grandTotalCosmetics || 0,
        grandTotalStationary: state.obj.grandTotalStationary || 0,
      });

      if (state.obj.cosmetics && state.obj.cosmetics.length > 0) {
        setProducts(state.obj.cosmetics.map((item, index) => ({
          id: index + 1,
          selectedProductId: item.productId,
          quantity: item.quantity,
          totalAmount: item.totalAmount,
        })));
        setShowTable(true);
      }

      if (state.obj.stationary && state.obj.stationary.length > 0) {
        setProductsSec(state.obj.stationary.map((item, index) => ({
          id: index + 1,
          selectedProductIdSec: item.productId,
          quantity: item.quantity,
          totalAmount: item.totalAmount,
        })));
        setShowTableSec(true);
      }
    }
  }, [state.obj]);


  const handleSubmit = (values) => {
    const isCosmeticsTableFilled = products.every((product) => product.selectedProductId); 
    const isStationaryTableFilled = productsSec.every((productSec) => productSec.selectedProductIdSec);

    if (!isCosmeticsTableFilled && !isStationaryTableFilled) {
      toast.error("Please fill in all products and quantities.");
      return;
    }


    const grandTotalCosmetics = grandTotal;    // product details all listpage bind (code)cosmetic and stationary
    const grandTotalStationary = grandTotalSec;
    const discountCosmetics = (grandTotalCosmetics * 10) / 100;
    const discountStationary = (grandTotalStationary * 5) / 100;
    const gstCosmetics = ((grandTotalCosmetics - discountCosmetics) * 2) / 100;
    const gstStationary = ((grandTotalStationary - discountStationary) * 2) / 100;


    const cosmeticsData = products.map(({ selectedProductId, quantity, totalAmount }) => {
      const selectedProduct = availableCosmeticsProducts.find((p) => p.id === selectedProductId);
      return {
        productId: selectedProductId,
        productName: selectedProduct?.name,
        amount: selectedProduct?.amount,
        quantity,
        totalAmount
      };
    });


    const stationaryData = productsSec.map(({ selectedProductIdSec, quantity, totalAmount }) => {
      const selectedProductSec = availableStationaryProducts.find((p) => p.id === selectedProductIdSec);
      return {
        productId: selectedProductIdSec,
        productName: selectedProductSec?.name,
        amount: selectedProductSec?.amount,
        quantity,
        totalAmount
      };
    });

    const formData = {  // this formdata are list page all values patch single name show 
      ...values,
      cosmetics: cosmeticsData,
      stationary: stationaryData,
      grandTotalCosmetics,
      grandTotalStationary,
      discountCosmetics,
      discountStationary,
      gstCosmetics,
      gstStationary
    };


    console.log(formData);


    if (state.obj?.id) {     
      dispatch(updateReq(formData));
      toast.success("Form updated successfully!")
    } else {   
      dispatch(postReq(formData));
      toast.success("Form submitted successfully!");
    }

    setTimeout(() => {
      navigate('/list');
    }, 1000);
  };

  const [activeTab, setActiveTab] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      selectedProductId: null,
      quantity: 1,
      totalAmount: 0,
    },]);
  const [grandTotal, setGrandTotal] = useState(0);
  const gstPercentage = 12;
  const discountPercentage = 10;

  const [showTableSec, setShowTableSec] = useState(false);
  const [productsSec, setProductsSec] = useState([
    {
      id: 1,
      selectedProductIdSec: null,
      quantity: 1,
      totalAmount: 0,
    },
  ]);

  const [grandTotalSec, setGrandTotalSec] = useState(0);
  const gstPercentageSec = 12;
  const discountPercentageSec = 10;


  const availableCosmeticsProducts = [
    { id: 1, name: "Lipstick ", amount: 500 },
    { id: 2, name: "Foundation ", amount: 800 },
    { id: 3, name: "Kajal (Eyeliner)", amount: 150 },
    { id: 4, name: "Mascara ", amount: 400 },
    { id: 5, name: "Blush ", amount: 359 },
    { id: 6, name: "Compact Powder ", amount: 300 },
    { id: 7, name: "Eyeshadow Palette", amount: 600 },
    { id: 8, name: "Nail Polish (5 Pack)", amount: 100 },
    { id: 9, name: "Lip Balm", amount: 100 },
    { id: 10, name: "Eyebrow Pencil ", amount: 199 },
    // { id: 11, name: "Makeup Remover", amount: 250 },
    // { id: 12, name: "BB Cream ", amount: 450 },
    // { id: 13, name: "Primer ", amount: 500 },
    // { id: 14, name: "Concealer", amount: 400 },
    // { id: 15, name: "Highlighter", amount: 600 },
  ];

  const availableStationaryProducts = [
    { id: 1, name: "Notebook", amount: 100 },
    { id: 2, name: "Pen", amount: 30 },
    { id: 3, name: "Pencil", amount: 10 },
    { id: 4, name: "Eraser ", amount: 5 },
    { id: 5, name: "Sharpener ", amount: 10 },
    { id: 6, name: "Ruler ", amount: 20 },
    { id: 7, name: "Highlighter ", amount: 25 },
    { id: 8, name: "Sticky Notes ", amount: 50 },
    { id: 9, name: "Paper Clips (Pack)", amount: 15 },
    { id: 10, name: "Glue Stick ", amount: 40 },
    // { id: 11, name: "Stapler", amount: 150 },
    // { id: 12, name: "Binde", amount: 120 },
    // { id: 13, name: "Folder", amount: 30 },
    // { id: 14, name: "Calculator ", amount: 500 },
    // { id: 15, name: "Scissors  ", amount: 80 },
  ];

  const calculateGrandTotal = (products) => {
    const totalAmount = products.reduce(
      (sum, product) => sum + product.totalAmount, 0);
    const discount = (totalAmount * discountPercentage) / 100;
    const gst = ((totalAmount - discount) * gstPercentage) / 100;
    const finalTotal = totalAmount - discount + gst;
    setGrandTotal(finalTotal);
  };

  const calculateGrandTotalSec = (productsSec) => {
    const totalAmount = productsSec.reduce(
      (sumSec, productSec) => sumSec + productSec.totalAmount, 0);
    const discountSec = (totalAmount * discountPercentageSec) / 100;
    const gstSec = ((totalAmount - discountSec) * gstPercentageSec) / 100;
    const finalTotalSec = totalAmount - discountSec + gstSec;
    setGrandTotalSec(finalTotalSec);
  };

  const removeProduct = (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== id
      );
      calculateGrandTotal(updatedProducts);
      return updatedProducts;
    });
  };

  const removeProductSec = (id) => {
    setProductsSec((prevProductsSec) => {
      const updatedProductsSec = prevProductsSec.filter(
        (productSec) => productSec.id !== id
      );
      calculateGrandTotalSec(updatedProductsSec);
      return updatedProductsSec;
    });
  };

  const handleQuantityChange = (id, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const selectedProduct = availableCosmeticsProducts.find(
          (p) => p.id === product.selectedProductId
        );
        return product.id === id
          ? {
            ...product,
            quantity,
            totalAmount: selectedProduct ? selectedProduct.amount * quantity : 0,
          }
          : product;
      })
    );
  };

  const handleProductChange = (id, productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const selectedProduct = availableCosmeticsProducts.find(
          (p) => p.id === productId
        );
        return product.id === id
          ? {
            ...product,
            selectedProductId: productId,
            totalAmount: selectedProduct ? product.quantity * selectedProduct.amount : 0,
          }
          : product;
      })
    );
  };


  const handleQuantityChangeSec = (id, quantity) => {
    setProductsSec((prevProductsSec) =>
      prevProductsSec.map((productSec) =>
        productSec.id === id
          ? {
            ...productSec,
            quantity,
            totalAmount: productSec.selectedProductIdSec
              ? availableStationaryProducts.find(
                (p) => p.id === productSec.selectedProductIdSec
              ).amount * quantity
              : 0,
          }
          : productSec
      )
    );
  };


  const handleProductChangeSec = (id, productIdSec) => {
    setProductsSec((prevProductsSec) =>
      prevProductsSec.map((productSec) =>
        productSec.id === id
          ? {
            ...productSec,
            selectedProductIdSec: productIdSec,
            totalAmount:
              productSec.quantity *
              availableStationaryProducts.find((p) => p.id === productIdSec).amount,
          }
          : productSec
      )
    );
  };

  // const handleShowTable = (e) => {
  //   e.preventDefault();   
  //   setShowTable(true);
  //   calculateGrandTotal(products);
  // };

  useEffect(() => {
    calculateGrandTotal(products);
  }, [products]);

  // const handleShowTableSec = (e) => {
  //   e.preventDefault();
  //   setShowTableSec(true);
  //   calculateGrandTotalSec(productsSec);
  // };

  useEffect(() => {
    calculateGrandTotalSec(productsSec);
  }, [productsSec]);

  const selectTab = (e, tabName) => {
    e.preventDefault();
    setActiveTab(tabName);
    if (tabName === "stationaryTable") {
      setShowTableSec(true);
      setShowTable(false);
    } else if (tabName === "cosmeticsTable") {
      setShowTable(true);
      setShowTableSec(false);
    }
  };

  return (
    <div className="container-fluid  "  >
      <ToastContainer />
      <h1 className="text-center ">Personal Information</h1>

      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >

        {() => (
          <Form className="form w-75 mx-auto d-block   ">
            <div className="card">
              <div className="row  ">
                <div className="col-6  ">
                  <label htmlFor="name">Name:</label>
                  <Field name="name" type="text" className="form-control " id="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                <div className="col-6">
                  <label htmlFor="email">E-mail:</label>
                  <Field name="email" type="email" className="form-control" id="email" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <Field
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"

                  />
                </div>

                <div className="col-6">
                  <label htmlFor="date">Date:</label>
                  <Field name="date" type="date" id="date" className="form-control" readOnly />
                  <ErrorMessage name="date" component="div" className="error" />
                </div>
              </div>

              <div className="row ">
                <div className="col-6 mx-auto d-block  ">
                  <label htmlFor="address">Address:</label>
                  <Field name="address" id="address" type="text" className="form-control " />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
            </div>

            <Nav activeTab={activeTab} selectTab={selectTab} />

            {activeTab === "stationaryTable" && (
              <>
                {/* <div>
                  <button className=" formButton d-block mx-auto" onClick={handleShowTableSec}>
                    Add  Stationary
                  </button>
                </div> */}
                {showTableSec && (
                  <table className="table table-striped mt-3">
                    <thead>
                      <tr>
                        <th>Sl. NO</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      <StationaryTable
                        productsSec={productsSec}
                        availableProductsSec={availableStationaryProducts}
                        handleProductChangeSec={handleProductChangeSec}
                        handleQuantityChangeSec={handleQuantityChangeSec}
                        removeProductSec={removeProductSec}
                      />
                    </tbody>
                  </table>
                )}


                {showTableSec && (

                  <div className="mt-3">
                    <div className="GrandTotal p-3 d-block mx-auto">
                      <p className="mr-3">Discount: {discountPercentageSec}%</p>
                      <p className="mr-3">GST: {gstPercentageSec}%</p>
                      <p>Grand Total: {grandTotalSec.toFixed(2)}</p>
                    </div>
                  </div>

                )}
              </>
            )}

            {activeTab === "cosmeticsTable" && (
              <div>
                {/* <button className=" formButton d-block mx-auto" onClick={handleShowTable}>
                  Add  Cosmetics
                </button> */}
                <table className="table table-striped mt-3">
                  <thead>
                    <tr>
                      <th>Sl. NO</th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Total Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  {showTable && (
                    <tbody>
                      <CosmeticsTable
                        products={products}
                        availableProducts={availableCosmeticsProducts}
                        handleProductChange={handleProductChange}
                        handleQuantityChange={handleQuantityChange}
                        removeProduct={removeProduct}
                      />
                    </tbody>
                  )}
                </table>
                {showTable && (

                  <div className="mt-3">
                    <div className="GrandTotal p-3 d-block mx-auto">
                      <p className="mr-3">Discount: {discountPercentage}%</p>
                      <p className="mr-3">GST: {gstPercentage}%</p>
                      <p>Grand Total: {grandTotal.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <button type="submit" className=" formButton mt-3 mb-5 mx-auto d-block">
              {state.obj ? "Update" : "Submit"} Form

            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FieldLevelValidationExample;
