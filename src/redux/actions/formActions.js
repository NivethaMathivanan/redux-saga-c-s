
import * as type from '../types/types'

export const getAllReq = () => {
  return {
    type: type.GET_ALL_REQ,
  }
}

export const getAllSuc = (data) => {

  return {
    type: type.GET_ALL_SUC,
    payload: data,
  }
}
export const getAllFail = (err) => {

  return {
    type: type.GET_ALL_FAIL,
    payload: err,
  }
}

export const getIdReq = (id) => {
  // console.log(id);
  return {
    type: type.GET_ID_REQ,
    payload: id
  }
}

export const getIdSuc = (data) => {
  return {
    type: type.GET_ID_SUC,
    payload: data
  }
}

export const getIdFail = (err) => {
  return {
    type: type.GET_ID_FAIL,
    payload: err
  }
}
export const postReq = (data) => {
  // console.log(data);
  return {
    type: type.POST_REQ,
    payload: data
  }
}
export const postSuc = (data) => {
  return {
    type: type.POST_SUC,
    payload: data
  }
}
export const postFail = (err) => {
  return {
    type: type.POST_FAIL,
    payload: err
  }
}
export const deleteReq = (id) => ({
  type: type.DELETE_REQ,
  payload: id,
});
export const deleteSuc = (id) => {
  // console.log(id);
  return {
    type: type.DELETE_SUC,
    payload: id

  };
}
export const deleteFail = (err) => {
  return {
    type: type.DELETE_FAIL,
    payload: err
  }
}
export const updateReq = (data) => {
  return {
    type: type.UPDATE_REQ,
    payload: data,
  }
}

export const updateSuc = (id,data) => {
  return {
    type: type.UPDATE_SUC,
    payload: data,
    id:id,
  }
}

export const updateFail = (err) => {
  return {
    type: type.UPDATE_FAIL,
    payload: err
  }
}



export const setDeleteStatus = (status) => ({
  type: type.SET_DELETE_STATUS,
  payload: status,
});


// export const fetchProductDetailsRequest = (formId) => ({
//   type: type.FETCH_PRODUCT_DETAILS_REQUEST,
//   payload: formId,
// });

// export const fetchProductDetailsSuccess = (productDetails) => ({
//   type: type.FETCH_PRODUCT_DETAILS_SUCCESS,
//   payload: productDetails,
// });

// export const fetchProductDetailsFailure = (error) => ({
//   type: type.FETCH_PRODUCT_DETAILS_FAILURE,
//   payload: error,
// });

export const clearData=()=>({
  type:type.CLEAR_DATA
})


export const viewReq=(payload)=>({
  type:type.VIEW_REQ,
  payload,
})
export const viewSuc=(viewData)=>({
  type:type.VIEW_SUC,
  payload:viewData
})
export const viewFal=(err)=>({
  type:type.VIEW_FAL,
  payload:err
})
