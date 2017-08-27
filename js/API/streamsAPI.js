var FluxCartActions = require('../Actions/streamsAction');


module.exports={

     getDataValue: function(data){
         console.log('GetDataValue in API')
     	var post=[
            {
                title : "hello",
                description : "bcvn vsovbcozhv znj  bfhvo",
                latitude : "88",
                longitude : "24"
            },
            {
                title : "ola",
                description : "bcvn vsovbcozhv znj  bfhvo",
                latitude : "78",
                longitude : "24"
            },
            {
                title : "bye",
                description : "bcvn vsovbcozhv znj  bfhvo",
                latitude : "48",
                longitude : "24"
            },
            {
                title : "sayonara",
                description : "bcvn vsovbcozhv znj  bfhvo",
                latitude : "28",
                longitude : "24"
            }
        ];


       var keyword=[
            {
                title : "h",
                weight : "0.2"
            },
            {
                title : "o",
                weight : "0.4"
            },
            {
                title : "b",
                weight : "0.6"
            },
            {
                title : "s",
                weight : "0.8"
            }
        ];



      FluxCartActions.loadStuffs(post,keyword);


     },

 }    