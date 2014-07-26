$(document).ready(function(){

	function loadTodos(){
		$.get('/02-jquery/todos.json').success(function(todos){
			if (typeof todos == 'string'){
				todos = JSON.parse(todos);
			}
			for(var i=0; i < todos.length; i++){
				addTodo(todos[i]);
			}
		});
	}

	function addTodo(todo){
		var todoHTML = '<tr>';
		todoHTML += '<td class="todocheck"><input type="checkbox"' + (todo.done ? 'checked' : '') +'></td>';
		todoHTML += '<td class="js-todotodo ' + (todo.done ? 'tododone' : '') +'">'+ todo.todo +'</td>';
		todoHTML += '<td class="todoremove"><a href="#"><i class="icon-trash"></i></a></td>';
		todoHTML += '</tr>';
		var $todoHTML = $(todoHTML)
		instrument($todoHTML);
		$('#todotable').append($todoHTML)
	}

	function instrument($todo){
		var $checkbox = $todo.find('.todocheck input');
		var $removeIcon = $todo.find('.todoremove a');
		
		$checkbox.change(function(evt){
			var ischecked = evt.target.checked
			if(ischecked){
				$todo.find('.js-todotodo').addClass('tododone')
				//TODO: avisar o backend
			} else {
				$todo.find('.js-todotodo').removeClass('tododone')
				//TODO: avisar o backend
			}
		});

		$removeIcon.click(function(){
			$todo.remove()
			//TODO: avisar o backend
		});
	}

	function instrumentNewTask(){
		var $newtask = $('#newtask')
		$newtask.keyup(function(evt){
			if(evt.keyCode == 13){
				var todo = {id: 123, todo: $newtask.val(), done: false}
				addTodo(todo);
				$newtask.val('')
			}
		});
	}

	loadTodos();

	instrumentNewTask();
});

