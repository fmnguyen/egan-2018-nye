'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

var io = (0, _socket2.default)(app.server);

app.use((0, _morgan2.default)('dev'));

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());

app.use(_express2.default.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '/public/index.html'));
});

io.on('connection', function (socket) {
    console.log('a user connected');
});

app.server.listen(process.env.PORT || 1234, function () {
    console.log('Started on port ' + app.server.address().port);
});