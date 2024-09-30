
import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteItem,  getAll, getItem, postItem, putItem, viewItem } from '../../mockApi';
import { DELETE_REQ,  GET_ALL_REQ, GET_ID_REQ, POST_REQ, UPDATE_REQ, VIEW_REQ } from '../types/types';
import { deleteFail, deleteSuc,  getAllFail, getAllSuc, getIdFail, getIdSuc, postFail, postSuc, updateFail, updateSuc, viewFal, viewSuc } from '../actions/formActions';

function* getApi() {

    const res = yield call(getAll)
    if (res.status === 200 || res.status === 201) {
        yield put(getAllSuc(res.data))
    } else {
        yield put(getAllFail("get failed"));
    }
}
function* postApi({ payload }) {

    const res = yield call(postItem, payload);
    console.log(res);

    if (res.status === 200 || res.status === 201) {
        yield put(postSuc(res.data));
    } else {
        yield put(postFail("Post request failed"));
    }

}


function* deleteApi(action) {
    try {
       
        const id = action.payload;
        console.log("Deleting ID:", id);
        const res = yield call(deleteItem, id);

        if (res.status === 200 || res.status === 204) {
            yield put(deleteSuc(id));  
        } else {
            yield put(deleteFail("Delete request failed"));
        }
    } catch (error) {
        yield put(deleteFail(error.message));
    }
}

function* getIdApi(action) {
    try {

        const res = yield call(getItem, action.payload);
        if (res.status === 200) {
            yield put(getIdSuc(res.data));
        } else {
            yield put(getIdFail("getId request failed"));
        }
    } catch (error) {
        yield put(getIdFail(error.message));
    }
}



function* updateApi({ payload }) {
    try {
    
        const res = yield call(putItem, payload, payload.id);
        console.log('Update response:', res);

        if (res.status === 200 || res.status === 201) {
            yield put(updateSuc(res.data));
        } else {
            yield put(updateFail("Update failed with status: " + res.status));
        }
    } catch (error) {
        yield put(updateFail(error.message));
    }
}



// function* fetchProductDetailsSaga(action) {
//     try {
//       const productDetails = yield call(fetchProductDetailsFromApi, action.payload);
//       yield put(fetchProductDetailsSuccess(productDetails));
//     } catch (error) {
//       yield put(fetchProductDetailsFailure(error.message));
//     }
//   }



function* viewApi(action) {
    try {
        const { id, viewData } = action.payload;
        console.log("ID being passed to viewItem:", id); 
  
        if (!id) {
            throw new Error("Invalid ID type");
        }
  
        
        const res = yield call(viewItem, id); 
  
        if (res.status === 200) {
      
            yield put(viewSuc({ ...res.data, ...viewData })); 
        } else {
            yield put(viewFal("Failed with status: " + res.status)); 
        }
    } catch (error) {
        yield put(viewFal(error.message)); 
    }
  }
  

function* StudentWatcherSaga() {
    yield takeLatest(GET_ALL_REQ, getApi);
    yield takeLatest(POST_REQ, postApi);
    yield takeLatest(DELETE_REQ, deleteApi);
    yield takeLatest(UPDATE_REQ, updateApi);
    yield takeLatest(GET_ID_REQ, getIdApi);
    yield takeLatest(VIEW_REQ, viewApi);

    // yield takeLatest(FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetailsSaga);
}
export default StudentWatcherSaga