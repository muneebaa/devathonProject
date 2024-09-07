import axios from "axios";
import { getAccessToken } from "../utils/localStorage";

export const BASE_URL = "https://1t8sjf3k-5000.inc1.devtunnels.ms/test";

axios.defaults.baseURL = BASE_URL;

export const postAPIWithoutAuth = async (url, body) => {
  try {
    RemoveApiHeader();
    const res = await axios.post(url, body);
    return {
      data: res.data,
      status: res.status,
      success: true,
      headers: res.headers,
    };
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    return {
      data: err.response?.data || "Server Error",
      success: false,
    };
  }
};

export const postAPIWithAuth = async (url, body, headers) => {
  try {
    await setApiHeader();
    let res = {};
    if (headers) {
      res = await axios.post(url, body, { headers });
    } else {
      res = await axios.post(url, body);
    }
    return { data: res.data, status: res.status, success: true };
  } catch (err) {
    console.log(err, "err");
    return { data: err.response.data, success: false };
  }
};

export const putAPIWithAuth = async (url, body) => {
  try {
    await setApiHeader();
    const res = await axios.put(url, body);
    return { data: res.data, status: res.status, success: true };
  } catch (err) {
    console.log(err, "err");
    return { data: err.response.data, success: false };
  }
};

export const getApiWithAuth = async (url) => {
  try {
    await setApiHeader();
    const res = await axios.get(url);
    return { data: res?.data, status: res.status, success: true };
  } catch (err) {
    return { data: err?.response?.data, success: false };
  }
};

export const patchApiWithAuth = async (url, body) => {
  try {
    await setApiHeader();
    const res = await axios.patch(url, body);
    return { data: res.data, status: res.status, success: true };
  } catch (err) {
    return { data: err.response.data, success: false };
  }
};

export const deleteApi = async (url) => {
  try {
    await setApiHeader();
    const res = await axios.delete(url);
    return { data: res.data, status: res.status, success: true };
  } catch (err) {
    return { data: err.response.data, success: false };
  }
};

const setApiHeader = async () => {
  axios.defaults.headers.common.Authorization = await getAccessToken();
};

const RemoveApiHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const postFormDataWithAuth = async (url, body, isImage) => {
  try {
    await setApiHeader();

    const headers = {
      accept: "application/json",
      "content-type": "multipart/form-data",
    };

    const formData = new FormData();

    // if (isImage) {
    //   // Append text fields to FormData
    //   formData.append('work_type', body.work_type);
    //   formData.append('description', body.description);
    //   formData.append('title', body.title);
    // }

    // Dynamically append all key-value pairs from the body to FormData
    Object.keys(body).forEach((key) => {
      if (key !== "photos" && key !== "videos") {
        formData.append(key, body[key]);
      }
    });

    if (isImage) {
      body.photos.forEach((file, index) => {
        formData.append("photos[]", {
          uri: file,
          name: `file_${index}.jpg`, // Adjust the filename as needed
          type: "image/jpeg", // Adjust the MIME type according to your file type
        });
      });
    } else {
      // Handle other types of files, e.g., videos
      body.videos.forEach((file, index) => {
        formData.append("videos[]", {
          uri: file,
          name: `video_${index}.mp4`, // Adjust the filename as needed
          type: "video/mp4", // Adjust the MIME type according to your file type
        });
      });
    }

    const response = await axios.post(url, formData, {
      headers,
    });
    return {
      data: response.data,
      success: true,
    };
  } catch (error) {
    console.log(error, "er");

    return {
      success: false,
      message: error?.response?.data || error?.error,
    };
  }
};

// export const BASE_URL = "https://api-dev.thepicmeapp.com/api/v1/";

// // Remove Authorization Header (if needed)
// const RemoveApiHeader = () => {
//   localStorage.removeItem("Authorization");
// };

// // Set Authorization Header
// const setApiHeader = async () => {
//   const token = await getAccessToken();
//   localStorage.setItem("Authorization", token);
// };

