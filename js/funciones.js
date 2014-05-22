$(function() {

    var Personas = {};

    (function(app) {

        app.init = function() {
            //alert('Cargando aplicacion');
            app.buscarPersonas();
            app.bindings();
        };
        app.loader = function() {
        }
        app.bindings = function() {
            
            $("#agregarPersona").on('click', function(event) {
                $("#id").val($(this).attr("persona"));
                $("#tituloModal").html("Nueva Persona");
                $("#modalPersona").modal({show: true});
            })
            
            $("#cuerpoTabla").on('click','.editar', function(event) {
                $("#id").val($(this).attr("persona"));
                $("#nombre").val($(this).parent().parent().children().first().html());
                $("#apellido").val($(this).parent().parent().children().first().next().html());
                $("#dni").val($(this).parent().parent().children().first().next().next().html());
                $("#tituloModal").html("Editar Persona");
                $("#modalPersona").modal({show: true});
            })
            
            $("#cuerpoTabla").on('click','.eliminar',function() {
                app.eliminarPersona($(this).attr("persona"));
            })
            
            $("#formPersona").on("submit",function(event){
                event.preventDefault();
                app.guardarPersona();
            })
        };

        app.guardarPersona = function() {
            
            var url ="backend/acciones.php?accion=guardar";
            
            $.ajax({
                url : url,
                method: 'POST',
                dataType: 'json',
                data: $("#formPersona").serialize(),
                success: function(data) {
                 //   console.log(data);
                    app.buscarPersonas();
                    $("#modalPersona").modal('hide');
                },
                error: function() {
                    alert('error al guardar persona');
                }
            })
        };
        app.eliminarPersona = function(id) {
            
            var url ="backend/acciones.php?accion=eliminar&id="+id;
            
            $.ajax({
                url : url,
                method : "GET",
                dataType: 'json',
                success: function(data){
                    app.buscarPersonas();
                },
                error: function(data) {
                    alert('error');
                }
            })
            
        }
        app.buscarPersonas = function() {

            var url = "backend/acciones.php?accion=buscar";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    app.rellenarTabla(data);
                },
                error: function() {
                    alert('error');
                }

            })
        };

        app.rellenarTabla = function(data) {

            var html = "";

            $.each(data, function(clave, persona) {
                html += '<tr>' +
                        '<td>' + persona.nombre + '</td>' +
                        '<td>' + persona.apellido + '</td>' +
                        '<td>' + persona.dni + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" persona="'+persona.id+'"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" persona="'+persona.id+'"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
            })

            $("#cuerpoTabla").html(html);
        };
        
        app.init();

    })(Personas);


})