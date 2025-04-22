/**
 * Global Configuration
 */
const global = {
  currentPage: window.location.pathname,
  api: {
    apiURL: 'https://dummyjson.com/',
  },
  users: [], // stores all users
  usersPerPage: 8, // sets a limit of 8 users per page
  currentPageNum: 1, //starts with index of 1
  isLoading: false, //Add a loading state
  API_URL: 'https://dummyjson.com/',
  urlParams: new URLSearchParams(window.location.search),
  userId: new URLSearchParams(window.location.search).get('id'),
};

const { API_URL, urlParams, userId } = global;

/**
 * Utility Functions
 * These functions will be accessible to other local functions
 * @param {endpoint} endpoint
 * @returns data
 * Endpoint: 'https://dummyjson.com/{endpoint}'
 */

//Async function fetch API data
async function fetchAPIData(endpoint) {
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

/**
 * DOM Management Functions: hideAllSections() and deactivateAllButtons()
 */

//This function hides all sections

function hideAllSections() {
  const sections = {
    personalProfile: document.querySelector('#personalProfileSection'),
    companyProfile: document.querySelector('#companyProfileSection'),
    blog: document.querySelector('#blogSection'),
    todos: document.querySelector('#todoSection'),
  };

  Object.values(sections).forEach((section) => {
    if (section) section.style.display = 'none';
  });
}

function deactivateAllButtons() {
  const buttons = {
    personalProfile: document.querySelector('#personalProfileButton'),
    companyProfile: document.querySelector('#companyProfileButton'),
    blog: document.querySelector('#blogDetailsButton'),
    todos: document.querySelector('#todoDetailsButton'),
  };

  Object.values(buttons).forEach((button) => {
    if (button) button.classList.remove('active');
  });
}

/**
 * Data fetching functions
 * displayUsers()
 * displayUserDetails()
 * displayUserPosts()
 * displayUserTodos()
 * displayPostsComments()
 */

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

//Async function to display single user details
async function displayUserDetails() {
  const API_URL = global.api.apiURL;
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');

  try {
    const response = await fetch(`${API_URL}users/${userId}`);
    const userDetails = await response.json();
    updateUserProfile(userDetails);
    updatePersonalDetails(userDetails);
    updateCompanyDetails(userDetails);
  } catch (error) {
    console.error('Error fetching user details: ', error);
  }
}

//Async function to display single user blog posts
async function displayUserPosts(userId) {
  if (!userId) return;
  try {
    const response = await fetch(`${API_URL}users/${userId}/posts`);
    const blogData = await response.json();
    updateBlogDetails(blogData);
  } catch (error) {
    console.error('Error fetching user posts: ', error);
  }
}

//Async function to display post comments
async function displayPostsComments(postId) {
  console.log(`Fetching comments for post ID: ${postId}`);
  if (!postId) {
    console.warn('Post ID is missing!');
    return [];
  }
  try {
    const response = await fetch(`${API_URL}comments/post/${postId}`);
    const commentData = await response.json();
    return commentData.comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

//Async function to display single user todos
async function displayUserTodos() {
  if (!userId) return;
  try {
    const response = await fetch(`${API_URL}users/${userId}/todos`);
    const todosData = await response.json();
    updateTodoDetails(todosData);
  } catch (error) {
    console.error('Error fetching user todos:', error);
  }
}

//Update UI Functions
/**
 *
 * updateUserProfile()
 * updatePersonalDetails()
 * updateCompanyDetails()
 * updateBlogDetails()
 * updatecommentDetails()
 * updateTodoDetails()
 */
function updateUserProfile(userDetails) {
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
}

function updatePersonalDetails(userDetails) {
  const personalDetails = document.querySelector('#personalDetails');

  //Show the loader if data is still laoding
  if (global.isLoading && loader) {
    loader.display = 'block'; //show the loader
  } else {
    loaderdisplay = 'none'; //hide the loader
  }

  personalDetails.innerHTML = `
      <div class="row">
            <div class="col-sm-12">
              <h1 class="block-header alt">
                <i class="fa fa-home"></i> | <span>${userDetails.firstName}'s Personal Profile</span>
              </h1>
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
}

function updateCompanyDetails(userDetails) {
  const companyDetails = document.querySelector('#companyDetails');
  //Show the loader if data is still laoding
  if (global.isLoading && loader) {
    loader.display = 'block'; //show the loader
  } else {
    loaderdisplay = 'none'; //hide the loader
  }
  companyDetails.innerHTML = `
      <div class="row">
            <div class="col-sm-12">
              <h1 class="block-header alt">
                <i class="fa fa-briefcase"></i> | <span>${userDetails.firstName}'s Work Profile</span>
              </h1>
            </div>
          </div>

      <div class="row">
        <div class="col-sm-12">
          <div id = "personalTable">
          <table class="table table-bordered">
          <tbody>
            <tr>
              <td><b>Company Name</b></td>
              <td>${userDetails.company.name}</td>
            </tr>
            <tr>
              <td>Department</td>
              <td>${userDetails.company.department}</td>
            </tr>
            <tr>
              <td>Title</td>
              <td>${userDetails.company.title}</td>
            </tr>
            <tr>
              <td>Company Address</td>
              <td>${userDetails.company.address.address}, ${userDetails.company.address.city}, ${userDetails.company.address.state}, ${userDetails.company.address.postalCode}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>${userDetails.role}</td>
            </tr>
            <tr>
              <td>Crypto Coin</td>
              <td>${userDetails.crypto.coin}</td>
            </tr>
            <tr>
              <td>Crypto Wallet</td>
              <td>${userDetails.crypto.wallet}</td>
            </tr>
            <tr>
              <td>Crypto Network</td>
              <td>${userDetails.crypto.network}</td>
            </tr>
            <tr>
              <td>Card Number</td>
              <td>${userDetails.bank.cardNumber}</td>
            </tr>
            <tr>
              <td>Card Currency</td>
              <td>${userDetails.bank.currency}</td>
            </tr>
            <tr>
              <td>Card Type</td>
              <td>${userDetails.bank.cardType}</td>
            </tr>
          </tbody>
          </table>
          </div>
        </div>
        </div>
  `;
}

function updateBlogDetails(blogData) {
  const blogDetails = document.querySelector('#blogDetails');

  //Show the loader if data is still laoding
  if (global.isLoading && loader) {
    loader.display = 'block'; //show the loader
  } else {
    loaderdisplay = 'none'; //hide the loader
  }

  let postsHTML = '';

  if (!blogData.posts || blogData.posts.length === 0) {
    blogDetails.innerHTML = `
    <div class="col-sm-12">
              <h1 class="block-header alt">
                <i class="fa fa-home"></i> | <span>${userDetails.firstName}'s Personal Profile</span>
              </h1>
            </div>
    <div class="card mb-3">
        <div class="card-body text-center text-muted">
          <i class="fa fa-newspaper-o fa-3x mb-3"></i>
          <h5>No Blog Posts Found</h5>
          <p>This user hasn't published any posts yet.</p>
        </div>
      </div>
    `;
    return;
  }

  blogData.posts.forEach((post) => {
    let commentsHTML = '';
    let tagsHTML = '';

    //Generate tags HTML using forEach
    post.tags.forEach((tag) => {
      tagsHTML += `<li><a href="#">${tag}</a></li>  `;
    });

    //Get comments for this post
    displayPostsComments(post.id).then((comments) => {
      console.log(`Comments recieve for post ${post.id}:`, comments);
      if (comments && comments.length > 0) {
        comments.forEach((comment) => {
          commentsHTML += `
          <div class="comments__item">
              <div class="comments-item__body">
                <div class="comments-item__info">
                  <div class="comments-item-info__author">${comment.user.username}</div>
                  <div class="comments-item-info__divider">
                    <i class="fa fa-circle"></i>
                  </div>
                  <div class="comments-item__likes">
                    <i class="fa fa-thumbs-up"></i> ${comment.likes}
                  </div>
                </div>
                <div class="comments-item__content">
                  ${comment.body}
                </div>
              </div>
            </div>

          `;
        });
      }

      //Update the comments section for this post
      const commentSection = document.querySelector(`#comments-${post.id}`);
      if (commentSection) {
        commentSection.innerHTML = commentsHTML || ' No comments yet';
      }
    });

    postsHTML += `
    <div class="blog__item">
            <div>
              <h2 class="block-header alt">
                  <span>${post.title}</span>
              </h2>
            </div> <!-- / .blog__header -->

            <div>
              <a href="blog-post.html">
              </a>
              <p>
                ${post.body}
              </p>
              <ul class="blog__tags">
              <li>${tagsHTML}</li>
              </ul>
            </div> <!-- / .blog__body -->
            <div class="blog__footer pull-right">
              <ul class="blog__info">
              <li>
                  <i class="fa fa-eye"></i> <a href="#">${post.views}</a>
                </li>
                <li>
                  <i class="fa fa-thumbs-up"></i> <a href="#">${post.reactions.likes}</a>
                </li>
                <li>
                  <i class="fa fa-thumbs-down"></i>${post.reactions.dislikes}</time>
                </li>
              </ul>
            </div>
            
            <div class = "comments-section">
            <h4 class = "block-header alt">Comments</h4>
            <div id ="comments-${post.id}"></div>
            </div>
          </div>
      <p>
    `;
  });
  blogDetails.innerHTML = `
   ${postsHTML}
  `;
}

