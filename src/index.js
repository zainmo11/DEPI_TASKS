"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = require("jquery");
var tracks = [
    {
        id: 1,
        name: "Keynote",
        speaker: "Dr. Jane Smith",
        time: "9:00 AM - 10:00 AM",
        room: "Main Hall",
    },
    {
        id: 2,
        name: "Web Development",
        speaker: "Alice Johnson",
        time: "11:00 AM - 12:00 PM",
        room: "Room A",
    },
    {
        id: 3,
        name: "Data Science",
        speaker: "Charlie Green",
        time: "11:00 AM - 12:00 PM",
        room: "Room B",
    },
    {
        id: 4,
        name: "Cloud Computing",
        speaker: "Eva Black",
        time: "11:00 AM - 12:00 PM",
        room: "Room C",
    },
    {
        id: 5,
        name: "Keynote",
        speaker: "Dr. Jane Smith",
        time: "1:00 PM - 2:00 PM",
        room: "Main Hall",
    },
    {
        id: 6,
        name: "Web Development",
        speaker: "Alice Johnson",
        time: "3:00 PM - 4:00 PM",
        room: "Room A",
    },
    {
        id: 7,
        name: "Data Science",
        speaker: "Charlie Green",
        time: "3:00 PM - 4:00 PM",
        room: "Room B",
    },
    {
        id: 8,
        name: "Cloud Computing",
        speaker: "Eva Black",
        time: "3:00 PM - 4:00 PM",
        room: "Room C",
    },
    {
        id: 9,
        name: "Keynote",
        speaker: "Dr. Jane Smith",
        time: "5:00 PM - 6:00 PM",
        room: "Main Hall",
    },
    {
        id: 10,
        name: "Web Development",
        speaker: "Alice Johnson",
        time: "7:00 PM - 8:00 PM",
        room: "Room A",
    },
    {
        id: 11,
        name: "Data Science",
        speaker: "Charlie Green",
        time: "7:00 PM - 8:00 PM",
        room: "Room B",
    },
    {
        id: 12,
        name: "Cloud Computing",
        speaker: "Eva Black",
        time: "7:00 PM - 8:00 PM",
        room: "Room C",
    }
];
// to display the tracks in the table
function displayTracks(tracks) {
    var tableBody = (0, jquery_1.default)('#tracks tbody');
    tableBody.empty();
    var data = '';
    tracks.forEach(function (track) {
        data += "<tr>\n            <td>".concat(track.id, "</td>\n            <td>").concat(track.name, "</td>\n            <td>").concat(track.speaker, "</td>\n            <td>").concat(track.time, "</td>\n            <td>").concat(track.room, "</td>\n        </tr>");
    });
    tableBody.append(data);
}
function displayTracksAsCards(tracks) {
    var cardContainer = (0, jquery_1.default)('#card-container');
    cardContainer.empty();
    tracks.forEach(function (track) {
        var card = "\n            <div class=\"card\">\n                <h3 class=\"card-id\">ID: ".concat(track.id, "</h3>\n                <p><strong>Name:</strong> ").concat(track.name, "</p>\n                <p><strong>Speaker:</strong> ").concat(track.speaker, "</p>\n                <p><strong>Time:</strong> ").concat(track.time, "</p>\n                <p><strong>Room:</strong> ").concat(track.room, "</p>\n            </div>\n        ");
        cardContainer.append(card);
    });
}
// to sort the tracks based on the key
function sortTracks(key) {
    return tracks.sort(function (a, b) {
        if (a[key] < b[key]) {
            return -1;
        }
        if (a[key] > b[key]) {
            return 1;
        }
        return 0;
    });
}
// to search the tracks based on the term
function searchTracks(term) {
    term = term.toLowerCase();
    return tracks.filter(function (track) {
        return track.id.toString().includes(term) ||
            track.name.toLowerCase().includes(term) ||
            track.speaker.toLowerCase().includes(term) ||
            track.time.toLowerCase().includes(term) ||
            track.room.toLowerCase().includes(term);
    });
}
(0, jquery_1.default)(document).ready(function () {
    displayTracks(tracks);
    (0, jquery_1.default)('#tasksInput').on('input', function (event) {
        var target = event.target;
        var sortBy = target.value;
        if (['id', 'name', 'speaker', 'time', 'room'].includes(sortBy)) {
            var sortedTracks = sortTracks(sortBy);
            displayTracks(sortedTracks);
            console.log("Sorted by: ".concat(sortBy), sortedTracks);
        }
        else {
            console.error("Invalid sort key: ".concat(sortBy));
        }
    });
    (0, jquery_1.default)('#searchButton').on('click', function () {
        var searchInput = (0, jquery_1.default)('#searchInput').val();
        var filteredTracks = searchTracks(searchInput);
        displayTracks(filteredTracks);
        console.log("Search term: ".concat(searchInput), filteredTracks);
    });
});
(0, jquery_1.default)(document).ready(function () {
    displayTracksAsCards(tracks);
    (0, jquery_1.default)('#tasksInput').on('input', function (event) {
        var target = event.target;
        var sortBy = target.value;
        var sortedTracks = sortTracks(sortBy);
        displayTracksAsCards(sortedTracks);
    });
    (0, jquery_1.default)('#searchButton').on('click', function () {
        var _a;
        var searchTerm = ((_a = (0, jquery_1.default)('#searchInput').val()) === null || _a === void 0 ? void 0 : _a.toString().toLowerCase()) || '';
        var filteredTracks = tracks.filter(function (track) {
            return track.id.toString().includes(searchTerm) ||
                track.name.toLowerCase().includes(searchTerm) ||
                track.speaker.toLowerCase().includes(searchTerm) ||
                track.time.toLowerCase().includes(searchTerm) ||
                track.room.toLowerCase().includes(searchTerm);
        });
        displayTracksAsCards(filteredTracks);
    });
});
