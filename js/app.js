document.addEventListener("DOMContentLoaded", function () {

    /*łapię button dodający zadanie*/
    var add = document.querySelector("#main-form-btn-add");

    /*dodać pętle po obiekcie local storage i wyświelać całą zawartość*/


    /*nadaję event na button dodający zadanie*/

        var tasks = [];
        var counter = 1;


        /*łapię listę do której będziemy dodawać li*/
        var taskList = document.querySelector(".main-tusks-list");

        function readLocalStorage() {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            // console.log(tasks);
            if (!tasks) {
                tasks = [];
            }
            for (var i = 0; i < tasks.length; i++) {
                createElement(tasks[i]);
            }

        }

        function createElement(taskObj) {

            console.log(taskObj);
            /*tworzę nowe li i poszczególne elementy*/
            /*obiekt li*/
            var newTaskLi = document.createElement("li");
            var newTaskBtnComplete = document.createElement("input");
            newTaskBtnComplete.setAttribute("type", "checkbox");
            var newTaskTitle = document.createElement("span");
            var newTaskDate = document.createElement("span");
            var newTaskPriority = document.createElement("span");
            var newTaskDescription = document.createElement("p");
            var newTaskDBtnDeleted = document.createElement("button");

            /*dodaję nowym elementom klasy, aby można je było łatwo stylować*/

            newTaskLi.classList.add("new-task-li");
            newTaskBtnComplete.classList.add("new-task-btn-completed");
            newTaskTitle.classList.add("new-task-title");
            newTaskDate.classList.add("new-task-date");
            newTaskPriority.classList.add("new-task-priority");
            newTaskDescription.classList.add("new-task-description");
            newTaskDBtnDeleted.classList.add("new-task-btn-deleted");

            /*dodaję teksty wewnętrzne do poszczególnych elentów*/
            newTaskTitle.innerText = taskObj.title;
            newTaskDate.innerText = taskObj.date;
            newTaskPriority.innerText = taskObj.priority;
            newTaskDescription.innerText = taskObj.description;
            newTaskDBtnDeleted.innerText = "deleted";

            newTaskLi.appendChild(newTaskBtnComplete);
            newTaskLi.appendChild(newTaskTitle);
            newTaskLi.appendChild(newTaskDate);
            newTaskLi.appendChild(newTaskPriority);
            newTaskLi.appendChild(newTaskDBtnDeleted);
            newTaskLi.appendChild(newTaskDescription);

            /*dodaję nowe li do listy zadań*/
            taskList.appendChild(newTaskLi);
            console.log(newTaskLi);
            // var counter = 1;
            // localStorage(counter, newTaskLi);
            // counter+=;
            /*dodać do local storage*/

            /*dodaję do buttona deleted event*/
            newTaskDBtnDeleted.addEventListener("click", function () {
                taskList.removeChild(newTaskLi);
                /*dodać removowe local storage*/
            });


        }

        readLocalStorage();


        /*nadaję event na button dodający zadanie*/
        add.addEventListener("click", function() {

            /*łapię wszystkie elementy*/
            var title = document.querySelector("#title");
            var date = document.querySelector("#date");
            var priority = document.querySelector("#priority");
            var description = document.querySelector("#description");


            /* walidacja danych */

            var errorMessage = document.querySelector(".error-message");
            var errorMessage2 = document.querySelector(".error-message2");
            var ul = document.createElement("ul");

            /*ustawiam flagę walidacji - do późniejszego wykorzystania*/
            var ok = true;

            // sprawdzenie tytulu (czy posiada więcej niż 1 i mniej niż 50 znaków)

            if (title.value.length === 0) {
                ok = false;
                var msg = document.createElement("li");
                msg.innerText = "Wprowadź tytuł";
                ul.appendChild(msg);
            }

            if (title.value.length >= 50) {
                ok = false;
                var msg = document.createElement("li");
                msg.innerText = "Tytuł jest za długi";
                ul.appendChild(msg);
            }

            // sprawdzenie daty

            if (date.value === "") {
                ok = false;
                var msg = document.createElement("li");
                msg.innerText = "Uzupełnij datę";
                ul.appendChild(msg);
            }

            // sprawdzenie priorytetu

            if (priority.value === "") {
                ok = false;
                var msg = document.createElement("li");
                msg.innerText = "Nadaj priorytet";
                ul.appendChild(msg);
            }

            // sprawdzenie opisu (do 100 znaków)

            if (description.value.length >= 100) {
                ok = false;
                var msg = document.createElement("li");
                msg.innerText = "Opis jest za długi";
                ul.appendChild(msg);
            }






            /* ---------------- LocalStorage -------------------- */


            function Todo(name) {
                this.counter = counter;
                this.title = title.value;
                this.date = date.value;
                this.priority = priority.value;
                this.description = description.value;
                this.completed = false;
            }

            // Add NewTodo

            function addNewTodoWithName(name) {
                var t = new Todo(name);
                tasks.push(t);
                counter++;
                saveTasks();
            }

            // Get Todo

            addNewTodoWithName(name);

            // save data to local storage

            function saveTasks() {
                var str = JSON.stringify(tasks);
                localStorage.setItem("tasks", str);
            }

            saveTasks();


            var formObj = {
                title: title.value,
                date: date.value,
                priority: priority.value,
                description: description.value,

            };

            if (ok) {
                // console.log("Walidacja okej");
                errorMessage.innerHTML = "";
                errorMessage2.innerHTML = "";
                createElement(formObj);

                /*zeruję wartość inputu po dodaniu elementu*/
                title.value = "";
                date.value = "";
                priority.value = "";
                description.value = "";
            } else {
                errorMessage.innerHTML = "";
                errorMessage.appendChild(ul);

                var mobile = window.matchMedia("(max-width: 480px)");
                if (mobile.matches) {
                    errorMessage2.innerHTML = "";
                    errorMessage2.appendChild(ul);
                }

            }


            // mainForm.style.display = "none";



        });


        /* ---- ukrywanie i chowanie elementu main-form ----- */

        /*łapię formularz*/
        var mainForm = document.querySelector(".main-form");

        /*łapię przycisk +Add po wcześniejszym dodaniu mu ID mainAdd*/
        var mainAdd = document.getElementById("mainAdd");

        /*dodaję event, który chowa i wyświetla formularz*/

        mainAdd.addEventListener("click", function () {
            if (mainForm.style.display === "flex") {
                mainForm.style.display = "none";
            } else {
                mainForm.style.display = "flex";
            }

        });




});
