(function(){

	angular.module('ajustesApp', ['ngResource'])


	.factory('Precios',function($resource){
		return $resource('http://localhost/administrador/app/ajustes/php/precios/api/',{
			id : '@id'
			},{
			'update': { method:'PUT' }
		});
	})

	.filter('capitalize', function() {
	  return function(input, scope) {
	    if (input!=null)
	    input = input.toLowerCase();
	    return input.substring(0,1).toUpperCase()+input.substring(1);
	  }
	})

	.controller('preciosCtrl', function($scope, Precios) 
	{
		$scope.precios = Precios.query();
		var record = new Precios();
		$scope.mNombre = "";
		$scope.mPrecio = 0;
		$scope.editar = function(precio)
		{
			$scope.mNombre = precio.nombre;
			$scope.mPrecio = precio.precio;
			record.id = precio.id;
			record.nombre = precio.nombre;
			record.precio = precio.precio;
		}

		$scope.cambiar = function()
		{
			record.precio = $scope.mPrecio;
			Precios.update({ id: record.id }, record);
			$('#myModal').modal('hide');
			$scope.precios[record.id-1].precio = $scope.mPrecio;
		}


	});

})();