module.exports = {
    Manzano: {
        element : "crop",
        type : "Manzano",
        cycleTime : 10, //Número de horas
        lastProduction : 0,
        baseProduction : 2,
        probability : 0.7,
        product : {
            name : "Manzana",
            icon : {
                src : "https://thumbs.dreamstime.com/b/icono-rojo-de-la-manzana-vector-121885714.jpg",
                width : 32,
                height : 32
            },
            sellPrice : 10
        },
        icon : {
            src : "https://thumbs.dreamstime.com/b/icono-rojo-de-la-manzana-vector-121885714.jpg",
            width : 32,
            height : 32
        },
        buyPrice : 8,
        isBoosted : false
    },
    Cerezo: {
        element : "crop",
        type : "Cerezo",
        cycleTime : 0.005, //Número de horas
        lastProduction : 0,
        baseProduction : 3,
        probability : 0.3,
        product : {
            name : "Cereza",
            icon : {
                src : "https://thumbs.dreamstime.com/b/icono-de-la-cereza-ejemplo-fruta-del-vector-cerezas-dulces-117017917.jpg",
                width : 32,
                height : 32
            },
            sellPrice : 2
        },
        icon : {
            src : "https://thumbs.dreamstime.com/b/icono-de-la-cereza-ejemplo-fruta-del-vector-cerezas-dulces-117017917.jpg",
            width : 32,
            height : 32
        },
        buyPrice : 5,
        isBoosted : false
    },
    Patata: {
        element : "crop",
        type : "Patata",
        cycleTime : 4, //Número de horas
        lastProduction : 0,
        baseProduction : 5,
        probability : 0.4,
        product : {
            name : "Patata",
            icon : {
                src : "https://thumbs.dreamstime.com/b/historieta-del-icono-de-la-patata-icono-de-las-verduras-de-la-chamusquina-del-sistema-de-la-comida-del-eco-78344330.jpg",
                width : 32,
                height : 32
            },
            sellPrice : 4
        },
        icon : {
            src : "https://thumbs.dreamstime.com/b/historieta-del-icono-de-la-patata-icono-de-las-verduras-de-la-chamusquina-del-sistema-de-la-comida-del-eco-78344330.jpg",
            width : 32,
            height : 32
        },
        buyPrice : 16,
        isBoosted : false
    },
    Aguacate: {
        element : "crop",
        type : "Aguacate",
        cycleTime : 4, //Número de horas
        lastProduction : 0,
        baseProduction : 5,
        probability : 0.4,
        product : {
            name : "Aguacate",
            icon : {
                src : "https://static.vecteezy.com/system/resources/thumbnails/000/206/768/small/Avocado_Illustration.jpg",
                width : 32,
                height : 32
            },
            sellPrice : 150
        },
        icon : {
            src : "https://static.vecteezy.com/system/resources/thumbnails/000/206/768/small/Avocado_Illustration.jpg",
            width : 32,
            height : 32
        },
        buyPrice : 800,
        isBoosted : false
    }
}