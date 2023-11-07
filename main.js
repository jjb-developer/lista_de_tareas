const select = (tag) => document.querySelector(tag)
const create = (tag) => document.createElement(tag)
const addText = (element,text) => element.innerText = text 
const addChild = (padre,hijo) => padre.appendChild(hijo)

function renderTasks(){
	const tasks = select('#tasks')
	tasks.innerHTML = ''
	const tareas = JSON.parse(sessionStorage.getItem('tareas'))
	tareas.map(task=>{
		const div = create('div')
		div.classList.add('flex', 'items-center', 'justify-between', 'bg-[#457b9d]', 'bg-opacity-80', 'rounded-xl', 'rounded-tl', 'rounded-br', 'p-2')
		div.innerHTML = `
      ${task.status === true ? "<i class='check bx bx-check-circle text-xl cursor-pointer text-amber-500 hover:text-[#1d3557] duration-300'></i>":"<i class='check bx bx-circle text-xl cursor-pointer text-amber-500 hover:text-[#1d3557] duration-200'></i>"}
      <p class='font-medium text-teal-100 capitalize'>${task.title}</p>
      <i class='bx bxs-trash-alt text-xl cursor-pointer text-[#1d3557] hover:text-[#f1faee] duration-200'></i>
		`
		tasks.appendChild(div)
	})
	const del = document.querySelectorAll('.bxs-trash-alt')
	del.forEach(task=>{
		task.addEventListener('click', (e)=> {
			eliminando(e.target.previousElementSibling.textContent)
		})
	})
	const check = document.querySelectorAll('.check')
	check.forEach(task=>{
		task.addEventListener('click', (e)=> {
			editando(e.target.nextElementSibling.textContent)
		})
	})
	msj(tareas)
}

function eliminando(ref){
	const json = JSON.parse(sessionStorage.getItem("tareas"))
	const filtrado = json.filter(t=>t.title !== ref)
	sessionStorage.setItem("tareas", JSON.stringify(filtrado))
	renderTasks()
}

function editando(ref){
	const json = JSON.parse(sessionStorage.getItem("tareas"))
	const mapeando = json.map(t=>{
		if(t.title===ref){
			t.status = !t.status
			return t
		} else return t
	})
	sessionStorage.setItem("tareas", JSON.stringify(mapeando))
	renderTasks()
}

function addTarea(){
	const json = sessionStorage.getItem("tareas") ? JSON.parse(sessionStorage.getItem("tareas")):[]
	const tarea = {}
	const task = select('#task')
	tarea["id"] = toString(json.length)
	tarea["title"] = task.value
	tarea["status"] = false
	json.push(tarea)
	sessionStorage.setItem("tareas",JSON.stringify(json))
	task.value = ''
	renderTasks()
}

function msj(tareas){
	const msj = select('#msj_task')
	msj.innerText = tareas === null || tareas === [] ? "No tienes tareas pendiente":"Estas son tus tareas pendientes"
}

const btn = select('#btn')
btn.addEventListener('click', addTarea )


/*
sessionStorage.setItem("tareas", `[{"id":"1", "title": "Programar en javascript", "status": false}]`)
renderTasks()
*/
