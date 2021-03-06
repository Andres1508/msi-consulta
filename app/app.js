define([
	'jquery',
	'collection/operativos'
], function ($, OperativosColeccion) {
	var App = {
		iniciarApp: function () {
			var operativosColeccion = new OperativosColeccion();

			var promesaPeticion = $.getJSON(
				'http://api.datosabiertos.msi.gob.pe/datastreams/invoke/APOYO-OPERA-A-PNP',
				{
					auth_key: '21d66613f28deea018bc3d1b0f8fcd7e79c5bded',
					output: 'json_array'
				}
			);

			$.when(promesaPeticion).done(function (datosApi) {
				$.each(datosApi.result, function (index, dato) {
					if (index >= 1) {
						operativosColeccion.add({
							tipo: dato[1],
							categoria: dato[2],
							numero: dato[3],
							caso: dato[4],
							dia: dato[5],
							fecha: dato[6],
							hora: dato[7],
							modalidad: dato[8],
							medio: dato[9],
							sector: dato[10]
						});
					}
				});
			});
		}
	};

	return App;
});
