$.ajax({
    url         :   'php/mas_vendidos.php',
    type        :   'POST',
    async       :   true
}).
done(function(data){
    var datos = $.parseJSON(data);
    Morris.Bar({
        element: 'graph-bar',
        data: [
            {x: datos[0].nombre, z: datos[0].concurrencia},
            {x: datos[1].nombre, z: datos[1].concurrencia},
            {x: datos[2].nombre, z: datos[2].concurrencia},
            {x: datos[3].nombre, z: datos[3].concurrencia},
            {x: datos[4].nombre, z: datos[4].concurrencia}
        ],
        xkey: 'x',
        ykeys: ['z'],
        labels: ['Cantidad'],
        barColors:['#79D1CF']


    });
});

$.ajax({
    url         :   'php/mas_pedidos.php',
    type        :   'POST',
    async       :   true
}).
done(function(data){
    var datos = $.parseJSON(data);
    var total = (parseInt(datos[0].total_otros) + parseInt(datos[0].total_pizzas) + parseInt(datos[0].total_refrescos));
    var Pizzas = ((parseInt(datos[0].total_pizzas) / total) * 100).toFixed(0);
    var Otros =  ((parseInt(datos[0].total_otros) / total) * 100).toFixed(0);
    var Bebidas = ((parseInt(datos[0].total_refrescos) / total) * 100).toFixed(0);
Morris.Donut({
    element: 'graph-donut',
    data: [
        {value: Pizzas, label: 'Pizzas', formatted: 'Por lo menos un '+Pizzas+'%' },
        {value: Otros, label: 'Otros platillos', formatted: 'aprox. '+Otros+'%' },
        {value: Bebidas, label: 'Bebidas', formatted: 'Casi '+Bebidas+'%' }
    ],
    backgroundColor: '#fff',
    labelColor: '#1fb5ac',
    colors: [
        '#E67A77','#D9DD81','#79D1CF','#95D7BB'
    ],
    formatter: function (x, data) { return data.formatted; }
});
});

$.ajax({
    url         :   'php/pedidos.php',
    type        :   'GET',
    async       :   true
}).
done(function(data){
    var datos = $.parseJSON(data);
    var day_data = [
    {"elapsed": datos[0].mes, "value": datos[0].cantidad},
    {"elapsed": datos[1].mes, "value": datos[1].cantidad},
    {"elapsed": datos[2].mes, "value": datos[2].cantidad},
    {"elapsed": datos[3].mes, "value": datos[3].cantidad},
    {"elapsed": datos[4].mes, "value": datos[4].cantidad},
    {"elapsed": datos[5].mes, "value": datos[5].cantidad}
    ];
    Morris.Line({
        element: 'graph-area-line',
        data: day_data,
        xkey: 'elapsed',
        ykeys: ['value'],
        labels: ['Cantidad'],
        lineColors:['#1FB5AD'],
        parseTime: false
    });

});