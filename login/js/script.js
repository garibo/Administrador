(function(){
	
	angular.module('loginApp', [])

	.factory('Contras', ['$http', '$q', function ($http, $q) {
	    return {
	        logearse: function(contra, email) {
	          return $http({
				method: "POST",
				url: "http://localhost/administrador/app/ajustes/php/atnt/log/index.php",
				data: {
					"contra" 	: contra,
					"email" 	: email
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
	}])

	.controller('preciosCtrl', ['$scope', 'Contras', function($scope, Contras) 
	{
		/*
			contra: pizzeria
			email: admin@pizzeriayes.com
		*/
		$scope.entrar = function()
		{
			var $btn = $("#mandar").button('loading');
			Contras.logearse($scope.contra, $scope.email)
			.then(function(data) {
	            if (data.respuesta === 'ok') {
	            	$btn.button('reset');
	            	document.location.href = "http://localhost/administrador/app/pedidos/#/";
	            } else {
	            	$btn.button('reset');
	            	$(".alert").remove();
	            	$("#posicion").after("<div class='alert alert-danger alert-dismissible' role='alert' style='border-radius:0px;'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><strong>Error de autenticacion!</strong> Revisa que los campos esten correctamente escritos.</div>");
	            }
	        }, function(error) {
	            	$btn.button('reset');
	        });
		}

	}])

})();