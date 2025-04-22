# Key Changes and Updates

This document summarizes the key changes and updates made to the JavaScript code for the user profile project.

## 1. Initial Setup and Global Variables

- Defined global variables for API URL, users array, users per page, current page number, and loading state.

## 2. Displaying Users

- Implemented `displayUsers()` function to fetch and display users based on pagination.
- Added a loader to indicate loading state while fetching data.
- Dynamically generated user cards with details like image, name, and company.

## 3. Fetching API Data

- Implemented `fetchAPIData()` function to fetch data from the API endpoint.
- Handled loading state before and after fetching data.

## 4. Creating Pagination Controls

- Implemented `createPagination()` function to generate pagination controls dynamically.
- Added "Previous" and "Next" buttons with event listeners to navigate between pages.
- Disabled "Previous" button on the first page and "Next" button on the last page.

## 5. Updating Active Page

- Implemented `updateActivePage()` function to highlight the active page number in the pagination controls.

## 6. Initializing the App

- Implemented `init()` function to initialize the app based on the current page.
- Used a `switch` statement to handle different pages and call the appropriate functions.

## 7. Displaying User Details

- Implemented `displayUserDetails()` function to fetch and display details of a single user on a separate page.
- Extracted user ID from the URL query parameters.
- Dynamically populated user details in the profile page.

## 8. Bug Fixes and Enhancements

- Fixed an issue where the loader was not appearing correctly.
- Fixed an issue where the last batch of users was not being displayed under the pagination.
- Fixed an issue where the "Next" button was not being disabled on the last page.
- Consolidated code into a single `script.js` file.
- Handled cases where there are no users to display.

## 9. URL Structure

- Updated the URL structure to pass the user ID as a query parameter instead of appending it to the URL path.

## 10. Code Improvements

- Added error handling to the `fetchAPIData()` and `displayUserDetails()` functions.
- Used template literals to dynamically generate HTML.
- Added comments to explain the code.

This document provides a comprehensive overview of the changes and updates made to the code. It can be used as a reference for creating a blog post or for understanding the codebase.

# Functionality of Each Function

This document describes the functionality of each function in the `script.js` file.

## 1. `displayUsers(page = 1)`

- **Purpose:** Fetches and displays users based on the specified page number.
- **Parameters:**
  - `page` (optional): The page number to display (default is 1).
- **Functionality:**
  - Calculates the start and end indices for the users to display on the current page.
  - Slices the `global.users` array to get the users for the current page.
  - Clears the previous content in the `userShowcase` element.
  - Displays a loader while data is loading.
  - Iterates through the users for the current page and dynamically generates user cards with details like image, name, and company.
  - Appends the user cards to the `userShowcase` element.

## 2. `displayUserDetails()`

- **Purpose:** Fetches and displays details of a single user on the profile page.
- **Parameters:** None
- **Functionality:**
  - Extracts the user ID from the URL query parameters.
  - Fetches the user details from the API using the extracted ID.
  - Dynamically populates the user details in the `profile__aside` element, including image, name, and other information.

## 3. `fetchAPIData(endpoint)`

- **Purpose:** Fetches data from the specified API endpoint.
- **Parameters:**
  - `endpoint`: The API endpoint to fetch data from.
- **Functionality:**
  - Constructs the full API URL using the `global.api.apiURL` and the provided `endpoint`.
  - Fetches data from the API using the `fetch` function.
  - Parses the response as JSON.
  - Stores the fetched users in the `global.users` array.
  - Handles loading state before and after fetching data.

## 4. `createPagination()`

- **Purpose:** Creates pagination controls dynamically.
- **Parameters:** None
- **Functionality:**
  - Calculates the total number of pages based on the `global.users` array length and the `global.usersPerPage` value.
  - Clears the existing pagination controls.
  - Creates "Previous" and "Next" buttons with event listeners to navigate between pages.
  - Disables the "Previous" button on the first page and the "Next" button on the last page.
  - Dynamically generates page number links and adds them to the pagination controls.

## 5. `updateActivePage()`

- **Purpose:** Updates the active page in the pagination controls.
- **Parameters:** None
- **Functionality:**
  - Selects all the page number links in the pagination controls.
  - Iterates through the page number links and adds the "active" class to the link corresponding to the current page number.
  - Removes the "active" class from all other page number links.

## 6. `init()`

- **Purpose:** Initializes the app based on the current page.
- **Parameters:** None
- **Functionality:**
  - Gets the current page from the `window.location.pathname`.
  - Uses a `switch` statement to handle different pages and call the appropriate functions.
  - For the `/team.html` page, it fetches the users, displays them, and creates the pagination controls.
  - For the `/profile.html` page, it displays the user details.

This document provides a detailed explanation of the functionality of each function in the `script.js` file.
