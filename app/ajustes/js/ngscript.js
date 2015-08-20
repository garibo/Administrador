(function(){

	angular.module('ajustesApp', ['ngResource', 'ngMessages', 'flow'])


	.factory('Precios',function($resource){
		return $resource('http://localhost/administrador/app/ajustes/php/precios/api/',{
			id : '@id'
			},{
			'update': { method:'PUT' }
		});
	})


	.factory('Contras', function ($http, $q) {
	    return {
	        Cambiar: function(contra, contran, contrann) {
	            return $http({
						method: "POST",
						url: "http://localhost/administrador/app/ajustes/php/atnt/api/",
						data: {
							"contra" 	: contra,
							"contran" 	: contran,
							"contrann" 	: contrann
						},
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
			                // something went wrong
			                return $q.reject(response.data);
			            });
	        }
	    };
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
		$scope.aux = 0;
		$scope.editar = function(precio)
		{
			$scope.mNombre = precio.nombre;
			$scope.mPrecio = precio.precio;
			record.id = precio.id;
			record.nombre = precio.nombre;
			record.precio = precio.precio;
			$scope.aux = precio.precio;
		}

		$scope.cambiar = function()
		{
			$('#myModal').modal('hide');
			record.precio = $scope.mPrecio;
			Precios.update({ id: record.id }, record);
			$scope.precios[record.id-1].precio = $scope.mPrecio;
			swal("Precio cambiado!", "El precio ha sido cambiado exitosamente", "success");
		}


	})

	.controller('contraCtrl', function($scope, Contras) 
	{

	$scope.cambiarContra = function()
	{
		Contras.Cambiar($scope.contra, $scope.contran, $scope.contrann)
		.then(function(data) {
            if (data.respuesta === 'bien') {
                swal("Contraseña cambiada!", "La contraseña ha sido cambiada exitosamente", "success");
            	$scope.cancelar();
            } else {
                sweetAlert("Oops...", "Verifica que los campos sean correctos!", "error");
            }
        }, function(error) {
            sweetAlert("Oops...", "ocurrio un error, intenta recargar la pagina!", "error");
        });
	}

	$scope.cancelar = function()
	{
		$scope.contra = ""; 
    	$scope.contran = ""; 
    	$scope.contrann = "";
        $scope.passwordForm.$setUntouched();
	}
	})

	.config(['flowFactoryProvider', function (flowFactoryProvider) {
	  flowFactoryProvider.defaults = {
	    target: 'php/upload/upload.php',
	    permanentErrors: [404, 500, 501],
	    maxChunkRetries: 1,
	    chunkRetryInterval: 5000,
	    simultaneousUploads: 4,
	    singleFile: true
	  };
	  var a;
	  flowFactoryProvider.on('catchAll', function (event) {
	  	a || console.log("solo una vez - ",arguments[1].uniqueIdentifier);
	    a = a || arguments[1].uniqueIdentifier;
	    console.log(a);
	  });
	}]);
})();