/**
 * User Management Application
 * Created by Rayan Abdi
 * GitHub: https://github.com/rayan-2006
 * 
 * This script handles a simple user registration form with modal-based display and search functionality.
 * Features:
 * - Add new users with basic validation
 * - Show all registered users in a modal
 * - Search for a user by email using a dynamic form inside modal
 */

const form = document.getElementById("userForm");
const firstname = document.getElementById("firstName");
const lastname = document.getElementById("lastName");
const email = document.getElementById("email");
const job = document.getElementById("job");
const phone = document.getElementById("phone");
const gender = document.getElementById("gender");
const addUser = document.getElementById("addUserBtn");
const showAllUsers = document.getElementById("showAllUsersBtn");
const findUserByNameBtn = document.getElementById("findUserByNameBtn");
const findUserByEmail = document.getElementById("findUserByEmailBtn");
const allUsersEmployed = document.getElementById("allUsersEmployedBtn");
const hasMaleUser = document.getElementById("hasMaleUserBtn");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("Information-box");

let people = [];

// Handle form submission to add a new user
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newperson = {
    name: firstname.value.trim(),
    lastname: lastname.value.trim(),
    email: email.value.trim(),
    job: job.value.trim(),
    phone: phone.value.trim(),
    gender: gender.value,
  };

  // Basic validation for required fields
  if (!newperson.name || !newperson.lastname || !newperson.email) {
    alert("لطفا تمام فیلد های الزامی را پر کنید");
    return;
  }

  people.push(newperson);
  form.reset();
  alert("کاربر با موفقیت اضافه شد!");
});

// Show all registered users in modal
showAllUsers.addEventListener("click", () => {
  modalContent.innerHTML = "";

  if (people.length === 0) {
    modalContent.innerHTML = `<h3>هنوز کاربری ثبت نشده است</h3>`;
  } else {
    modalContent.innerHTML = `<h3>لیست کاربران</h3>`;

    const list = document.createElement("ol");

    // Loop through all users and create list items
    people.forEach((Rayan, index) => {
      const { name, lastname, email, job, phone, gender } = Rayan;

      const li = document.createElement("li");

      li.innerText = `${index + 1}. ${name} ${lastname}
ایمیل : ${email}
شغل : ${job || "---"}
شماره تماس : ${phone || "---"}
جنسیت : ${gender || "---"}`;

      list.appendChild(li);
    });

    modalContent.appendChild(list);
  }

  modal.style.display = "block";
});

// Search user by email with dynamic form in modal
findUserByEmail.addEventListener("click", () => {
  modalContent.innerHTML = "";

  if (people.length === 0) {
    modalContent.innerHTML = `<h3>هنوز کاربری وارد نشده است</h3>`;
  } else {
    modalContent.innerHTML = `<h3>ایمیل خود را جستجو کنید...</h3>`;

    // Create search form dynamically
    const SearchForm = document.createElement("form");

    const SearchFormIput = document.createElement("input");
    SearchFormIput.type = "email";
    SearchFormIput.placeholder = "ایمیل رو اینجا وارد کن...";
    SearchFormIput.required = true;

    const SearchFormBTN = document.createElement("button");
    SearchFormBTN.innerText = `جستجو کنید`;
    SearchFormBTN.type = "submit";

    SearchForm.classList.add("SearchForm");
    SearchFormBTN.classList.add("SearchFormBTN");
    SearchFormIput.classList.add("SearchFormIput");

    SearchForm.appendChild(SearchFormIput);
    SearchForm.appendChild(SearchFormBTN);

    modalContent.appendChild(SearchForm);

    // Handle form submission for search
    SearchForm.addEventListener("submit", e => {
      e.preventDefault();
      const emailToFind = SearchFormIput.value.trim();

      const list = document.createElement("ol");

      // Search for matching user(s)
      people.forEach((Rayan, index) => {
        const person = people.find(Rayan => Rayan.email === emailToFind.trim());
        modalContent.innerHTML = "";

        const li = document.createElement("li");
        if (person) {
          modalContent.innerHTML = `<h3>کاربر یافت شد</h3>`;

          li.innerText = `${index + 1} . ${person.name} ${person.lastname}
ایمیل: ${person.email}
شغل: ${person.job || "---"}
شماره تماس: ${person.phone || "---"}
جنسیت: ${person.gender || "---"}`;

          list.appendChild(li);
          modalContent.appendChild(list);
        } else {
          modalContent.innerHTML = `<h3>کاربری با این ایمیل یافت نشد</h3>`;
        }
      });
    });
  }

  modal.style.display = "block";
});

//Search user by name with dynamic form in modal
findUserByNameBtn.addEventListener("click", () => {
  modalContent.innerHTML = "";

  if (people.length === 0) {
    modalContent.innerHTML = `<h3>هنوز کاربری وارد نشده است</h3>`;
  } else {
    modalContent.innerHTML = `<h3>نام کاربر مورد نظر را وارد کنید</h3>`;

    // Create search form dynamically
    const SearchForm = document.createElement("form");

    const SearchFormIput = document.createElement("input");
    SearchFormIput.type = "text";
    SearchFormIput.placeholder = "نام کاربر خود را وارد کنید ...";
    SearchFormIput.required = true;

    const SearchFormBTN = document.createElement("button");
    SearchFormBTN.innerText = "جستجو کنید... ";
    SearchFormBTN.type = "submit";

    SearchForm.classList.add("SearchForm");
    SearchFormBTN.classList.add("SearchFormBTN");
    SearchFormIput.classList.add("SearchFormIput");

    SearchForm.appendChild(SearchFormIput);
    SearchForm.appendChild(SearchFormBTN);

    modalContent.appendChild(SearchForm);

    // Handle form submission for search

    SearchForm.addEventListener("submit", e => {
      e.preventDefault();
      const UserNameToFind = SearchFormIput.value.trim();

      const list = document.createElement("ol");

      // Search for matching user(s)
      const person = people.filter(rayan => rayan.name === UserNameToFind.trim());

      if (person.length > 0) {
        modalContent.innerHTML = "";
        modalContent.innerHTML = `<h3>کاربر یافت شد</h3>`;

        person.forEach((rayan, index) => {

          const { name, lastname, email, job, phone, gender } = rayan;

          const li = document.createElement("li");

          li.innerText = `${index + 1} . ${name} ${lastname}
ایمیل : ${email}
شغل : ${job || "---"}
شماره تماس : ${phone || "---"}
جنسیت : ${gender || "---"}`;
          list.appendChild(li);
          modalContent.appendChild(list);
        })
      } else if (people.length === 0) {
        modalContent.innerHTML = `<h3>کاربری با این نام پیدا نشد</h3>`;
      }
    })

  }
  modal.style.display = "block"
});

// Close modal when clicking outside content area
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});