
import axios from "axios";
export let apiURL = "https://66bb35c36a4ab5edd6379bb4.mockapi.io/sagatwo/"

export const getAll = async () => {
    const res = await axios({
        method: "GET",
        url: apiURL,
    })
    return res
}
export const getItem = async (id) => {
    console.log(id);
    const res = await axios({
        method: "GET",
        url: `${apiURL}${id}`,
    });
    return res;
}
export const postItem = async (data) => {
    const res = await axios({
        method: "POST",
        url: apiURL,
        data,
    });
    return res
}
export const putItem = async (data, id) => {
    console.log("ID for PUT request:", id);  
    const res = await axios({
        method: "PUT",
        url: `${apiURL}${id}`,  
        data,
    });
    return res;
};


export const deleteItem = async (id) => {
    const res = await axios({
        method: "DELETE",
        url: `${apiURL}${id}`,
    });
    return res;
}

export const viewItem =async(id)=>{
    if(typeof id!=="string"&&typeof id !=="number"){
        throw new Error("invalid id ")

    }
    const res =await axios.get(`${apiURL}${id}`)
    return res;
}


// export const fetchProductDetailsFromApi = async (formId) => {
//     const response = await fetch(`/api/products/${formId}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   };
  

