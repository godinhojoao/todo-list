(function () {
    const target = document.querySelector('span.target');
    const modes = document.querySelectorAll('div.select-modes ul li');
    const buttonAddTask = document.querySelector('div.add-task button');
    let count = 1;
    let tasks;
    let inputsCheckbox = [];
    let checkeds = [];
    let notCheckeds = [];

    for (let i = 0; i < modes.length; i++) {
        modes[i].addEventListener('click', focusFunc);
    };

    buttonAddTask.addEventListener('click', addTask);

    function focusFunc(e) {
        for (let i = 0; i < modes.length; i++) {
            if (modes[i].classList.contains('active')) {
                modes[i].classList.remove('active');
            };

            modes[i].style.opacity = '0.4';
        };

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

        findTasks(e);
    };

    function addTask() {
        let input = document.querySelector('div.add-task input');

        if (!!input.value) {
            const tasksBlock = document.querySelector('div.tasks-block');

            let divTask = document.createElement('div');
            let inputCheckbox = document.createElement('input')
            let label = document.createElement('label');
            let divTaskContent = document.createElement('div');

            divTask.classList.add('task');
            divTaskContent.classList.add('task-content');
            inputCheckbox.type = "checkbox";
            inputCheckbox.id = `task${count}`;
            label.setAttribute('for', `task${count}`);
            label.innerText = `${input.value}`;

            divTaskContent.appendChild(inputCheckbox);
            divTaskContent.appendChild(label);
            divTask.appendChild(divTaskContent);
            tasksBlock.appendChild(divTask);

            input.value = '';
            count++;

            inputsCheckbox = tasksBlock.querySelectorAll('input[type=checkbox]');
        } else {
            alert('Adicione uma tarefa'); /* preciso fazer um alerta bonito depois */
        }
    };

    function findTasks(e) {
        updateInputs();

        if (e.target.innerText.toLowerCase() == 'active') {
            onlyActive();
        }
        else if (e.target.innerText.toLowerCase() == 'completed') {
            onlyCompleted();
        } else {
            inputsCheckbox.forEach((input) => {
                input.parentElement.style.display = 'flex';
            });
        };
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

    function onlyActive() {
        checkeds.forEach((input) => {
            input.parentElement.style.display = 'none';
        });

        notCheckeds.forEach((input) => {
            input.parentElement.style.display = 'flex';
        });
    };

    function onlyCompleted() {
        checkeds.forEach((input) => {
            input.parentElement.style.display = 'flex';
        });

        notCheckeds.forEach((input) => {
            input.parentElement.style.display = 'none';
        });

    };
})();