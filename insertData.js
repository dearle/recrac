var data = require('./data.json')
var Event = require('./models/event');
const db = require('./db')

var insertData = function() {
    data.forEach((item) => {
        var newEvent = new Event({
            name: item.name,
            description: item.description,
            host: item.host,
            type: item.type,
            location: { address: item.location.address, lng: 0, lat: 0 },
            desiredParticipants: item.desiredParticipants,
            time: item.time,
            price: item.price,
            confirmedParticipants: item.confirmedParticipants,
            potentialParticipants: item.potentialParticipants
        });
        newEvent.save(function (err, newEvent) {
            if (err) {
                console.error("Error is ", err);
                return handleError(err);
            }
            console.log('Success: ', newEvent);
        });
    });
};

insertData();