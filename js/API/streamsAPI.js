var FluxCartActions = require('../Actions/streamsAction');

import axios from 'axios';


module.exports = {

    getDataValue: function (query) {
        console.log(query)
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
    },

    refreshResult: function (streamIdx, query) {
        console.log(query)
        axios.get('http://localhost:5000/search', {
            params: {
                query: query
            }
        })
            .then(function (response) {
                console.log(response)
                console.log(response.data.success)
                if (response.data.success == true) {
                    FluxCartActions.refreshResult(streamIdx, response.data.data, response.data.suggested_keywords, response.data.query);
                }

            })

            .catch(function (error) {
                console.log(error);
            });
    },

    loadHints: function(query){
        axios.get('http://localhost:5000/search', {
            params: {
                query: query
            }
        })
            .then(function (response) {
                console.log(response)
                console.log(response.data.success)
                if (response.data.success == true) {
                    let hintTitles=[]
                    for (var i=0; i<5; i++)
                        hintTitles.push(response.data.data[i].name)
                    console.log('hint titles: '+ hintTitles)
                    FluxCartActions.hintLoad(hintTitles);
                }

            })

            .catch(function (error) {
                console.log(error);
            });
    }

}    