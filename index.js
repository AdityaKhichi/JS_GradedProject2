//Manual Local Storage of Credentials
const Data = [
  {
    username: "john",
    password: "johnpass",
  },
  {
    username: "sam",
    password: "sampass",
  },
  {
    username: "mike",
    password: "mikepass",
  },
];
localStorage.setItem("Data", JSON.stringify(Data));

function validate() {
  let userData = JSON.parse(localStorage.getItem("Data"));
  let userArr = [];
  for (let i in userData) {
    userArr.push(userData[i]);
  }

  let inputUser = document.getElementById("u-name").value;
  let inputPass = document.getElementById("pass").value;

  let userFound = userArr.find((item) => item.username == inputUser);
  console.log("🚀 ~ file: index.js:33 ~ validate ~ userFound", userFound);
  if (userFound !== undefined) {
    if (userFound.password == inputPass) {
      //we use replace instead of assign so that the current
      //page will not be saved in session History,
      //thus user won't be able to use the back button
      //to navigate to it.
      window.location.replace("./resume-page/resume.html");
    } else {
      alert("Invalid Password");
    }
  } else {
    alert("Invalid Username");
  }
}

addEvents();
function addEvents() {
  document.querySelector(".login-btn").addEventListener("click", validate);
}