function updateTodoDetails(todoData) {
  const todoDetails = document.querySelector('#todoDetails');
  //Show the loader if data is still laoding
  if (global.isLoading && loader) {
    loader.display = 'block'; //show the loader
  } else {
    loaderdisplay = 'none'; //hide the loader
  }

  let todosHTML = '';

  if (!todoData.todos || todoData.todos.length === 0) {
    todoDetails.innerHTML = `
    <div class = "card mb-3">
      <div class = "card-body text-center text-muted">
        <i class = "fa fa-check-square-o fa-3x mb-3"></i>
          <h5>All Caught Up!</h5>
          <p>No todos remaining for the user</p>
      </div>
    </div> 
    `;
    return;
  }

  todoData.todos.forEach((todo) => {
    todosHTML += `
    <div class="card mb-2">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled>
            <span class="${
              todo.completed ? 'text-muted text-decoration-line-through' : ''
            }">
              ${todo.todo}
            </span>
          </div>
          <span class="badge ${todo.completed ? 'bg-success' : 'bg-warning'}">
            ${todo.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
      </div>
    `;
  });
  todoDetails.innerHTML = `
  <h3 class = "block-header alt">Todo List</h3>
  <div class = "todos-container">
    ${todosHTML}
  </div>
  `;
}

//UI Update Functions
/**
 * updateButtonHref()
 * createPagination()
 * updateActivePage()
 */

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

