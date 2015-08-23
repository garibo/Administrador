(function(){
	angular.module('pedidosApp', ['ngRoute','ngResource'])

	.config(function($routeProvider) {
		$routeProvider.

		when('/', {
			templateUrl: 'tabla.html',
			controller: 'listaCtrl'
		}).

		when('/vista/:id', {
			templateUrl: 'vista.html',
			controller: 'vistaCtrl'
		}).

		when('/responder/:id', {
			templateUrl: 'respuesta.html',
			controller: 'responderCtrl'
		}).

		when('/contestados', {
			templateUrl: 'contestados.html',
			controller: 'contestadoCtrl'
		}).

		when('/importantes', {
			templateUrl: 'importantes.html',
			controller: 'importanteCtrl'
		}).

		when('/eliminados', {
			templateUrl: 'eliminados.html',
			controller: 'eliminadoCtrl'
		}).

		otherwise({
			redirectTo: '/'
		});
	})

	.factory('Listado',function($resource){
		return $resource('http://localhost/administrador/app/pedidos/php/api/');
	})

	.factory('Contestados',function($resource){
		return $resource('http://localhost/administrador/app/pedidos/php/cont/getContestados.php');
	})

	.factory('Importantes',function($resource){
		return $resource('http://localhost/administrador/app/pedidos/php/importante/getImportante.php');
	})

	.factory('Eliminado',function($resource){
		return $resource('http://localhost/administrador/app/pedidos/php/eliminado/getEliminado.php');
	})

	.factory('NoVisto',function($resource){
		return $resource('http://localhost/administrador/app/pedidos/php/visto/getVisto.php');
	})

	.factory('DatosPedido', function($http){
	return {
	  datos: function (id, callback){
	    $http({
	      method: 'GET',
	      url: 'http://localhost/administrador/app/pedidos/php/datos/'+id+''
	    }).success(callback);
	  },
	  productos: function(id, callback){
	    $http({
	      method: 'GET',
	      url: 'http://localhost/administrador/app/pedidos/php/productos/'+id+''
	    }).success(callback);
	  },
	  borrar: function(id, callback){
	    $http({
	      method: 'POST',
	      data: {'id': id},
	      url: 'http://localhost/administrador/app/pedidos/php/eliminado/'
	    });
	  }
	};
	})

	.factory('accionesTabla', function($http){
	return {
	  visto: function (id){
	    $http({
	      method: 'POST',
	      data: {'id': id},
	      url: 'http://localhost/administrador/app/pedidos/php/visto/'
	    });
	  },
	  importante: function(id, importante){
	    $http({
	      method: 'POST',
	      data: {'id': id, 'importante': importante},
	      url: 'http://localhost/administrador/app/pedidos/php/importante/'
	    });
	  }
	};
	})

	.factory('Contesta',function($http, $q){
		return {
		  datos: function (id, callback){
		    $http({
		      method: 'GET',
		      url: 'http://localhost/administrador/app/pedidos/php/cont/getCon.php/'+id+''
		    }).success(callback);
		  },
		  enviar: function(datos) {
	        return $http({
				method: "POST",
				url: "http://localhost/administrador/app/pedidos/php/cont/snd.php",
				data: datos,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
	            .then(function(response) {
	                if (typeof response.data === 'object') {
	                    return response.data;
	                } else {
	                    // invalid response
	                    return $q.reject(response.data);
	                }

	            }, function(response) {
	                return $q.reject(response.data);
	            });
        	}
		};
	})

	.controller('listaCtrl', function($scope, Listado, accionesTabla) 
	{
		$scope.pedidos = Listado.query();
		/*Variables de paginacion*/
		$scope.curPage = 0;
	 	$scope.pageSize = 6;
	 	$scope.numberOfPages = function() {
			return Math.ceil($scope.pedidos.length / $scope.pageSize);
		};

		$scope.abrir = function(id)
		{
			accionesTabla.visto(id); 
		}

		$scope.cambiar = function(id)
		{

			for (var i = $scope.pedidos.length - 1; i >= 0; i--) {
				if(id == $scope.pedidos[i].id)
				{
				    accionesTabla.importante(id, $scope.pedidos[i].importante);
					$scope.pedidos[i].importante = ($scope.pedidos[i].importante == false)	? true : false;
					break;				
				}
			};
		}

		$scope.$on('onRepeatLast', function(scope, element, attrs){
			angular.element('.minimal input').iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal',
				increaseArea: '20%'
			});
		});

	})

	.filter('pagination', function()
	{
	 return function(input, start)
	 {
	  start = +start;
	  return input.slice(start);
	 };
	})

	.controller('vistaCtrl', function($scope, $routeParams, DatosPedido) 
	{
		$scope.total = 0;
		DatosPedido.datos($routeParams.id, function(data) {
          $scope.datos = data[0];
        });

        DatosPedido.productos($routeParams.id, function(data) {
	      $scope.productos = data;
			for (var i = 0; i < $scope.productos.length; i++) {
          		$scope.total += $scope.productos[i].precio != null ? parseFloat($scope.productos[i].precio)  : 0;
          		$scope.total += $scope.productos[i].precio_pizza != null ? parseFloat($scope.productos[i].precio_pizza) : 0;
          	};          
        });

        $scope.eliminar = function()
		{
			swal({   title: "Estas seguro?",   
				text: "Ya no podras recuperar este pedido",   
				type: "warning",   
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",  
				cancelButtonText: "Cancelar!", 
				confirmButtonText: "Si, Eliminalo!",   
				closeOnConfirm: false }, 
				function(){  
				DatosPedido.borrar($routeParams.id); 
				swal("Eliminado!", "El pedido ha sido eliminado.", "success"); 
				document.location.href = "http://localhost/administrador/app/pedidos/#/"
			});
		};
	})
	

	.controller('tabCtrl', function($scope, NoVisto) 
	{
		$scope.vistos = NoVisto.query();
	    $scope.tab = 1;

	    $scope.isSet = function(checkTab) {
	      return $scope.tab === checkTab;
	    };

	    $scope.setTab = function(setTab) {
	      $scope.tab = setTab;
	    };

	})

	.controller('importanteCtrl', function($scope, Importantes, accionesTabla) 
	{
		$scope.pedidos = Importantes.query();
		/*Variables de paginacion*/
		$scope.curPage = 0;
	 	$scope.pageSize = 6;
	 	$scope.numberOfPages = function() {
			return Math.ceil($scope.pedidos.length / $scope.pageSize);
		};

		$scope.abrir = function(id)
		{
			accionesTabla.visto(id); 
		}

		$scope.cambiar = function(id)
		{
			for (var i = $scope.pedidos.length - 1; i >= 0; i--) {
				if(id == $scope.pedidos[i].id)
				{
				    accionesTabla.importante(id, $scope.pedidos[i].importante);
					$scope.pedidos[i].importante = ($scope.pedidos[i].importante == false)	? true : false;
					break;				
				}
			};
		}

		$scope.$on('onRepeatLast', function(scope, element, attrs){
			angular.element('.minimal input').iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal',
				increaseArea: '20%'
			});
		});
	})

	.controller('responderCtrl', function($scope, $routeParams, Contesta) 
	{
		Contesta.datos($routeParams.id, function(data) {
        	$scope.datos = data[0];
        	$scope.asunto = "Su pedido ha sido atendido";
        	$scope.mensaje = "Su pedido tartara aproximadamente <Escribir aqui el tiempo que tardara> minutos en llegar a esta direccion:  "+$scope.datos.direccion;
        });

        $scope.enviar = function()
        {
        	var detalles = {
        		"id" : $routeParams.id,
        		"destinatario" : $scope.datos.correo,
        		"asunto" : $scope.asunto,
        		"mensaje": $scope.mensaje
        	};
        	Contesta.enviar(detalles)
        	.then(function(data) {
            // promise fulfilled
            if (data.respuesta ==='bien') {
                swal("Enviado!", "Correo de contestacion enviado.", "success");
            } else {
                swal("Correo no enviado!", "Correo de contestacion no enviado, revise los campos.", "error");
            }
            }, function(error) {
                swal("Error!", "Ha ocurrido un error intente recargando la pagina.", "error");
            });
        }

        $scope.cancelar = function()
        {
        	document.location.href = "http://localhost/administrador/app/pedidos/#/vista/"+$routeParams.id
        }
	})

	.controller('eliminadoCtrl', function($scope, Eliminado, accionesTabla) 
	{
		$scope.pedidos = Eliminado.query();
		/*Variables de paginacion*/
		$scope.curPage = 0;
	 	$scope.pageSize = 6;
	 	$scope.numberOfPages = function() {
			return Math.ceil($scope.pedidos.length / $scope.pageSize);
		};

		$scope.abrir = function(id)
		{
			accionesTabla.visto(id); 
		}

		$scope.cambiar = function(id)
		{
			for (var i = $scope.pedidos.length - 1; i >= 0; i--) {
				if(id == $scope.pedidos[i].id)
				{
				    accionesTabla.importante(id, $scope.pedidos[i].importante);
					$scope.pedidos[i].importante = ($scope.pedidos[i].importante == false)	? true : false;
					break;				
				}
			};
		}

		$scope.$on('onRepeatLast', function(scope, element, attrs){
			angular.element('.minimal input').iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal',
				increaseArea: '20%'
			});
		});
	})

	.controller('contestadoCtrl', function($scope, Contestados, accionesTabla) 
	{
		$scope.pedidos = Contestados.query();
		/*Variables de paginacion*/
		$scope.curPage = 0;
	 	$scope.pageSize = 6;
	 	$scope.numberOfPages = function() {
			return Math.ceil($scope.pedidos.length / $scope.pageSize);
		};

		$scope.abrir = function(id)
		{
			accionesTabla.visto(id); 
		}

		$scope.cambiar = function(id)
		{
			for (var i = $scope.pedidos.length - 1; i >= 0; i--) {
				if(id == $scope.pedidos[i].id)
				{
				    accionesTabla.importante(id, $scope.pedidos[i].importante);
					$scope.pedidos[i].importante = ($scope.pedidos[i].importante == false)	? true : false;
					break;				
				}
			};
		}

		$scope.$on('onRepeatLast', function(scope, element, attrs){
			angular.element('.minimal input').iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal',
				increaseArea: '20%'
			});
		});
	})

	.filter('capitalize', function() {
	  return function(input, scope) {
	    if (input!=null)
	    input = input.toLowerCase();
	    return input.substring(0,1).toUpperCase()+input.substring(1);
	  }
	})

	.directive('onLastRepeat', function() {
        return function(scope, element, attrs) {
            if (scope.$last) setTimeout(function(){
                scope.$emit('onRepeatLast', element, attrs);
            }, 1);
        };
    })

    .directive('mapa', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'mapa.html',
	    controller: function() {

	    },
	    scope: {
            latitud: '@',
            longitud: '@'
        },
	    link: function(scope, iElement, iAttrs){
	    iniciar();
	    function iniciar(){

	    var styles = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
		var styledMap = new google.maps.StyledMapType(styles,{name: "Lázaro Cárdenas"});
	    var myCenter=new google.maps.LatLng(scope.latitud,scope.longitud);
		var mapProp = {
		  center:myCenter,
		  zoom:18,
		  streetViewControl:false,
		  panControl:false,
		  zoomControlOptions: {
		      style:google.maps.ZoomControlStyle.SMALL
		    },
		  mapTypeControlOptions: {
	  	    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	 	   }
		  };

		var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
		var marker=new google.maps.Marker({
		  position:myCenter,
		});

		marker.setMap(map);
		map.mapTypes.set('map_style', styledMap);
  		map.setMapTypeId('map_style');

		var infowindow = new google.maps.InfoWindow({
		  content:"Aqui ordenaron la pizza"
		});
		infowindow.open(map,marker);
	    }

		scope.$watch('latitud', function(newValue, oldValue) { 
            iniciar();
        });

	    },
	    controllerAs: 'mapaCtrl'
	  };
	})

	.controller('perfilCtrl', function($scope, $http) 
	{
		$scope.nombrePerfil = "";
		$http.get('http://localhost/administrador/app/ajustes/php/usn/')
		.then(function(respuesta) {
           $scope.nombrePerfil = respuesta.data.nombre;
        }, function(error) {

        });
	});

})();