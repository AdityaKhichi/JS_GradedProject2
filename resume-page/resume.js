//master data
let userData = { resume: [] };
//temp data
let allResumes = userData.resume;
let resume_index = 0;
let searchInput = "";

//fetch data as json object and save to global variable
fetch("../resources/Data (1).json")
  .then((response) => response.json())
  .then((respData) => {
    userData = respData;
    allResumes = userData.resume;
    handleEvents();
    displayInfo();
  })
  .catch((error) => {
    console.log(error);
  });

function displayInfo() {
  const currentResume = allResumes[resume_index];

  //if its first resume then hide prev button
  if (resume_index == 0) {
    document.getElementById("prev-btn").style.visibility = "hidden";
  }

  const employeeName = document.getElementById("name");
  employeeName.innerText = currentResume.basics.name;

  const appliedFor = document.getElementById("appliedFor");
  appliedFor.innerText = currentResume.basics.AppliedFor;

  const personalInfo = document.getElementById("personal-info");
  personalInfo.innerHTML = `
        <h2>Personal Information</h2>
        <p>${currentResume.basics.phone}</p>
        <p>${currentResume.basics.email}</p>
        <a href=${currentResume.basics.profiles.url} style='display: flex;
        justify-content: flex-end;'>${currentResume.basics.profiles.network}</p>`;

  const techSkills = document.getElementById("tech-skill");
  techSkills.innerHTML = `<div>${currentResume.skills.keywords.map(
    (keyword) => {
      return `<p>${keyword}</p>`;
    }
  )}</div>`.replaceAll(",", "");

  const hobbies = document.getElementById("hobby1");
  hobbies.innerHTML = `<div>${currentResume.interests.hobbies.map((hobby) => {
    return `<p>${hobby}</p>`;
  })}</div>`.replaceAll(",", "");

  const workExp = document.getElementById("work-exp");
  workExp.innerHTML = `
        <h2>Work Experience in previous Company</h2>
        <p><b>Company Name:</b> ${currentResume.work["Company Name"]}</p>
        <p><b>Positon:</b> ${currentResume.work.Position}</p>
        <p><b>Start date:</b> ${currentResume.work["Start Date"]}</p>
        <p><b>End Date:</b> ${currentResume.work["End Date"]}</p>
        <p><b>Summary:</b> ${currentResume.work.Summary}</p>`;

  const projects = document.getElementById("projects");
  projects.innerHTML = `
        <h2>Projects</h2>
        <p><b>${currentResume.projects.name}</b>: ${currentResume.projects.description}</p>`;

  const education = document.getElementById("education");
  education.innerHTML = `
        <h2>Education</h2>
        <ul>
        <li><b>UG</b>: ${currentResume.education.UG.institute},${currentResume.education.UG.course},${currentResume.education.UG["Start Date"]},${currentResume.education.UG["End Date"]},${currentResume.education.UG.cgpa}</li>
        <li><b>PU</b>: ${currentResume.education["Senior Secondary"].institute},${currentResume.education["Senior Secondary"].cgpa}</li>
        <li><b>HS</b>: ${currentResume.education["High School"].institute},${currentResume.education["High School"].cgpa}</li>
        </ul>`;

  const internship = document.getElementById("internship");
  internship.innerHTML = `
        <h2>Internship</h2>
        <ul>
        <li><b>Company Name</b>: ${currentResume.Internship["Company Name"]}</li>
        <li><b>Position</b>: ${currentResume.Internship.Position}</li>
        <li><b>Start date</b>: ${currentResume.Internship["Start Date"]}</li>
        <li><b>End date</b>: ${currentResume.Internship["End Date"]}</li>
        <li><b>Summary</b>: ${currentResume.Internship.Summary}</li>
        </ul>`;

  const achievement = document.getElementById("achievements");
  achievement.innerHTML = `<ul>${currentResume.achievements.Summary.map(
    (achievement) => `<li>${achievement}</li>`
  )}</ul>`.replaceAll(",", "");
}

function toggleButtons() {
  if (resume_index == allResumes.length - 1) {
    document.getElementById("next-btn").style.visibility = "hidden";
  } else {
    document.getElementById("next-btn").style.visibility = "visible";
  }
  if (resume_index == 0) {
    document.getElementById("prev-btn").style.visibility = "hidden";
  } else {
    document.getElementById("prev-btn").style.visibility = "visible";
  }
}

function nextResume() {
  resume_index += 1;
  toggleButtons();
  displayInfo();
}

function prevResume() {
  resume_index -= 1;
  toggleButtons();
  displayInfo();
}

function setQuery(e) {
  searchInput = e.target.value;

  //includes() will rtrn true if input and the data string
  //matches in a 'particuler resume object' which will then
  //get pushed in a new arr by filter().
  if (searchInput.length > 0) {
    allResumes = userData.resume.filter((resume) =>
      resume.basics.AppliedFor.toLowerCase().includes(searchInput.toLowerCase())
    );
  } else {
    allResumes = userData.resume;
  }
  filterSearch();
}

function filterSearch() {
  //reset default resume view to start from 0 again;
  resume_index = 0;
  document.getElementById("noResult-container").style.display = "none";
  document.getElementById("resume-container").style.display = "block";

  //our temp arr might be updated with objects which include
  //input keyword if not we will still update display
  //with default resumes
  if (allResumes.length > 0) {
    toggleButtons();
    displayInfo();
  }

  //show invalid input message and image if
  //no match found for input keyword
  if (searchInput.length != 0 && allResumes.length == 0) {
    document.getElementById("noResult-container").style.display = "flex";
    document.getElementById("resume-container").style.display = "none";
  }
}

function handleEvents() {
  document.getElementById("next-btn").addEventListener("click", nextResume);
  document.getElementById("prev-btn").addEventListener("click", prevResume);
  document.querySelector(".search-box").addEventListener("input", setQuery);
}
