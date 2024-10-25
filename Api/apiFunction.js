// Define the base URL as a constant
const BASE_URL = 'http://3.83.131.119:3000';

// Function for POST request
async function postData(path, data = {}) {
  const url = `${BASE_URL}${path}`; // Combine base URL with the provided path

  try {
    console.log(`Fetching URL: ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Convert data to JSON string
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Await the JSON response here
      console.error("Error:", JSON.stringify(errorResponse, null, 2));
      alert(`Error: ${errorResponse.message}`); // Assuming 'message' is in the response body
      return false; // Throw an error to handle in catch block
    }

    const result = await response.json(); // Parse JSON response
    return result;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
}

// Function for GET request
async function getData(path) {
  const url = `${BASE_URL}${path}`; // Combine base URL with the provided path
  const token = localStorage.getItem('access_token');
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Await the JSON response here
      console.error("Error:", JSON.stringify(errorResponse, null, 2));
      alert(`Error: ${errorResponse.message}`); // Assuming 'message' is in the response body
      return false; // Throw an error to handle in catch block
    }

    const result = await response.json(); // Parse JSON response
    return result;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
}
async function postDatabyToken(path, data = {}) {
  const url = `${BASE_URL}${path}`; // Combine base URL with the provided path
  const token = localStorage.getItem('access_token');
  console.log("data: ", data); // Logging data properly

  const formData = new FormData();
  formData.append('title', data?.title);
  formData.append('publishingYear', data?.year);
  formData.append('image', data?.image); // Ensure this is a File object

  try {
    console.log(`Fetching URL: ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Include Authorization header
        // 'Content-Type': 'application/json', // Remove this line
      },
      body: formData, // Pass the FormData object
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Await the JSON response here
      console.error("Error:", JSON.stringify(errorResponse, null, 2));
      alert(`Error: ${errorResponse.message}`); // Assuming 'message' is in the response body
      return false; // Handle the error
    }

    const result = await response.json(); // Parse JSON response
    return result;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
}


async function patchData(path, data = {}) {
  const url = `${BASE_URL}${path}`; // Combine base URL with the provided path
  const token = localStorage.getItem('access_token');
  const formData = new FormData();
  formData.append('title', data?.title);
  formData.append('publishingYear', data?.year);
  formData.append('image', data?.image); // Ensure this is a File object
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // Convert data to JSON string
    });

    if (!response.ok) {
      const errorResponse = await response.json(); // Await the JSON response here
      console.error("Error:", JSON.stringify(errorResponse, null, 2));
      alert(`Error: ${errorResponse.message}`); // Assuming 'message' is in the response body
      return false; // Handle the error
    }

    const result = await response.json(); // Parse JSON response
    return result;
  } catch (error) {
    console.error('Error in PATCH request:', error);
    throw error;
  }
}

export { postData, getData, patchData, postDatabyToken };
