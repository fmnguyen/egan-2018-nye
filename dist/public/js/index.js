'use strict';

var postFormData = function postFormData(data) {
    return axios.post('/submitText', data).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
};

$(document).ready(function () {
    $('.form').submit(function (e) {
        e.preventDefault();
        var data = $('.form').serializeArray();
        var res = postFormData(data);
    });
});