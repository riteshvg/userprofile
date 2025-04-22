const global = {
  currentPage: window.location.pathname,
  api: {
    apiURL: 'https://dummyjson.com/',
  },
  users: [], // stores all users
  usersPerPage: 8, // sets a limit of 8 users per page
  currentPageNum: 1, //starts with index of 1
  isLoading: false, //Add a loading state
};

//Async function to fetch and display all users
async function displayUsers(page = 1) {
  global.currentPageNum = page;
  const start = (page - 1) * global.usersPerPage;
  const end = start + global.usersPerPage;
  const paginatedUsers = global.users.slice(start, end);

  const userShowcase = document.querySelector('#userShowcase');
  const loader = document.querySelector('#loader');
  userShowcase.innerHTML = ''; // clears previous content

  //Show the loader if data is still laoding
  if (global.isLoading && loader) {
    loader.display = 'block'; //show the loader
  } else {
    loaderdisplay = 'none'; //hide the loader
  }

  paginatedUsers.forEach((user) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="col-sm-3">
          <div class="team__item">
            <div class="team__img">
              <img src="${user.image}" alt="${user.firstName}" />
            </div>
            <a href = "profile.html?id=${user.id}">
            <h4 class="team__name">${user.firstName}</h4>
            <h4 class="team__name">${user.lastName}</h4>
            </a>
            <p class="team__desc">
              ${user.company.title}
            </p>
          </div>
        </div>
      
    `;
    userShowcase.appendChild(div);
  });
}

function updateButtonHref(userId, buttonElement) {
  const aTag = buttonElement.querySelector('a');
  if (aTag) {
    let href = aTag.getAttribute('href');
    const baseUrl = aTag.href.split('#')[0];
    const hasExistingParams = baseUrl.includes('?');
    const idParam = `id=${userId}`;
    aTag.href = hasExistingParams
      ? `${baseUrl}&${idParam}`
      : `${baseUrl}?${idParam}`;
  }
}

//Async function to fetch and display profile one one user
async function displayUserDetails() {
  const API_URL = global.api.apiURL;
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');

  try {
    const response = await fetch(`${API_URL}users/${userId}`);
    const userDetails = await response.json();

    const userSideProfile = document.querySelector('.profile__aside');
    userSideProfile.innerHTML = `
    <div class="profile__aside">
            <div class="profile__img">
              <img
                src="${userDetails.image}"
                class="img-responsive"
                alt="..."
              />
            </div>
            <h4 class="profile__name">${userDetails.firstName} ${userDetails.lastName}</h4>
            <h5 class="profile__name">${userDetails.address.state}</h5>
            <hr />
          </div>
  
    `;

    // Populate personal details
    const personalDetails = document.querySelector('#personalDetails');
    personalDetails.innerHTML = `
        <div class="row">
              <div class="col-sm-12">
                <h1 class="block-header alt">
                  <i class="fa fa-home"></i> | <span>${userDetails.firstName}'s Personal Details</span>
                </h1>
              </div>
              <div class="feature__item">
                  <div class="feature__icon">
                    
                  </div>
            </div>

        <div class="row">
          <div class="col-sm-12">
            <div id = "personalTable">
            <table class="table table-bordered">
            <tbody>
              <tr>
                <td><b>Full Name</b></td>
                <td>${userDetails.firstName} ${userDetails.maidenName} ${userDetails.lastName}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>${userDetails.username}</td>
              </tr>
              <tr>
                <td>Password</td>
                <td>${userDetails.password}</td>
              </tr>
              <tr>
                <td>DOB</td>
                <td>${userDetails.birthDate}</td>
              </tr>
              <tr>
                <td>SSN</td>
                <td>${userDetails.ssn}</td>
              </tr>
              <tr>
                <td>EIN</td>
                <td>${userDetails.ein}</td>
              </tr>
              <tr>
                <td>University</td>
                <td>${userDetails.university}</td>
              </tr>
              
              <tr>
                <td>Bank Card</td>
                <td>${userDetails.bank.cardType}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>${userDetails.height} cms</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>${userDetails.weight} kgs</td>
              </tr>
              <tr>
                <td>Hair Color</td>
                <td>${userDetails.hair.color} - ${userDetails.hair.type}</td>
              </tr>
              <tr>
                <td>Eye Color</td>
                <td>${userDetails.eyeColor}</td>
              </tr>
              <tr>
                <td>Blood Group</td>
                <td>${userDetails.bloodGroup}</td>
              </tr>
            </tbody>
            </table>
            </div>
          </div>
          </div>
    `;

    //Populate corporate details
    const companyDetails = document.querySelector('#companyDetails');
    companyDetails.innerHTML = `
      <p>Company: ${userDetails.company.name}</p>
      <p>Title: </p>
    `;

    //Populate blog details
    const blogDetails = document.querySelector('#blogDetails');
    blogDetails.innerHTML = `
      <p>Blog Title: ${blogDetails[0].title}</p>
      
    `;

    //Populate todo details
    const todosDetails = document.querySelector('#todoDetails');
    todosDetails.innerHTML = `
      <p>Todos</p>
    `;

    //Get all buttons
    const personalProfileButton = document.querySelector(
      '#personalProfileButton'
    );
    const companyProfileButton = document.querySelector(
      '#companyProfileButton'
    );
    const blogButton = document.querySelector('#blogDetailsButton');
    const todoButton = document.querySelector('#todoDetailsButton');

    //Get all sections
    const personalProfileSection = document.querySelector(
      '#personalProfileSection'
    );
    const companyProfileSection = document.querySelector(
      '#companyProfileSection'
    );
    const blogSection = document.querySelector('#blogSection');
    const todoSection = document.querySelector('#todoSection');

    //Function to hide all sections
    function hideAllSections() {
      personalProfileSection.style.display = 'none';
      companyProfileSection.style.display = 'none';
      blogSection.style.display = 'none';
      todoSection.style.display = 'none';
    }

    //Function to deactivate all buttons
    function deactivateAllButtons() {
      personalProfileButton.classList.remove('active');
      companyProfileButton.classList.remove('active');
      blogButton.classList.remove('active');
      todoButton.classList.remove('active');
    }

    //Add event listeners to the buttons
    personalProfileButton.addEventListener('click', () => {
      hideAllSections();
      deactivateAllButtons();
      personalProfileSection.style.display = 'block';
      personalProfileButton.classList.add('active');
    });

    companyProfileButton.addEventListener('click', () => {
      hideAllSections();
      deactivateAllButtons();
      companyProfileSection.style.display = 'block';
      companyProfileButton.classList.add('active');
    });

    blogButton.addEventListener('click', () => {
      hideAllSections();
      deactivateAllButtons();
      blogSection.style.display = 'block';
      blogButton.classList.add('active');
    });

    todoButton.addEventListener('click', () => {
      hideAllSections();
      deactivateAllButtons();
      todoSection.style.display = 'block';
      todoButton.classList.add('active');
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}

//Async function to display user blog posts
/**
 *
 * @param {userId} endpoint
 * @returns posts
 * Endpoint: 'https://dummyjson.com/users/{userId}/posts'
 */

async function displayUserPosts(userId) {
  const API_URL = global.api.apiURL;
  const urlParams1 = new URLSearchParams(window.location.search);
  const userId1 = urlParams1.get('id');

  try {
    const response = await fetch(`${API_URL}users/${userId1}/posts`);
    const blogDetails = await response.json();
    console.log(blogDetails.posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }
}

//Async function to display user todos
/**
 *
 * @param {todos} endpoint
 * @returns todos
 * Endpoint: 'https://dummyjson.com/users/{userId}/todos'
 */

async function displayUserTodos(userId) {
  const API_URL = global.api.apiURL;
  const urlParams2 = new URLSearchParams(window.location.search);
  const userId2 = urlParams2.get('id');

  try {
    const response = await fetch(`${API_URL}users/${userId2}/todos`);
    const todoDetails = await response.json();
    console.log(todoDetails.todos);
  } catch (error) {
    console.error('Error fetching user todos:', error);
  }
}

//Async function to fetch API data from the endpoint
async function fetchAPIData(endpoint) {
  const API_URL = global.api.apiURL;
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    const data = await response.json();
    global.users = data.users; //Store all users in global array
    console.log(data);
    return data;
  } finally {
    global.isLoading = false; //set loading to false after fetching
  }
}

//Function to create pagination controls
function createPagination() {
  const totalPages = Math.ceil(global.users.length / global.usersPerPage);
  const pagination = document.querySelector('#pagination ul');

  pagination.innerHTML = ''; //clear existing pagination

  //Previous PageLink
  const prevLi = document.createElement('li');
  prevLi.innerHTML = '<a href = "#"><i class = "fa fa-angle-left"></i></a>';
  prevLi.addEventListener('click', () => {
    if (global.currentPageNum > 1) {
      displayUsers(global.currentPageNum - 1);
      updateActivePage();
    }
  });
  pagination.appendChild(prevLi);

  //Disable "Previous" button on the first page
  if (global.currentPageNum === 1) {
    prevLi.classList.add('disabled');
  }

  //Page Number Links
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.innerText = i;
    li.appendChild(a);

    li.addEventListener('click', () => {
      displayUsers(i);
      updateActivePage();
    });
    pagination.appendChild(li);
  }

  //Next Page Link
  const nextLi = document.createElement('li');
  nextLi.innerHTML = '<a href = "#"><i class = "fa fa-angle-right"></i></a>';
  nextLi.addEventListener('click', () => {
    if (global.currentPageNum < totalPages) {
      displayUsers(global.currentPageNum + 1);
      updateActivePage();
    }
  });
  pagination.appendChild(nextLi);

  //Disable "Next" button on the last page
  if (totalPages === 0 || global.currentPageNum === totalPages) {
    nextLi.classList.add('disabled');
  }

  updateActivePage(); //Set active page on initial load
}

//Function to update the active page in pagination
function updateActivePage() {
  const pagination = document.querySelector('#pagination ul');
  const pageLinks = pagination.querySelectorAll('li');

  pageLinks.forEach((li, index) => {
    if (index === global.currentPageNum) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });
}

// Function to initialize the app
async function init() {
  const loader = document.querySelector('#loader'); // Get the loader element

  switch (global.currentPage) {
    case '/team.html':
      // Check if the loader element exists
      if (loader) {
        loader.style.display = 'block'; // Show the loader initially
        try {
          await fetchAPIData('users'); // Fetch and store all users
          displayUsers(); // Display initial page
          createPagination(); // Create pagination controls
        } finally {
          loader.style.display = 'none'; // Hide the loader after everything is done
        }
      } else {
        console.error('Loader element not found');
      }
      break;
    case '/profile.html':
      displayUserDetails();
      displayUserPosts();
      displayUserTodos();
      break;
    // Add more cases for other pages as needed
    default:
      console.log('Page not handled:', global.currentPage);
      break;
  }
}
document.addEventListener('DOMContentLoaded', init);
