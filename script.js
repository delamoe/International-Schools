function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  
    // Toggle between solid sun and regular moon icons
    const icon = document.getElementById("darkModeToggle").firstElementChild;
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.replace("far", "fas");
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("darkMode", "enabled"); // Save dark mode state
    } else {
      icon.classList.replace("fas", "far");
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("darkMode", "disabled"); // Save light mode state
    }
  }
  
  let schoolsData = {};
  
  // Fetch the JSON file and populate dropdowns and table
  fetch("schools.json")
    .then((response) => response.json())
    .then((data) => {
      schoolsData = data;
      populateDropdowns();
      updateTable();
    });
  
  // Initialize dark mode on page load
  document.addEventListener("DOMContentLoaded", () => {
    const darkModeEnabled = localStorage.getItem("darkMode") === "enabled";
    if (darkModeEnabled) {
      document.body.classList.add("dark-mode");
      document.getElementById("darkModeToggle").innerHTML = "<i class='fas fa-sun'></i>";
    }
  });
  
  // Populate dropdowns with school names and recall saved selections
  function populateDropdowns() {
    const schoolNames = Object.keys(schoolsData);
    const dropdowns = [
      document.getElementById("school1"),
      document.getElementById("school2"),
      document.getElementById("school3"),
      document.getElementById("school4"),
      document.getElementById("school5"),
    ];
  
    dropdowns.forEach((dropdown, index) => {
      dropdown.innerHTML = ""; // Clear existing options
      schoolNames.forEach((school) => {
        const option = document.createElement("option");
        option.value = school;
        option.textContent = school;
        dropdown.appendChild(option);
      });
  
      // Load saved selection from local storage if available
      const savedSelection = localStorage.getItem(`selectedSchool${index + 1}`);
      if (savedSelection && schoolNames.includes(savedSelection)) {
        dropdown.value = savedSelection;
      } else {
        dropdown.selectedIndex = index;
      }
    });
    updateDropdowns(); // Refresh dropdowns on load
  }
  
  // Save selected schools to local storage and update dropdown options
  function updateDropdowns() {
    const selectedSchools = Array.from(
      document.querySelectorAll("select")
    ).map((select) => select.value);
    const dropdowns = document.querySelectorAll("select");
  
    dropdowns.forEach((dropdown, index) => {
      const currentSelection = dropdown.value;
      dropdown.innerHTML = ""; // Clear the dropdown
      Object.keys(schoolsData).forEach((school) => {
        if (!selectedSchools.includes(school) || school === currentSelection) {
          const option = document.createElement("option");
          option.value = school;
          option.textContent = school;
          if (school === currentSelection) {
            option.selected = true;
          }
          dropdown.appendChild(option);
        }
      });
  
      // Save the selection to local storage
      localStorage.setItem(`selectedSchool${index + 1}`, currentSelection);
    });
  
    updateTable(); // Refresh the table with current selections
  }
  
  // Update the table based on selected schools
  function updateTable() {
    const selectedSchools = [
      document.getElementById("school1").value,
      document.getElementById("school2").value,
      document.getElementById("school3").value,
      document.getElementById("school4").value,
      document.getElementById("school5").value,
    ];
  
    const criteria = Object.keys(schoolsData[selectedSchools[0]]);
    const tableBody = document.getElementById("comparison-table");
    tableBody.innerHTML = ""; // Clear the table body
  
    criteria.forEach((criterion) => {
      const row = document.createElement("tr");
  
      const criterionCell = document.createElement("td");
      criterionCell.textContent = criterion;
      row.appendChild(criterionCell);
  
      selectedSchools.forEach((school) => {
        const schoolCell = document.createElement("td");
        schoolCell.textContent =
          schoolsData[school][criterion] || "incomplete data";
        row.appendChild(schoolCell);
      });
  
      tableBody.appendChild(row);
    });
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  
  