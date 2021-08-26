//alert("alert")
$(document).ready(function(){//que jquery se cargue despues del DOM
    $('form').submit(function(event){
        event.preventDefault()// para q no redireccione a la url del atributo action del form

        let valueInput = $('#pokemonInput').val();// para almacenar el valor del input

        //alert(valueInput);
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + valueInput,// concatena a la url el valor de input(nombre pokemon o id)
            success: function(data){ // atributo de ajax q recibira la data

                //console.log(data)
                let nombre = data.name;//datos del json de la api
                let imagen = data.sprites.front_default;//datos del json de la api sprites=imagenes, front_default=de frente
                let peso = data.weight;//datos del json de la api

                //template o plantilla donde irá el resultado de los datos
                // en el id de pokeInfo crear en html un div un h3 un img y un h6 todos con sus datos
		//inyectar
                $('#pokeInfo').html(`
                <div class="text-center">
                    <h3>${nombre}</h3>
                    <img src="${imagen}" alt="">
                    <h6>peso ${peso}:</h6>
                </div>
                `)

                let estadisticas = []// la creamos para dar datos a dataPoints y poder crear el grafico 
                data.stats.forEach(function(s) {
                    estadisticas.push({
                        label: s.stat.name,// eje x
                        y : s.base_stat, //eje y vertical valor stat en json de estadisticas
                    })
                })

                let config = { //objeto de configuracion
                    animationEnabled : true,// para q se genere una animacion
                    title: {
                        text: "Estadisticas",
                    },
                    axisY: {
                        title:"Valor",// eje vertical de valor numerico
                    },
                    axisX:{
                        title:"Estadistica",// hp vel ataque defensa
                    },
                    data: [
                        {
                            type:"column",
                            dataPoints:estadisticas,// array de obj q contempla los valores de cada columna, le agregamos estadisticas personalizadas
                        },
                    ],
                };
                let chart = new CanvasJS.Chart("pokeStats", config);//crear grafico con los datos de configuracion
                chart.render();//renderización
            },
        });
    });
});