
var db=openDatabase("Apli","1.0","Apli",65535);

$("#crear").click(function(event) {
	db.transaction(function(tx) {
		var sql="CREATE TABLE clientes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
			"nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL)";
	tx.executeSql(sql,undefined,function() {alert("Tabla creada");},error);
	});
});

$("#eliminar").click(function(event){
	if (!confirm("Borrar tabla?","")) 
		return;
	db.transaction(function(tx) {
		var sql="DROP TABLE clientes";
		tx.executeSql(sql,undefined,ok,error);
	});
});

$("#insertar").click(function(event){
	var nombre=$("#nombre").val();
	var apellidos=$("#apellidos").val();
	db.transaction(function(tx){
		var sql="INSERT INTO clientes(nombre,apellido) VALUES (?,?)";
		tx.executeSql(sql,[nombre,apellidos],function() {
			alert("cliente insertado");
		},error);
	});
});

$("#listar").click(function(event){
	db.transaction(function(tx){
		var sql="SELECT * FROM clientes";
		tx.executeSql(sql,undefined,function(tx,result) {
			var html="<ul>";
			if (result.rows.length) {
				for(var i=0;i<result.rows.length;i++) {
					var row=result.rows.item(i);
					var nombre=row.nombre;
					var apellido=row.apellido;
					html+="<li>" + nombre + "&nbsp;" + apellido + "</li>"
				}
			}
			else {
				html+="<li>no hay clientes</li>";
			}
			htm+="</ul>";
			$("#lista").pagebeforeshow(function(){
				var $content=$("#lista div:jqmData(role=content)");
				$content.html(html);
				var $ul=$content.find("ul");
				$ul.listview();
			});
			$.mobile.changePage($("#lista"));
		},error);
	});
});

function ok() {

}

function error(tx,err){
	alert("DB error:" + err.message);
	return false;
};