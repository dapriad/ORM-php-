//////////////////////////////////////////////////////////////// 
function load_products_ajax() {
    $.ajax({
        type: 'GET',
        url: "modules/products/controller/controller_products.class.php?load=true",
        //dataType: 'json', 
        async: false
    }).success(function (data) {
        var json = JSON.parse(data);
        
        //alert(json.user.usuario);

        pintar_products(json);

    }).fail(function (xhr) {
        alert(xhr.responseText);
    });
}

//////////////////////////////////////////////////////////////// 
function load_products_get_v1() {
    $.get("modules/products/controller/controller_products.class.php?load=true", function (data, status) {
        var json = JSON.parse(data);
        //$( "#content" ).html( json.msje );
        //alert("Data: " + json.user.usuario + "\nStatus: " + status);

        pintar_products(json);
    });
}

//////////////////////////////////////////////////////////////// 
function load_products_get_v2() {
    var jqxhr = $.get("modules/products/controller/controller_products.class.php?load=true", function (data) {
        var json = JSON.parse(data);
        console.log(data);
        pintar_products(json);
        //alert( "success" );
    }).done(function () {
        //alert( "second success" );
    }).fail(function () {
        //alert( "error" );
    }).always(function () {
        //alert( "finished" );
    });

    jqxhr.always(function () {
        //alert( "second finished" );
    });
}

$(document).ready(function () {
    //load_products_ajax();
    //load_products_get_v1();
    load_products_get_v2();
});

function pintar_products(data) {
    //alert(data.user.avatar);
    var content = document.getElementById("content");
    var div_products = document.createElement("div");
    var parrafo = document.createElement("p");

    var msje = document.createElement("div");
    msje.innerHTML = "msje = ";
    msje.innerHTML += data.msje;
    
    var id_prod = document.createElement("div");
    id_prod.innerHTML = "id_prod = ";
    id_prod.innerHTML += data.products.id_prod;
    
    var prod_name = document.createElement("div");
    prod_name.innerHTML = "prod_name = ";
    prod_name.innerHTML += data.products.prod_name;
    
    var price = document.createElement("div");
    price.innerHTML = "price = ";
    price.innerHTML += data.products.price;
    
    var dis_date = document.createElement("div");
    dis_date.innerHTML = "dis_date = ";
    dis_date.innerHTML += data.products.dis_date;
    
    var exp_date = document.createElement("div");
    exp_date.innerHTML = "exp_date = ";
    exp_date.innerHTML += data.products.exp_date;
    
    var status = document.createElement("div");
    status.innerHTML = "status = ";
    status.innerHTML += data.products.status;
    
    
    //arreglar ruta IMATGE!!!!!
    
    var cad = data.products.avatar;
    //console.log(cad);
    //var cad = cad.toLowerCase();
    var img = document.createElement("div");
    var html = '<img src="' + cad + '" height="75" width="75"> ';
    img.innerHTML = html;
    //alert(html);

    div_products.appendChild(parrafo);
    parrafo.appendChild(msje);
    parrafo.appendChild(id_prod);
    parrafo.appendChild(prod_name);
    parrafo.appendChild(price);
    parrafo.appendChild(dis_date);
    parrafo.appendChild(exp_date);
    parrafo.appendChild(status);
    content.appendChild(div_products);
    content.appendChild(img);
}


