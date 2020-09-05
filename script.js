(function () {
    const target = document.querySelector('span.target');
    let modes = document.querySelectorAll('div.select-modes ul li');
    const buttonAddTask = document.querySelector('div.add-task button');
    const input = document.querySelector('div.add-task input');
    const divTasksBlock = document.querySelector('div.tasks-block');
    let count = 1;
    let checkeds = [];
    let notCheckeds = [];
    let inputsCheckbox = [];

    for (let i = 0; i < modes.length; i++) {
        modes[i].addEventListener('click', focusFunc);
    };


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

        target.style.width = `${width + 20}px`;
        target.style.top = `${top + targetHeight + 11}px`;
        target.style.left = `${left-10}px`;
        target.style.transform = 'none'; /* para ir ate a posicao do elemento fazendo efeito slide*/

        updateTaskView(e.target);
    };

    buttonAddTask.addEventListener('click', addTask);

    input.addEventListener('keypress', function (e) {
        e.keyCode == 13 ? buttonAddTask.click() : 0;
    });

    function addTask() {

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
            spanIcon.classList.add('notranslate');
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
            let divsAlert = document.querySelectorAll('div.alert');

            if (!!divsAlert && divsAlert.length == 0) {
                alertAddInvalid();
            };
        };
    };

    function alertAddInvalid() {
        let h2 = document.createElement('h2');
        let buttonOk = document.createElement('button');
        let container = document.querySelector('div#container');
        let divAlert = document.createElement('div');

        if (target) {
            target.style.display = 'none';
        };

        divAlert.classList.add('alert');
        h2.innerText = 'Add at least one task!';
        buttonOk.innerText = 'OK';

        divAlert.appendChild(h2);
        divAlert.appendChild(buttonOk);

        container.style.opacity = '0.4';

        document.querySelector('body').appendChild(divAlert);

        buttonOk.addEventListener('click', function () {
            let divAlert = document.querySelector('div.alert');

            divAlert.remove();

            target.style.display = 'block';
            container.style.opacity = '1';
        });
    };

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

        if (target.innerText == modes[1].innerText) {
            showActive();
        }
        else if (target.innerText == modes[2].innerText) {
            showCompleted();
        } else {
            all();
        };

        adjustIconDisplay();
    };

    function updateInputs() {
        checkeds = [];
        notCheckeds = [];
        modes = document.querySelectorAll('div.select-modes ul li');

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

        let iconsRemoveOnlyOne = divTasksBlock.querySelectorAll('span.only-one');

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

    divTasksBlock.innerHTML = `
    <div class="remove-all notranslate"> 
        <span class="material-icons">
            delete_outline
        </span>
        delete all    
    </div>
    `;

    let divRemoveAll = divTasksBlock.querySelector('div.remove-all');

    divRemoveAll.addEventListener('click', function () {
        let iconsRemoveOnlyOne = document.querySelectorAll('.only-one');

        iconsRemoveOnlyOne.forEach((icon) => {
            if (icon.parentElement.querySelector('input[type=checkbox]').checked) {
                icon.click();
            };
        });
    });

    function all() {
        divTasksBlock.classList.remove('completed')

        inputsCheckbox.forEach((input) => {
            input.parentElement.parentElement.style.display = 'flex';
        });
    };

})();