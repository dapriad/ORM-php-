//Crear un plugin

jQuery.fn.fill_or_clean = function () {
    this.each(function () {
        if ($("#id_prod").attr("value") == "") {
            $("#id_prod").attr("value", "Introduce ID Product");
            $("#id_prod").focus(function () {
                if ($("#id_prod").attr("value") == "Introduce ID Product") {
                    $("#id_prod").attr("value", "");
                }
            });
        }
        $("#id_prod").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#id_prod").attr("value") == "") {
                $("#id_prod").attr("value", "Introduce ID Product");
            }
        });
        
        if ($("#prod_name").attr("value") == "") {
            $("#prod_name").attr("value", "Introduce Product name");
            $("#prod_name").focus(function () {
                if ($("#prod_name").attr("value") == "Introduce Product name") {
                    $("#prod_name").attr("value", "");
                }
            });
        }
        $("#prod_name").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#prod_name").attr("value") == "") {
                $("#prod_name").attr("value", "Introduce Product name");
            }
        });
        
        if ($("#price").attr("value") == "") {
            $("#price").attr("value", "Introduce price of product");
            $("#price").focus(function () {
                if ($("#price").attr("value") == "Introduce price of product") {
                    $("#price").attr("value", "");
                }
            });
        }
        $("#price").blur(function () { //Onblur se activa cuando el usuario retira el foco
            if ($("#price").attr("value") == "") {
                $("#price").attr("value", "Introduce price of product");
            }
        });
        
         if ($("#dis_date").attr("value") == "") {
            $("#dis_date").attr("value", "Introduce Discharge date");
            $("#dis_date").focus(function () {
                if ($("#dis_date").attr("value") == "Introduce Discharge date") {
                    $("#dis_date").attr("value", "");
                }
            });
        }
        $("#dis_date").blur(function () {
            if ($("#dis_date").attr("value") == "") {
                $("#dis_date").attr("value", "Introduce Discharge date");
            }
        });
        
        if ($("#exp_date").attr("value") == "") {
            $("#exp_date").attr("value", "Introduce Date of expire");
            $("#exp_date").focus(function () {
                if ($("#exp_date").attr("value") == "Introduce Date of expire") {
                    $("#exp_date").attr("value", "");
                }
            });
        }
        $("#exp_date").blur(function () {
            if ($("#exp_date").attr("value") == "") {
                $("#exp_date").attr("value", "Introduce Date of expire");
            }
        });
        
    });//each
    return this;

};//function

//Solution to : "Uncaught Error: Dropzone already attached."
Dropzone.autoDiscover = false;

