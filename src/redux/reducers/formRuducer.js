import {
    GET_ALL_REQ,
    GET_ALL_SUC,
    GET_ALL_FAIL,
    POST_REQ,
    POST_SUC,
    POST_FAIL,
    DELETE_SUC,
    DELETE_REQ,
    DELETE_FAIL,
    UPDATE_REQ,
    UPDATE_SUC,
    UPDATE_FAIL,
    GET_ID_REQ,
    GET_ID_SUC,
    GET_ID_FAIL,
    SET_DELETE_STATUS,
    // FETCH_PRODUCT_DETAILS_FAILURE,
    // FETCH_PRODUCT_DETAILS_SUCCESS,
    // FETCH_PRODUCT_DETAILS_REQUEST,
    CLEAR_DATA,
    VIEW_REQ,
    VIEW_SUC,
    VIEW_FAL,
} from '../types/types'
const initialState = {
    formData: [],
    productData: [],
    loading: false,
    error: null,
    deleteStatus: null,
    viewData: null,
    obj: null,

}

const formReducer = (state = initialState, action) => {
    console.log(state, action);

    switch (action.type) {
        case GET_ALL_REQ:
            return {
                ...state,
            };
        case GET_ALL_SUC:
            return {
                ...state,
                formData: action.payload,
            };
        case GET_ALL_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case POST_REQ:
            return {
                ...state,
            };
        case POST_SUC:
            return {
                ...state,
                formData: [...state.formData, action.payload],

            };
        case POST_FAIL:
            return {
                ...state,
            };
        case DELETE_REQ:
            return {
                ...state,
                deleteStatus: null,
            };
        case DELETE_SUC:
            return {
                ...state,
                formData: state.formData.filter((item) => item.id !== action.payload),
                deleteStatus: 'success',
            };

        case DELETE_FAIL:
            return {
                ...state,
                deleteStatus: 'error',
            };

        case UPDATE_REQ:

            return {
                ...state,
                formData: Array.isArray(action.payload) ? action.payload : [action.payload],
            };
        case UPDATE_SUC:
            console.log('Payload:', action.payload);
            return {
                ...state,
                formData: Array.isArray(state.formData)
                    ? state.formData.map((item) =>
                        action.payload && action.payload.id && item.id === action.payload.id
                            ? { ...action.payload }
                            : item
                    )
                    : state.formData,
            };

        case UPDATE_FAIL:
            return {
                ...state,
                error: null,
            };
        case GET_ID_REQ:
            return {
                ...state,
                obj: null,
            };
        case GET_ID_SUC:
            return {
                ...state,
                obj: action.payload,

            };

        case GET_ID_FAIL:
            return {
                ...state,
                obj: null,
            };

        case SET_DELETE_STATUS:
            return {
                ...state,
                deleteStatus: action.payload,
            };

        // case FETCH_PRODUCT_DETAILS_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         error: null
        //     };

        // case FETCH_PRODUCT_DETAILS_SUCCESS:
        //     return {
        //         ...state,
        //         productData: action.payload,
        //     };

        // case FETCH_PRODUCT_DETAILS_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.payload
        //     };
        case CLEAR_DATA:
            return {
                initialState
            }

        case VIEW_REQ:
            return {
                ...state,
                error: null,
            }
        case VIEW_SUC:
            return {
                ...state,
                error: null,
                viewData: action.payload
            }
        case VIEW_FAL:
            return {
                ...state,
                error: action.payload,

            }




        default:
            return state;
    }
}

export default formReducer;
