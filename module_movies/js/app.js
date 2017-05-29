var misPeliculas = (function() {

var listado = [];
var editable;

$('#agregar-btn').click(agregar);
$('#eliminar-btn').click(eliminar);
$('#ordenar-btn').click(ordenar);
$('#editar-btn').click(editar);
$('#guardar-btn').click(guardar);
$('#cancelar-btn').click(cancelar);

$('#guardar-btn').hide();
$('#cancelar-btn').hide();


$('#my-form').attr('action', 'javascript:void(0);');

$("#nombre").keyup(function(event){
    if(event.keyCode == 13){
        $("#agregar-btn").click();
    }
});
	
	function limpiarCampo() {
		
		$('#my-form').trigger('reset');
		$('#nombre').focus();
		
	}

	
	function agregar() {

		var nombre = $('#nombre').val().trim().toLowerCase();

		if(nombre.length > 0) {

			if(duplicados(nombre) === true) {

				alert('La película ya existe');
				limpiarCampo();

			} else {

				listado.push(nombre);

				var list = document.createElement('li');
				var input = document.createElement('input');
				var label = document.createElement('input');

				list.className = "li";
				
				label.className = 'clase';
				label.setAttribute('name', nombre.charAt(0).toUpperCase() + nombre.substring(1).toLowerCase());
				label.setAttribute('value', nombre.charAt(0).toUpperCase() + nombre.substring(1).toLowerCase());
				label.setAttribute('readonly', true);

				input.type = 'checkbox';
				input.className = 'box';
				input.addEventListener('click', onCheck);

								
				$('#peliculas').append(list);
				list.append(input);
				list.append(label);
				
				limpiarCampo();
			}
		
		} else {

			alert('Ingrese el nombre de la película');
			limpiarCampo();
		}

	}


	function duplicados(nombre) {

		for (var i = 0; i < listado.length; i++) {
			if (listado[i] == nombre) {
				return true;
			} 
		}
	}

	

	function onCheck(event) {

		var chequear = event.target;
		
		if(chequear.checked) {

			chequear.setAttribute('checked', 'checked');
		
		} else {

			chequear.removeAttribute('checked');
		}
	}


	

	function eliminar() {

		if($('#peliculas').has('li').length) {
			
			if ($('input.box').is(':checked')) {

				if(confirm('¿Está seguro que desea eliminar las películas seleccionadas?')) {
					
					$('input.box:checked').parent().remove();
					limpiarCampo();
				}
				
			} else {

				if(confirm('¿Está seguro que desea eliminar todas las películas del listado?')) {
					
					$('#peliculas').empty();
					limpiarCampo();
				}

			}
				
			var cadena = $( ".clase" ).map(function() { return(this.name); }).get().join().toLowerCase();

			var array = cadena.split(',');

			listado = array;

		} else {

			alert('Debe ingresar al menos una película para poder eliminar');
		}

	}



	document.getElementById('peliculas').addEventListener('change', onChange, false);

	function numberOfCheckboxesSelected() {
		return document.querySelectorAll('input[type=checkbox]:checked').length;
	}

	function onChange() {
		document.getElementById('editar-btn').disabled = numberOfCheckboxesSelected() > 1;
	}

	
	function editar() {

		if ($('input.box').is(':checked')) {

			$('#editar-btn').prop('disabled', true);
			$('#agregar-btn').prop('disabled', true);
			$('#eliminar-btn').prop('disabled', true);
			$('#ordenar-btn').prop('disabled', true);
			$('#guardar-btn').show();
			$('#cancelar-btn').show();
			$('input.box').prop('disabled', true);


			editable = $('input.box:checked').next();
			editable.removeAttr('readonly').focus();
			
		} else {

			alert('Seleccione la película que desea editar del listado');
		    limpiarCampo();

		}

	}



	function guardar() {
		
		var valor = $('input.box:checked').next().val().toLowerCase();

		if(duplicados(valor) === true) {

			alert("Lo sentimos, la película ya existe");
			cancelar();

		} else {
			
			$('input.box:checked').next().attr('value', valor);
			$('input.box:checked').next().attr('name', valor);
		}

		
		var cadena = $( ".clase" ).map(function() { return(this.name); }).get().join().toLowerCase();

		var array = cadena.split(',');

		listado = array;

		
		if(editable.attr('readonly')) {
			
		}  else {

			editable.attr('readonly', 'readonly');
		}

		$('input.box').prop('disabled', false);
		$('#cancelar-btn').hide();
		$('#editar-btn').prop('disabled', false);
		$('#agregar-btn').prop('disabled', false);
		$('#eliminar-btn').prop('disabled', false);
		$('#ordenar-btn').prop('disabled', false);
		$('#guardar-btn').hide();

		limpiarCampo();
	}



	function cancelar() {

		if(editable.attr('readonly')) {
			
		}  else {

			editable.attr('readonly', 'readonly');
		}

		var cadena = $( ".clase" ).map(function() { return(this.name); }).get().join().toLowerCase();

		var array = cadena.split(',');

		
		$('#peliculas').empty();

		
		for (var i = 0; i < array.length; i++) {
					
			var list = document.createElement('li');
			var input = document.createElement('input');
			var label = document.createElement('input');

			list.className = "li";

			label.className = 'clase';
			label.setAttribute('name', array[i].charAt(0).toUpperCase() + array[i].substring(1).toLowerCase());
			label.setAttribute('value', array[i].charAt(0).toUpperCase() + array[i].substring(1).toLowerCase());
			label.setAttribute('readonly', true);

			input.type = 'checkbox';
			input.className = 'box';
			input.addEventListener('click', onCheck);

			$('#peliculas').append(list);
			list.append(input);
			list.append(label);
		
		}

		$('input.box').prop('disabled', false);
		$('#cancelar-btn').hide();
		$('#editar-btn').prop('disabled', false);
		$('#agregar-btn').prop('disabled', false);
		$('#eliminar-btn').prop('disabled', false);
		$('#ordenar-btn').prop('disabled', false);
		$('#guardar-btn').hide();

		limpiarCampo();

	}




	function ordenar() {

		var cadena = $( ".clase" ).map(function() { return(this.name); }).get().join().toLowerCase();

		var array = cadena.split(',');

		array.sort(function(nombre1, nombre2) {
	      var nameA = nombre1.toUpperCase();
	      var nameB = nombre2.toUpperCase();
	      if (nameA < nameB) {
	        return -1;
	      }
	      if (nameA > nameB) {
	        return 1;
	      }
	      return 0;
	    });


		$('#peliculas').empty();

		
		for (var i = 0; i < array.length; i++) {
			
			if (array[i] == [""]) {
				
				alert('Debe ingresar al menos dos películas');
			
			} else {
					
				var list = document.createElement('li');
				var input = document.createElement('input');
				var label = document.createElement('input');

				list.className = "li";

				label.className = 'clase';
				label.setAttribute('name', array[i].charAt(0).toUpperCase() + array[i].substring(1).toLowerCase());
				label.setAttribute('value', array[i].charAt(0).toUpperCase() + array[i].substring(1).toLowerCase());
				label.setAttribute('readonly', true);

				input.type = 'checkbox';
				input.className = 'box';
				input.addEventListener('click', onCheck);

				$('#peliculas').append(list);
				list.append(input);
				list.append(label);
			}
		}

		limpiarCampo();

	}




})();