Key changes and explanations:

Global State: Added usersPerPage and currentPageNum to the global object to manage pagination state.
Storing All Users: The fetchAPIData function now stores all fetched users in the global.users array. This is crucial because you only want to fetch the users once.
displayUsers(page) Function:
Takes a page number as an argument.
Calculates the start and end indices for slicing the global.users array based on the current page and usersPerPage.
Slices the global.users array to get the users for the current page (paginatedUsers).
Clears the userShowcase element's content before adding the new users.
Loops through the paginatedUsers and creates/appends the user cards to the userShowcase.
createPagination() Function:
Calculates the totalPages based on the total number of users and usersPerPage.
Creates a button for each page.
Attaches an event listener to each button that calls displayUsers(i) when clicked, where i is the page number.
Appends the buttons to the #pagination element.
init() Function:
Now async to await fetchAPIData('users').
Calls createPagination() after fetching the users and displaying the initial page.
HTML: You'll need to add a <div id="pagination"></div> element to your HTML where you want the pagination controls to appear. Make sure this element exists.
How to use:

Include the JavaScript: Make sure this updated JavaScript code is in your script.js file.
Add the Pagination Container: Add <div id="pagination"></div> to your team.html file, where you want the pagination buttons to be displayed.
Load team.html: When team.html loads, the init() function will:
Fetch all users from the API.
Store them in global.users.
Display the first page of users.
Create the pagination buttons.
Clicking Pages: Clicking a pagination button will call displayUsers() with the corresponding page number, updating the displayed users.
This approach fetches the users only once and then uses JavaScript to handle the pagination on the client-side. This is generally more efficient than making a new API request for each page.

This is crucial. The JavaScript targets the ul element inside the #pagination div. Make sure this HTML is in your team.html file. I've updated the team.html file above.

createPagination() Function:

Now correctly targets the ul element within the #pagination div.
Dynamically creates the "Previous" and "Next" links, including the Font Awesome icons.
Adds event listeners to the "Previous" and "Next" links to handle page navigation. It checks to make sure you don't go below page 1 or above the last page.
Calls updateActivePage() after creating the pagination links and after each page change to highlight the current page.
updateActivePage() Function:

This new function is responsible for adding the active class to the correct page number link in the pagination. It removes the active class from all links and then adds it to the link corresponding to the global.currentPageNum.
Navigation Logic: The "Previous" and "Next" links now correctly decrement and increment the global.currentPageNum and call displayUsers() to update the displayed content.

Clearer Code: The code is refactored to be more readable and maintainable.

How to use:

Include the JavaScript: Make sure this updated JavaScript code is in your script.js file.
Add the Pagination HTML: Add the HTML snippet above (the one with <div id="pagination">) to your team.html file, where you want the pagination controls to be displayed. Make sure you have this exact HTML structure.
Load team.html: When team.html loads, the init() function will:
Fetch all users from the API.
Store them in global.users.
Display the first page of users.
Create the pagination controls.
Clicking Pages: Clicking a pagination button (number, "Prev", or "Next") will call displayUsers() with the corresponding page number, updating the displayed users and highlighting the active page.
This revised solution addresses the issues in your previous attempts and provides a fully functional pagination implementation using the HTML structure you specified. Make sure to double-check that your HTML matches the expected structure.
