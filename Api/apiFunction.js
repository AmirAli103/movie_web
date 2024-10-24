// Define the base URL as a constant
const BASE_URL = 'http://192.168.2.22:3001';

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
      throw new Error(`Error: ${response.status}`);
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

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json(); // Parse JSON response
    return result;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
}

// Function for PATCH request
async function patchData(path, data = {}) {
  const url = `${BASE_URL}${path}`; // Combine base URL with the provided path

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Convert data to JSON string
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json(); // Parse JSON response
    return result;
  } catch (error) {
    console.error('Error in PATCH request:', error);
    throw error;
  }
}

export { postData, getData, patchData };
