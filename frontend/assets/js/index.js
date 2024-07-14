//Index.html
let id = 1
window.onload = () => {
    get_username(id);
    get_user_tasks(id);
}

function get_username(id) {
    fetch(`http://localhost:3000/user/${id}`).then(response => {
        if (response.status === 200) {
            return response.json();

        } else {
            console.log('ERRO')
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
function get_user_tasks(id) {

    fetch(`http://localhost:3000/user/${id}/tasks`).then(response => {
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
                        task_status: 'canceled',
                        select_bg_color: 'bg-danger'
                    },
                    {
                        task_status: 'done',
                        select_bg_color: 'bg-success'
                    },
                ]
                tarefas.forEach(tarefa => {
                    let color = colors.find(item => item.task_status == tarefa.task_status)
                    let html = `

                    <div class="col-12 border border-primary rounded p-3 shadow-sm">
                        <div class="row align-items-center">
                        <div class="col-8"><h5>${tarefa.task_text}</h5></div>
                        <div class="col-2">
                            <select id="task_status_${tarefa.id}" class="form-select p-2  ${color.select_bg_color}">
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

/*
        <div class="row mb-3">
          <div class="col-12 border border-primary rounded p-3 shadow-sm">
            <div class="row align-items-center">
              <div class="col-8"><h5>Texto tarefa</h5></div>
              <div class="col-2">
                <select id="task_status" class="form-select p-2">
                  <option value="new">New</option>
                  <option value="in progress">in progress</option>
                  <option value="cancel">cancel</option>
                  <option value="done">done</option>
                </select>
              </div>
              <div class="col-1">Edit</div>
              <div class="col-1 text-end text-danger">Delete</div>
            </div>
          </div>
        </div>
      </div>


*/