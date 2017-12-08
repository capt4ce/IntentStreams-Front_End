var FluxCartActions = require('../Actions/streamsAction');

import axios from 'axios';


module.exports = {

    getDataValue: function (query) {
        console.log(query)
        // var post = [
        //     {
        //         title: "hello",
        //         description: "bcvn vsovbcozhv znj  bfhvo",
        //         latitude: "88",
        //         longitude: "24"
        //     },
        //     {
        //         title: "ola",
        //         description: "bcvn vsovbcozhv znj  bfhvo",
        //         latitude: "78",
        //         longitude: "24"
        //     },
        //     {
        //         title: "bye",
        //         description: "bcvn vsovbcozhv znj  bfhvo",
        //         latitude: "48",
        //         longitude: "24"
        //     },
        //     {
        //         title: "sayonara",
        //         description: "bcvn vsovbcozhv znj  bfhvo",
        //         latitude: "28",
        //         longitude: "24"
        //     }
        // ];


        // var keyword = [
        //     {
        //         title: "h",
        //         weight: "0.2"
        //     },
        //     {
        //         title: "o",
        //         weight: "0.4"
        //     },
        //     {
        //         title: "b",
        //         weight: "0.6"
        //     },
        //     {
        //         title: "s",
        //         weight: "0.8"
        //     }
        // ];

        // FluxCartActions.loadStuffs(post, keyword);
        axios.get('http://localhost:5000/search', {
            params: {
                query: query
            }
        })
            .then(function (response) {
                console.log(response)
                console.log(response.data.success)
                if (response.data.success == true) {
                    FluxCartActions.loadStuffs(response.data.data, response.data.suggested_keywords, response.data.query);
                }

            })

            .catch(function (error) {
                console.log(error);
            });

        // var data=[]
        // var ky=[]
        // axios.get('https://googleapis.com/customsearch/v1', {
        //         params: {
        //             q: query,
        //             key: 'AlzaSyASWpsbC2yHZZA71001234642073522909578:dw7qnkw1euk'
        //         }
        //     })
        //         .then(function (response) {
        //             console.log(response)
        //             for (itm in response.items)
        //                 data.push({name:itm.link,description:itm.snippet})
        //         })
        //         .then(function(){
        //             axios.get('http://api.bing.com/osjson.aspx', {
        //                 params: {
        //                     q: query                        
        //                 }
        //             })
        //                 .then(function (response) {
        //                     console.log(response)
        //                     for (i=0; i<5, response[1].length; i++)
        //                         ky.push({name:response[1][i]})
        //                 })
        //                 .then(function(){
        //                     FluxCartActions.loadStuffs(data, ky);
        //                 })
        //                 .catch(function (error) {
        //                     console.log(error);
        //                 })
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });



    },

}    