// export const postAPIWithoutAuth = async (url, body) => {
//   RemoveApiHeader(); // Clear auth if needed

//   try {
//     const response = await fetch(`${BASE_URL}${url}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();
//     return {
//       data,
//       status: response.status,
//       success: response.ok,
//     };
//   } catch (err) {
//     console.log("Error:", err.message);
//     return { data: "Server Error", success: false };
//   }
// };

// export const postAPIWithAuth = async (url, body, headers = {}) => {
//   await setApiHeader();

//   try {
//     const response = await fetch(`${BASE_URL}${url}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: localStorage.getItem("Authorization"),
//         ...headers,
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();
//     return {
//       data,
//       status: response.status,
//       success: response.ok,
//     };
//   } catch (err) {
//     console.error("Error:", err.message);
//     return { data: "Server Error", success: false };
//   }
// };

// export const putAPIWithAuth = async (url, body) => {
//   await setApiHeader();

//   try {
//     const response = await fetch(`${BASE_URL}${url}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: localStorage.getItem("Authorization"),
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();
//     return {
//       data,
//       status: response.status,
//       success: response.ok,
//     };
//   } catch (err) {
//     console.error("Error:", err.message);
//     return { data: "Server Error", success: false };
//   }
// };

// export const getApiWithAuth = async (url) => {
//   await setApiHeader();

//   try {
//     const response = await fetch(`${BASE_URL}${url}`, {
//       method: "GET",
//       headers: {
//         Authorization: localStorage.getItem("Authorization"),
//       },
//     });

//     const data = await response.json();
//     return {
//       data,
//       status: response.status,
//       success: response.ok,
//     };
//   } catch (err) {
//     console.error("Error:", err.message);
//     return { data: "Server Error", success: false };
//   }
// };

// export const patchApiWithAuth = async (url, body) => {
//   await setApiHeader();

//   try {
//     const response = await fetch(`${BASE_URL}${url}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: localStorage.getItem("Authorization"),
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();
//     return {
//       data,
//       status: response.status,
//       success: response.ok,
//     };
//   } catch (err) {
//     console.error("Error:", err.message);
//     return { data: "Server Error", success: false };
//   }
// };

// export const deleteApi = async (url) => {
//   await setApiHeader();

//   try {
//     const response = await fetch(`${BASE_URL}${url}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: localStorage.getItem("Authorization"),
//       },
//     });

//     const data = await response.json();
//     return {
//       data,
//       status: response.status,
//       success: response.ok,
//     };
//   } catch (err) {
//     console.error("Error:", err.message);
//     return { data: "Server Error", success: false };
//   }
// };

// export const postFormDataWithAuth = async (url, body, isImage) => {
//   await setApiHeader();

//   try {
//     const formData = new FormData();

//     // Dynamically append key-value pairs except "photos" and "videos"
//     Object.keys(body).forEach((key) => {
//       if (key !== "photos" && key !== "videos") {
//         formData.append(key, body[key]);
//       }
//     });

//     if (isImage) {
//       body.photos.forEach((file, index) => {
//         formData.append("photos[]", {
//           uri: file,
//           name: `file_${index}.jpg`,
//           type: "image/jpeg",
//         });
//       });
//     } else {
//       body.videos.forEach((file, index) => {
//         formData.append("videos[]", {
//           uri: file,
//           name: `video_${index}.mp4`,
//           type: "video/mp4",
//         });
//       });
//     }

//     const response = await fetch(`${BASE_URL}${url}`, {
//       method: "POST",
//       headers: {
//         Authorization: localStorage.getItem("Authorization"),
//         accept: "application/json",
//       },
//       body: formData,
//     });

//     const data = await response.json();
//     return {
//       data,
//       success: response.ok,
//     };
//   } catch (error) {
//     console.error("Error:", error.message);
//     return {
//       success: false,
//       message: "Server Error",
//     };
//   }
// };
