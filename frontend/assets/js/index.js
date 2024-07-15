
//Index.html
let id_user = 1
let colors = [
    {
        task_status: 'new',
        select_bg_color: 'bg-white'
    },
    {
        task_status: 'in progress',
        select_bg_color: 'bg-info'
    },
    {
        task_status: 'cancel',
        select_bg_color: 'bg-danger'
    },
    {
        task_status: 'done',
        select_bg_color: 'bg-success'
    },
]




window.onload = () => {
    get_username(id_user);
    get_user_tasks(id_user);
}

function get_username(id_user) {
    fetch(`http://localhost:3000/user/${id_user}`).then(response => {
        if (response.status === 200) {
            return response.json();

        } else {
            console.log(response)
        }
    })
        .then(dados => {
            //console.log(dados[0]);
            if (dados.length === 0) {
                console.log('Erro dos dados')
            } else {
                console.log(dados)
                document.querySelector("#username").textContent = dados[0].username;
            }
        })
}
function get_user_tasks(id_user) {

    fetch(`http://localhost:3000/user/${id_user}/tasks`).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log('ERRO um');
        }
    })
        .then(tarefas => {
            if (tarefas.length === 0) {
                document.querySelector("#no_tasks").classList.remove("d-none");
                document.querySelector("#total_tasks").classList.add("d-none");
            } else {
                console.log(tarefas)
                document.querySelector("#tasks_container").innerHTML = null;

                tarefas.forEach(tarefa => {
                    let color = colors.find(item => item.task_status == tarefa.task_status)
                    let html = `

                    <div class="col-12 border border-primary rounded p-3 shadow-sm">
                        <div class="row align-items-center">
                        <div class="col-8"><h5>${tarefa.task_text}</h5></div>
                        <div class="col-2">
                            <select id="task_status_${tarefa.id}" class="form-select p-2  ${color.select_bg_color}" onchange="change_task_status(${tarefa.id})">
                                <option value="new" ${tarefa.task_status == 'new' ? 'selected' : ''}>New</option>
                                <option value="in progress" ${tarefa.task_status == 'in progress' ? 'selected' : ''}>in progress</option>
                                <option value="cancel" ${tarefa.task_status == 'cancel' ? 'selected' : ''}>cancel</option>
                                <option value="done" ${tarefa.task_status == 'done' ? 'selected' : ''}>done</option>
                            </select>
                        </div>
                        <div onclick="edit_task(${tarefa.id})"   class="col-1 edit_link">Edit</div>
                        <div class="col-1 text-end delete_link" onclick="delete_task(${tarefa.id})">Delete</div>
                        </div>
                    </div>
                    </div>
                `;
                    let new_task = document.createElement('div');
                    new_task.classList.add('row', 'mb-3');
                    new_task.innerHTML = html;
                    document.querySelector('#tasks_container').appendChild(new_task);
                });
                document.querySelector("#no_tasks").classList.add("d-none");
                document.querySelector("#total_tasks").classList.remove("d-none");
                document.querySelector("#total_tasks > div > h4 > span").textContent = tarefas.length;

            }
        })
}

function edit_task(id_task) {
    console.log(id_task)
}

function delete_task(id_task) {
    console.log(id_task)
}

function change_task_status(id_task) {
    let status = document.querySelector("#task_status_" + id_task).value;

    fetch(`http://localhost:3000/user/tasks/update_status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_task, status })
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(dados => {
            console.log(dados);
        })



    //Update das cores
    let color_obj = colors.find(e => e.task_status == status);
    let select = document.querySelector(`#task_status_${id_task}`)
    let colors_tmp = colors.map(c => { return c.select_bg_color })
    console.log(colors_tmp)
    select.classList.remove(...colors_tmp)
    select.classList.add(color_obj.select_bg_color)
}
