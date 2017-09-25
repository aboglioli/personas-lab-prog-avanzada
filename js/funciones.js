$(function () {

    var TallerAvanzada = {};

    (function (app) {

        app.init = function () {

            app.buscarPersonas();

            app.bindings();
            
            
        };

        app.bindings = function () {


// Oyente del boton agregar

            $("#agregarPersona").on('click', function (event) {
                $("#id").val(0);
                $("#tituloModal").html("Nueva Persona");

                $("#modalPersona").modal({show: true});
            });



            $("#cuerpoTabla").on('click', '.editar', function (event) {

                $("#id").val($(this).attr("data-id_persona"));

                $("#nombre").val($(this).parent().parent().children().first().html());

                $("#apellido").val($(this).parent().parent().children().first().next().html());

                $("#dni").val($(this).parent().parent().children().first().next().next().html());

                $("#tituloModal").html("Editar Persona");
                $("#modalPersona").modal({show: true});
            });

            $("#cuerpoTabla").on('click', '.eliminar', function () {
                app.eliminarPersona($(this).attr("data-id_persona"));
            });

            $("#guardar").on("click", function (event) {

                app.guardarPersona();
            });

            $("#formPersona").bootstrapValidator({
                excluded: [],
            });
        };

        app.guardarPersona = function () {

            var url = "backend/acciones.php?accion=guardar";
            //data del formulario persona
            var data = $("#formPersona").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function (datos) {
                    $("#modalPersona").modal('hide');
                    app.actualizarTabla(datos, $("#id").val());
                },
                error: function (data) {
                    alert(data);
                }
            });
        };
        app.eliminarPersona = function (id) {

            var url = "backend/acciones.php?accion=eliminar&id=" + id;

            $.ajax({
                url: url,
                method: "GET",
                dataType: 'json',
                success: function (data) {
                    app.borrarFila(id);
                },
                error: function (data) {
                    alert('error');
                }
            });

        };
        app.buscarPersonas = function () {

            var url = "backend/acciones.php?accion=buscar";

            $.ajax({
                url: url,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    app.rellenarTabla(data);
                },
                error: function () {
                    alert('error');
                }

            });
        };

        app.rellenarTabla = function (data) {

            var html = "";

            $.each(data, function (clave, persona) {
                html += '<tr>' +
                        '<td>' + persona.nombre + '</td>' +
                        '<td>' + persona.apellido + '</td>' +
                        '<td>' + persona.dni + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar"  data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
            });

            $("#cuerpoTabla").html(html);
            $('#table').DataTable();
        };

        app.actualizarTabla = function (persona, id) {
            if (id == 0) {

                var html = '<tr>' +
                        '<td>' + persona.nombre + '</td>' +
                        '<td>' + persona.apellido + '</td>' +
                        '<td>' + persona.dni + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTabla").append(html);

            } else {
                //busco la fila
                var fila = $("#cuerpoTabla").find("a[data-id_persona='" + id + "']").parent().parent();
                var linea = '<td>' + persona.nombre + '</td>' +
                        '<td>' + persona.apellido + '</td>' +
                        '<td>' + persona.dni + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_persona="' + persona.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>';
                fila.html(linea);
            }
        };

        app.borrarFila = function (id) {
            var fila = $("#cuerpoTabla").find("a[data-id_persona='" + id + "']").parent().parent().remove();

        };

        app.init();

    })(TallerAvanzada);


});
