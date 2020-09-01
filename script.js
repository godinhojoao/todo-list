(function () {
    const target = document.querySelector('span.target');
    const modes = document.querySelectorAll('div.select-modes ul li');
    const buttonAddTask = document.querySelector('div.add-task button');
    let tasks;
    let count = 1;

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
            tasksBlock.innerHTML +=
                `<div class="task">
                    <input type="checkbox" name="task${count}" id="task${count}">
                    <label for="task${count}"> ${input.value} </label><br>
                </div>`;

            input.value = '';
            count++;

            tasks = document.querySelectorAll('div.task');
        } else {
            alert('Adicione uma tarefa'); /* preciso fazer um alerta bonito depois */
        }
    };

    function findTasks(e) {
        if (e.target.innerText.toLowerCase() == 'active') {
            onlyActived();
        }
        else if (e.target.innerText.toLowerCase() == 'completed') {
            onlyCompleted();
        } else {
            // all
        };
    };

    function onlyActived() {
        
    };

    function onlyCompleted() {

    };
})();