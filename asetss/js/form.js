
const form = document.getElementById("userForm");
const firstname = document.getElementById("firstName");
const lastname = document.getElementById("lastName");
const email = document.getElementById("email");
const job = document.getElementById("job");
const phone = document.getElementById("phone");
const gender = document.getElementById("gender");
const addUser = document.getElementById("addUserBtn");
const showAllUsers = document.getElementById("showAllUsersBtn");
const findUserByEmail = document.getElementById("findUserByEmailBtn");
const allUsersEmployed = document.getElementById("allUsersEmployedBtn");
const hasMaleUser = document.getElementById("hasMaleUserBtn");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("Information-box");


let people = [];


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newperson = {
    name: firstname.value.trim(),
    lastname: lastname.value.trim(),
    email: email.value.trim(),
    job: job.value.trim(),
    phone: phone.value.trim(),
    gender: gender.value,
  }

  if (!newperson.name || !newperson.lastname || !newperson.email) {
    alert("لطفا تمام فیلد های الزامی را پر کنید");
    return;
  }
  people.push(newperson)
  form.reset();
  alert("کاربر با موفقیت اضافه شد!");
});


showAllUsers.addEventListener("click", () => {
  modalContent.innerHTML = "";

  if (people.length === 0) {
    modalContent.innerHTML = `<h3>هنوز کاربری ثبت نشده است</h3>`
  } else {
    modalContent.innerHTML = `<h3>لیست کاربران</h3>`;

    const list = document.createElement("ol");

    people.forEach((Rayan, index) => {
      const { name, lastname, email, job, phone, gender } = Rayan;

      const li = document.createElement("li");

      li.innerText = `${index + 1}. ${name} ${lastname}
      ایمیل : ${email}
      شغل : ${job || "---"}
      شماره تماس : ${phone || "---"}
      جنسیت : ${gender || "---"}`;

      list.appendChild(li);
    })

    modalContent.appendChild(list);
  }
  modal.style.display = "block";


});

findUserByEmail.addEventListener("click", () => {
  modalContent.innerHTML = "";
  modalContent.innerHTML = `<h3>ایمیل خود را جستجو کنید...</h3>`;


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

  SearchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailToFind = SearchFormIput.value.trim();

    if (!emailToFind) {
      modalContent.innerHTML = `<h3>لطفاً ایمیل وارد کنید!</h3>`;
      modal.style.display = "block";
      return;
    }

    const person = people.find(p => p.email === emailToFind);

    modalContent.innerHTML = "";

    if (person) {
      modalContent.innerHTML = `<h3>کاربر یافت شد</h3>`;

      const list = document.createElement("ol");

      const li = document.createElement("li");
      li.innerHTML = `۱. ${person.name} ${person.lastname}
                      ایمیل: ${person.email}
                      شغل: ${person.job || "---"}
                      شماره تماس: ${person.phone || "---"}
                      جنسیت: ${person.gender || "---"}`;

      list.appendChild(li);
      modalContent.appendChild(list);
    } else {

      modalContent.innerHTML = `<h3>کاربری با این ایمیل یافت نشد</h3>`;
    }
  })

  modal.style.display = "block";
});


modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});