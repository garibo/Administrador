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

		otherwise({
			redirectTo: '/'
		});
	})

	.factory('Listado',function($resource){
		return $resource('http://localhost/administrador/app/pedidos/php/api/');
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
	  }
	};
	})

	.controller('listaCtrl', function($scope, Listado, $http) 
	{
		$scope.pedidos = Listado.query();

		$scope.abrir = function(pid)
		{
			$http({
		      method: 'POST',
		      data: {'id': pid},
		      url: 'http://localhost/administrador/app/pedidos/php/visto/'
		    });
		}

		$scope.cambiar = function(id)
		{
			for (var i = $scope.pedidos.length - 1; i >= 0; i--) {
				if(id == $scope.pedidos[i].id)
				{
					// $scope.pedidos[i].importante = true;	
					alert("Encontrado "+$scope.pedidos[i].importante);
					break;				
				}
			};
		}

		$scope.puesto = function(pedido)
		{
			return pedido.importante;
		}

		$scope.$on('onRepeatLast', function(scope, element, attrs){
			angular.element('.minimal input').iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal',
				increaseArea: '20%'
			});
		});
	})

	.controller('vistaCtrl', function($scope, $routeParams, DatosPedido) 
	{
		DatosPedido.datos($routeParams.id, function(data) {
          $scope.datos = data[0];
        });

        DatosPedido.productos($routeParams.id, function(data) {
          $scope.productos = data;
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
	});

})();