$(document).ready(function () {
    
    //Datepicker///////////////////////////
    $("#dis_date").datepicker({
        dateFormat: 'mm/dd/yy',
        defaultDate: 'today',
        changeMonth: true,
        changeYear: true
    });
    $("#exp_date").datepicker({
        dateFormat: 'mm/dd/yy',
        defaultDate: 'today',
        changeMonth: true,
        changeYear: true
    });
    
    //Valida Products /////////////////////////
    $('#submit_product').click(function () {
        validate_products();
    });
    
    
    //Control de seguridad para evitar que al volver atrás de la pantalla results a create, no nos imprima los datos
    $.get("modules/products/controller/controller_products.class.php?load_data=true",
            function (response) {
                //alert(response.user);
                if (response.user === "") {
                    $("#id_prod").val('');
                    $("#prod_name").val('');
                    $("#price").val('');
                    $("#dis_date").val('');
                    $("#exp_date").val('');
                    //siempre que creemos un plugin debemos llamarlo, sino no funcionará
    $(this).fill_or_clean();
                } else {
                    $("#id_prod").val( response.products.id_prod);
                    $("#prod_name").val( response.products.prod_name);
                    $("#price").val( response.products.price);
                    $("#dis_date").val( response.products.dis_date);
                    $("#exp_date").val( response.products.exp_date);
                }
            }, "json");
            
            
            
    //Dropzone function //////////////////////////////////
    $("#dropzone").dropzone({
        url: "modules/products/controller/controller_products.class.php?upload=true",
        addRemoveLinks: true,
        maxFileSize: 1000,
        dictResponseError: "Ha ocurrido un error en el server",
        acceptedFiles: 'image/*,.jpeg,.jpg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.rar,application/pdf,.psd',
        init: function () {
            this.on("success", function (file, response) {
                // console.log(response);
                //alert(response);
                $("#progress").show();
                $("#bar").width('100%');
                $("#percent").html('100%');
                $('.msg').text('').removeClass('msg_error');
                $('.msg').text('Success Upload image!!').addClass('msg_ok').animate({'right': '300px'}, 300);
            });
        },
        removedfile: function (file, serverFileName) {
            var name = file.name;
            $.ajax({
                type: "POST",
                url: "modules/products/controller/controller_products.class.php?delete=true",
                data: "filename=" + name,
                success: function (data) {
                    //console.log(data);
                    $("#progress").hide();
                    $('.msg').text('').removeClass('msg_ok');
                    $('.msg').text('').removeClass('msg_error');
                    $("#e_avatar").html("");

                    var json = JSON.parse(data);
                    if (json.res === true) {
                        var element;
                        if ((element = file.previewElement) != null) {
                            element.parentNode.removeChild(file.previewElement);
                            //alert("Imagen eliminada: " + name);
                        } else {
                            false;
                        }
                    } else { //json.res == false, elimino la imagen también
                        var element;
                        if ((element = file.previewElement) != null) {
                            element.parentNode.removeChild(file.previewElement);
                        } else {
                            false;
                        }
                    }
                }
            });
        }
    });
    
    //Utilizamos las expresiones regulares para las funciones de  fadeout
    var id_reg = /^[0-9]{8}$/ ;
    var name_reg= /^[A-Za-z]{2,30}$/;
    var numb_reg = /^[0-9]+$/ ;
    var date_reg = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;


    //realizamos funciones para que sea más práctico nuestro formulario
    $("#id_prod").keyup(function () {
        if ($(this).val() != "" && id_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    $("#prod_name").keyup(function () {
        if ($(this).val() != "" && name_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    $("#price").keyup(function () {
        if ($(this).val() != "" && numb_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    $("#dis_date").keyup(function () {
        if ($(this).val() != "" && date_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    $("#exp_date").keyup(function () {
        if ($(this).val() != "" && date_reg.test($(this).val())) {
            $(".error").fadeOut();
            return false;
        }
    });
    
    
});

function validate_products() {
    var result = true;

    var id_prod = document.getElementById('id_prod').value;
    var prod_name = document.getElementById('prod_name').value;
    var price = document.getElementById('price').value;
    var country = document.getElementById('country').value;
    var province = document.getElementById('province').value;
    var population = document.getElementById('population').value;
    var dis_date = document.getElementById('dis_date').value;
    var exp_date = document.getElementById('exp_date').value;
    var status;
    if(document.getElementById('status1').checked){
        status = document.getElementById('status1').value;
    }
    else if(document.getElementById('status2').checked){
        status = document.getElementById('status2').value;
    }
    else if(document.getElementById('status3').checked){
        status = document.getElementById('status3').value;
    }
    
    var id_reg = /^[0-9]{8}$/ ;
    var name_reg= /^[A-Za-z]{2,30}$/;
    var numb_reg = /^[0-9]+$/ ;
    var date_reg = /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/;
    
            $(".error").remove();
        if ($("#id_prod").val() == "" || $("#id_prod").val() == "Introduce ID Product") {
            $("#id_prod").focus().after("<span class='error'>Introduce ID Product</span>");
            result = false;
            return false;
        } else if (!id_reg.test($("#id_prod").val())) {
            $("#id_prod").focus().after("<span class='error'>ID product should have 8 numbers</span>");
            result = false;
            return false;
        }
        
        else if ($("#prod_name").val() == "" || $("#prod_name").val() == "Introduce Product name") {
            $("#prod_name").focus().after("<span class='error'>Introduce Product name</span>");
            result = false;
            return false;
        } else if (!name_reg.test($("#prod_name").val())) {
            $("#prod_name").focus().after("<span class='error'> Product name should have between 2 or 20 lettes.</span>");
            result = false;
            return false;
        }
        
        else if ($("#price").val() == "" || $("#price").val() == "Introduce Product price") {
            $("#price").focus().after("<span class='error'>Introduce Product price</span>");
            result = false;
            return false;
        } else if (!numb_reg.test($("#price").val())) {
            $("#price").focus().after("<span class='error'> Product price should have only numbers.</span>");
            result = false;
            return false;
        }
        
        else if ($("#dis_date").val() == "" || $("#dis_date").val() == "Introduce Discharge date") {
            $("#dis_date").focus().after("<span class='error'>Introduce Discharge date</span>");
            result = false;
            return false;
        } else if (!date_reg.test($("#dis_date").val())) {
            $("#dis_date").focus().after("<span class='error'>Error format date (mm/dd/yyyy)</span>");
            result = false;
            return false;
        }
        
        else if ($("#exp_date").val() == "" || $("#exp_date").val() == "Introduce Date of expire") {
            $("#exp_date").focus().after("<span class='error'>Introduce Date of expire</span>");
            result = false;
            return false;
        } else if (!date_reg.test($("#exp_date").val())) {
            $("#exp_date").focus().after("<span class='error'>Error format date (mm/dd/yyyy)</span>");
            result = false;
            return false;
        }
    //Si ha ido todo bien, se envian los datos al servidor
    if (result) {
        
        // var data = {"id_prod": id_prod, "prod_name": prod_name, "price": price, "country": country, "province": province, "population": population, "dis_date": dis_date,
        // "exp_date": exp_date};
        
        // Con estado
        var data = {"id_prod": id_prod, "prod_name": prod_name, "price": price, "country": country, "province": province, "population": population, "dis_date": dis_date,
        "exp_date": exp_date, "status": status};
        
        var data_users_JSON = JSON.stringify(data);
        //console.log(data_users_JSON);
        $.post('modules/products/controller/controller_products.class.php',
                {alta_products_json: data_users_JSON},
                
        function (response) {
            console.log(response);
            if (response.success) {
                window.location.href = response.redirect;
            }
            //console.log(response);
            //alert(response);  //para debuguear
            //}); //para debuguear
        }, "json").fail(function (xhr) {
           console.log(xhr.responseJSON);
           
           if (xhr.status === 0) {
                alert('Not connect: Verify Network.');
            } else if (xhr.status == 404) {
                alert('Requested page not found [404]');
            } else if (xhr.status == 500) {
                alert('Internal Server Error [500].');
            } else if (textStatus === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (textStatus === 'timeout') {
                alert('Time out error.');
            } else if (textStatus === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error: ' + xhr.responseText);
            }
           
           if (xhr.responseJSON == 'undefined' && xhr.responseJSON == null )
                xhr.responseJSON = JSON.parse(xhr.responseText);
           
           if (xhr.responseJSON.error.id_prod)
                $("#id_prod").focus().after("<span  class='error1'>" + xhr.responseJSON.error.id_prod + "</span>");

            if (xhr.responseJSON.error.prod_name)
                $("#prod_name").focus().after("<span  class='error1'>" + xhr.responseJSON.error.prod_name + "</span>");

            if (xhr.responseJSON.error.price)
                $("#price").focus().after("<span  class='error1'>" + xhr.responseJSON.error.price + "</span>");

            if (xhr.responseJSON.error.dis_date)
                $("#dis_date").focus().after("<span  class='error1'>" + xhr.responseJSON.error.dis_date + "</span>");

            if (xhr.responseJSON.error_avatar)
                $("#dropzone").focus().after("<span  class='error1'>" + xhr.responseJSON.error_avatar + "</span>");

            if (xhr.responseJSON.success1) {
                if (xhr.responseJSON.img_avatar !== "/Projecte_1.0/media/default-avatar.jpg") {
                    //$("#progress").show();
                    //$("#bar").width('100%');
                    //$("#percent").html('100%');
                    //$('.msg').text('').removeClass('msg_error');
                    //$('.msg').text('Success Upload image!!').addClass('msg_ok').animate({ 'right' : '300px' }, 300);
                }
            } else {
                $("#progress").hide();
                $('.msg').text('').removeClass('msg_ok');
                $('.msg').text('Error Upload image!!').addClass('msg_error').animate({'right': '300px'}, 300);
            }
        });
}
}