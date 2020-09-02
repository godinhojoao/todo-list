(function () {
    const target = document.querySelector('span.target');
    const modes = document.querySelectorAll('div.select-modes ul li');
    const buttonAddTask = document.querySelector('div.add-task button');
    const divTasksBlock = document.querySelector('div.tasks-block');
    let count = 1;
    let checkeds = [];
    let notCheckeds = [];
    let inputsCheckbox = [];

    divTasksBlock.innerHTML = `
    <div class="remove-all"> 
        <span class="material-icons">
            delete_outline
        </span>
        delete all    
    </div>
    `;

    let divRemoveAll = divTasksBlock.querySelector('div.remove-all');

    divRemoveAll.addEventListener('click', removeAllTasks);

    function removeAllTasks() {
        let iconsRemoveOnlyOne = document.querySelectorAll('span.only-one');

        iconsRemoveOnlyOne.forEach((icon) => {
            icon.click();
        });
    };

    for (let i = 0; i < modes.length; i++) {
        modes[i].addEventListener('click', focusFunc);
    };

    buttonAddTask.addEventListener('click', addTask);

    function focusFunc(e) {
        for (let i = 0; i < modes.length; i++) {
            if (modes[i].classList.contains('active')) {
                modes[i].classList.remove('active');
            };

            modes[i].classList.remove('actual');
            modes[i].style.opacity = '0.4';
        };

        this.classList.add('actual');
        this.style.opacity = '1';
        this.style.fontWeight = 'bold';

        const width = this.getBoundingClientRect().width;
        const targetHeight = this.getBoundingClientRect().height;
        const top = this.getBoundingClientRect().top;
        const left = this.getBoundingClientRect().left;

        target.style.width = `${width}px`;
        target.style.top = `${top + targetHeight + 11}px`;
        target.style.left = `${left}px`;
        target.style.transform = 'none'; /* para ir ate a posicao do elemento */

        updateTaskView(e.target);
    };

    function addTask() {
        let input = document.querySelector('div.add-task input');

        if (!!input.value) {
            let divTask = document.createElement('div');
            let divTaskContent = document.createElement('div');
            let inputCheckbox = document.createElement('input')
            let label = document.createElement('label');
            let spanIcon = document.createElement('span');

            divTask.classList.add('task');
            divTaskContent.classList.add('task-content');
            spanIcon.classList.add('material-icons');
            spanIcon.classList.add('only-one');
            inputCheckbox.type = "checkbox";
            inputCheckbox.id = `task${count}`;
            label.setAttribute('for', `task${count}`);
            label.innerText = `${input.value}`;
            spanIcon.innerText = 'delete_outline';

            divTaskContent.appendChild(inputCheckbox);
            divTaskContent.appendChild(label);
            divTask.appendChild(divTaskContent);
            divTask.appendChild(spanIcon);
            divTasksBlock.insertBefore(divTask, divRemoveAll);

            input.value = '';
            count++;

            inputsCheckbox = divTasksBlock.querySelectorAll('input[type=checkbox]');
            inputsCheckbox.forEach((checkbox) => {
                checkbox.addEventListener('click', updateCheckboxDisplay);
            });

            let actualModeElement = whatIsActualModeIfExists();
            actualModeElement ? updateTaskView(actualModeElement) : 0;
        } else {
            alert('Adicione uma tarefa'); /* preciso fazer um alerta bonito*/
        };
    }

    function whatIsActualModeIfExists() {
        let actualModeElement;

        modes.forEach((mode) => {
            if (mode.classList.contains('actual')) {
                actualModeElement = mode;
            }
        });
        return actualModeElement;
    };

    function updateCheckboxDisplay() {
        let actualModeElement = whatIsActualModeIfExists();

        if (!!actualModeElement) {
            updateTaskView(actualModeElement);
        };
    };

    function updateTaskView(target) {
        updateInputs();

        if (target.innerText == 'Active') {
            showActive();
        }
        else if (target.innerText == 'Completed') {
            showCompleted();
        } else {
            all();
        };

        adjustIconDisplay();
    };

    function updateInputs() {
        checkeds = [];
        notCheckeds = [];

        inputsCheckbox.forEach((input) => {
            if (input.checked) {
                checkeds.push(input);
            } else {
                notCheckeds.push(input);
            };
        });
    };

    function adjustIconDisplay() {
        if (divTasksBlock.classList.contains('completed')) {
            checkeds.forEach((input) => {
                input.parentElement.parentElement.querySelector('.only-one').style.display = 'block';
            });
        } else {
            divTasksBlock.querySelectorAll('.only-one').forEach((icon) => icon.style.display = 'none');
        };
    };

    function showActive() {
        divTasksBlock.classList.remove('completed')

        checkeds.forEach((input) => {
            input.parentElement.parentElement.style.display = 'none';
        });

        notCheckeds.forEach((input) => {
            input.parentElement.parentElement.style.display = 'flex';
        });
    };

    function showCompleted() {
        checkeds.length > 0 ? divTasksBlock.classList.add('completed') : divTasksBlock.classList.remove('completed');

        checkeds.forEach((input) => {
            input.parentElement.parentElement.style.display = 'flex';
        });

        notCheckeds.forEach((input) => {
            input.parentElement.parentElement.style.display = 'none';
        });

        let iconsRemoveOnlyOne = divTasksBlock.querySelectorAll('.only-one');

        iconsRemoveOnlyOne.forEach((icon) => {
            icon.addEventListener('click', removeOnlyOneTask);
        });
    };

    function removeOnlyOneTask(e) {
        let actualCheckbox = e.target.parentElement.firstElementChild.querySelector('input');

        actualCheckbox.checked = false;
        e.target.parentElement.remove();

        updateTaskView(whatIsActualModeIfExists());
    };

    function all() {
        divTasksBlock.classList.remove('completed')

        inputsCheckbox.forEach((input) => {
            input.parentElement.parentElement.style.display = 'flex';
        });
    };

})();