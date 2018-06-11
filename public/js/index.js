const socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('LT');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        text: message.text
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('LT');
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    $('#messages').append(html);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    const messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

const locationButton = $('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch your location.');
    });
});


