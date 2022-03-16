/*Input Area and Rename, Delete or Add Button*/
const addTitle = document.querySelector("input#addTitle");
const addDesc = document.querySelector("input#addDesc");
const addBtn = document.querySelector("#addBtn");
const addTodo = document.querySelector("#addTodo");

/* Check LocalStorage and Add Item */
if (!localStorage.getItem("todo")) {
  let mkArray = new Array();
  localStorage.setItem("todo", JSON.stringify(mkArray));
}

/* Loop Through LocalStorage */
let majedTodo = () => {
  //Table Body Emty First
  addTodo.innerHTML = "";

  let currentItems = JSON.parse(localStorage.getItem("todo"));
  // Add HTML Items
  let serial = 1;
  currentItems.forEach((value, index) => {
    addTodo.innerHTML += `<tr id="trSingleTodo" data-itemid="${index}">
            <td>${serial}</td>
            <td>${value.title}</td>
            <td>${value.desc}</td>
            <td>
                <button id="editBtn" class="btn btn-editBtn">Edit</button>
                <button id="dltBtn" class="btn btn-dltBtn">Delete</button>
            </td>
        </tr>`;
    serial++;
  });
  DeleteTodo();

  // Emty Todo Meassage
  if (currentItems.length === 0) {
    document.querySelector("table thead").setAttribute("style", "display:none");
    document.querySelector("#removeMsg").innerHTML = "There is no 'Todo'";
  } else {
    document.querySelector("#removeMsg").innerHTML = "";
    document.querySelector("table thead").removeAttribute("style");
  }
};
majedTodo();

// Add Button Area
const addTodoBtn = () => {
  addBtn.addEventListener("click", function () {
    let todoTitle = addTitle.value.trim();
    let todoDesc = addDesc.value.trim();

    let newAddTodo = {
      title: todoTitle,
      desc: todoDesc,
    };

    //Get Current Items
    let currentTodos = JSON.parse(localStorage.getItem("todo"));
    currentTodos.push(newAddTodo);

    //Set Item Again
    localStorage.clear();
    localStorage.setItem("todo", JSON.stringify(currentTodos));

    //Emty input Boxes
    addTitle.value = "";
    addDesc.value = "";

    //Loop Table Again
    majedTodo();
    editBtnTodo();
  });
};

// Delete Button Section
function DeleteTodo() {
  const singleTodo = document.querySelectorAll("#trSingleTodo");

  singleTodo.forEach((todo) => {
    todo.querySelector("#dltBtn").addEventListener("click", function () {
      let currentItems = JSON.parse(localStorage.getItem("todo"));
      let clickIndex = Number(todo.getAttribute("data-itemid"));
      let removeClickTr = currentItems.filter((item, index) => {
        return index !== clickIndex;
      });

      //Clear The Local Storage
      localStorage.clear();
      localStorage.setItem("todo", JSON.stringify(removeClickTr));

      //Loop Table Again
      majedTodo();
      editBtnTodo();
    });
  });
}
DeleteTodo();

//Edit Button Section
function editBtnTodo() {
  const singleTodo = document.querySelectorAll("#trSingleTodo");

  singleTodo.forEach((todo) => {
    todo.querySelector("#editBtn").addEventListener("click", function () {
      let currentItems = JSON.parse(localStorage.getItem("todo"));
      let clickIndex = Number(todo.getAttribute("data-itemid"));

      document.querySelector("#editTitle").value = currentItems[clickIndex].title;
      document.querySelector("#editDesc").value = currentItems[clickIndex].desc;
      document.querySelector("#editForm").style.display = "block";
      document.querySelector("#arrayIndex").value = clickIndex;
    });
  });
}
editBtnTodo();
addTodoBtn();

// Cancel Button Area
document.querySelector("#cancelBtn").addEventListener("click", function () {
  document.querySelector("#editForm .titleEdit input").value = "";
  document.querySelector("#editForm .msgEdit textarea").value = "";
  document.querySelector("#editForm").style.display = "none";
});

// Update Button Area
function updateTodo() {
  document.querySelector("#updateBtn").addEventListener("click", function () {
    let currentItems = JSON.parse(localStorage.getItem("todo"));
    let editTitle = document.querySelector("#editTitle").value;
    let editDesc = document.querySelector("#editDesc").value;

    let objectEdit = {
      title: editTitle,
      desc: editDesc,
    };

    let updateIndex = Number(document.querySelector("#arrayIndex").value);
    currentItems[updateIndex] = objectEdit;

    localStorage.clear();
    localStorage.setItem("todo", JSON.stringify(currentItems));

    // Update then Clear title and Description
    document.querySelector("#editTitle").value = "";
    document.querySelector("#editDesc").value = "";
    document.querySelector("#editForm").style.display = "none";

    majedTodo();
    editBtnTodo();
  });
}
updateTodo();
