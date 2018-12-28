/**
 * Returns a promise representing the response to a post request to a given url
 * @param {} data
 */
const postFormData = (url, data) => {
    return axios.post(url, data)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error)
        });
};

/**
 * Takes an identifier for a form (class or ID), and returns a JSON object representing all the elements of that form
 * @param String formTag
 */
const formToJson = (formTag) => {
    const temp = {};
    $.each($(formTag).serializeArray(), function (i, field) {
        temp[field.name] = field.value;
    });
    return temp;
};

$(document).ready(() => {
    //const socket = io.connect('http://173.250.200.18:843/'); //Make sure this is changed to host IP + :843

    $('.form').submit((e) => {
        e.preventDefault();

        // Take the form elements and convert it into a json object
        const data = formToJson('.form');
        console.log(data);

        // General pattern:
        // 1. On some event, do socket.emit with a protocol (read some string) as the first parameter, data as second param
        //     This protocol responds to a similar socket.on() event that the server is listening to
        // 2. Have a socket listening to an event (socket.on) that the server emits and do something in response
        socket.emit('submitPacket', {
            message: data.submitText
        });
        //const res = postFormData(data);
        return false;
    });

    // Do something in response to a server emitted event
    // In this case, we append a list object to the page, but this can get as complex as necessary
    socket.on('someoneSubmittedSomething', (msg) => {
        $('.container--messages').append($('<li>').text(msg));
    });
});