const form = document.getElementById("employee-form");
const deptSelect = document.getElementById("departments");
const tableBody = document.getElementById("employee-table");

const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const editFirstName = document.getElementById("edit-firstName");
const editLastName = document.getElementById("edit-lastName");
const editDeptSelect = document.getElementById("edit-departments");

let editingEmployeeId = null;

async function loadDepartments() {
  const res = await fetch("/api/departments");
  const depts = await res.json();

  deptSelect.innerHTML = "";
  editDeptSelect.innerHTML = "";

  depts.forEach((d) => {
    const opt1 = document.createElement("option");
    opt1.value = d._id;
    opt1.textContent = d.name;
    deptSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = d._id;
    opt2.textContent = d.name;
    editDeptSelect.appendChild(opt2);
  });
}

async function loadEmployees() {
  tableBody.innerHTML = "";
  const res = await fetch("/api/employees");
  const employees = await res.json();

  employees.forEach((emp) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.firstName}</td>
      <td>${emp.lastName}</td>
      <td>${emp.departments.map((d) => d.name).join(", ")}</td>
      <td class='editDelB'>
        <button onclick="startEditEmployee('${emp._id}')" class='edit-btn'>Edit</button>
        <button onclick="deleteEmployee('${emp._id}')" class='delete-btn'>Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  if ($.fn.DataTable.isDataTable("#employeeFTable")) {
    $("#employeeFTable").DataTable().destroy();
  }

  $("#employeeFTable").DataTable({
    paging: true,
    searching: true,
    ordering: true,
    pageLength: 25,
    lengthMenu: [
      [10, 25, 50, 100],
      [10, 25, 50, 100],
    ],
    dom: "<'dt-top'lf>" + "rt" + "<'dt-bottom'ip>",
  });
}

async function startEditEmployee(id) {
  const res = await fetch(`/api/employees/${id}`);
  const emp = await res.json();

  editFirstName.value = emp.firstName;
  editLastName.value = emp.lastName;

  Array.from(editDeptSelect.options).forEach((opt) => {
    opt.selected = emp.departments.some((d) => d._id === opt.value);
  });

  editingEmployeeId = id;
  editModal.classList.remove("hidden");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selected = Array.from(deptSelect.selectedOptions).map((opt) => opt.value);

  await fetch("/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      departments: selected,
    }),
  });

  form.reset();
  await loadEmployees();
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selected = Array.from(editDeptSelect.selectedOptions).map((opt) => opt.value);

  await fetch(`/api/employees/${editingEmployeeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: editFirstName.value,
      lastName: editLastName.value,
      departments: selected,
    }),
  });

  editingEmployeeId = null;
  editModal.classList.add("hidden");
  await loadEmployees();
});

// async function deleteEmployee(id) {
//   await fetch(`/api/employees/${id}`, { method: "DELETE" });
//   if (editingEmployeeId === id) {
//     form.reset();
//     editingEmployeeId = null;
//     form.querySelector("button[type='submit']").textContent = "Add Employees";
//   }
//   await loadEmployees();
// }

async function deleteEmployee(id) {
  await fetch(`/api/employees/${id}`, { method: "DELETE" });

  if (editingEmployeeId === id) {
    editingEmployeeId = null;
    editModal.classList.add("hidden");
  }

  await loadEmployees();
}

document.getElementById("close-edit-modal").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editingEmployeeId = null;
});

loadDepartments();
loadEmployees();