/**
 * Event Handlers
 */

function attachEventListeners() {
  const buttons = {
    personalProfile: document.querySelector('#personalProfileButton'),
    companyProfile: document.querySelector('#companyProfileButton'),
    blog: document.querySelector('#blogDetailsButton'),
    todo: document.querySelector('#todoDetailsButton'),
  };

  buttons.personalProfile?.addEventListener('click', () => {
    hideAllSections();
    deactivateAllButtons();
    document.querySelector('#personalProfileSection').style.display = 'block';
    buttons.personalProfile.classList.add('active');
  });

  buttons.companyProfile?.addEventListener('click', () => {
    hideAllSections();
    deactivateAllButtons();
    document.querySelector('#companyProfileSection').style.display = 'block';
    buttons.companyProfile.classList.add('active');
  });

  buttons.blog?.addEventListener('click', () => {
    hideAllSections();
    deactivateAllButtons();
    document.querySelector('#blogSection').style.display = 'block';
    buttons.blog.classList.add('active');
    displayUserPosts(userId);
  });

  buttons.todo?.addEventListener('click', () => {
    hideAllSections();
    deactivateAllButtons();
    document.querySelector('#todoSection').style.display = 'block';
    buttons.todo.classList.add('active');
    displayUserTodos(userId);
  });
}

/**
 * Initalization
 */
// Function to initialize the app
async function init() {
  const loader = document.querySelector('#loader'); // Get the loader element

  switch (global.currentPage) {
    case '/index.html':
    case '/':
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
      hideAllSections();
      await displayUserDetails();
      document.querySelector('#personalProfileSection').style.display = 'block';
      attachEventListeners();
      break;
    // Add more cases for other pages as needed
    default:
      console.log('Page not handled:', global.currentPage);
      break;
  }
}
document.addEventListener('DOMContentLoaded', init);
