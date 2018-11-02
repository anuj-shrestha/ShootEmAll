// $(function () {
//     $('form').submit(function () {
//         socket.emit('chat message', $('#m').val());
//         $('#m').val('');
//         return false;
//     });
//     socket.on('chat message', function (msg) {
//         $('#messages').append($('<li>').text(msg));
//     });
//     socket.on('new user', function (msg) {
//         $('#messages').append($('<li>').text(msg));
//     });
// });

// const Socket = () => {
//     var instance;
//     var socket = io('http://localhost:3000/?');
//     return {
//         getInstance: function(){
            
//             if (instance == null) {
//                 instance = new Socket();
//             }

//             return instance;
//         }
//     };
    
// }

const socket = io('http://localhost:3000/?');