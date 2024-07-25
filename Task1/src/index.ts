import $ from 'jquery';
interface Track {
    id: number;
    name: string;
    speaker: string;
    time: string;
    room: string;
}
const tracks = [
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
function displayTracks(tracks: Track[]) {
    const tableBody = $('#tracks tbody');
    tableBody.empty();
    let data = '';
    tracks.forEach(track => {
        data += `<tr>
            <td>${track.id}</td>
            <td>${track.name}</td>
            <td>${track.speaker}</td>
            <td>${track.time}</td>
            <td>${track.room}</td>
        </tr>`;
    });
    tableBody.append(data);
}
function displayTracksAsCards(tracks: Track[]) {
    const cardContainer = $('#card-container');
    cardContainer.empty();
    tracks.forEach(track => {
        const card = `
            <div class="card">
                <h3 class="card-id">ID: ${track.id}</h3>
                <p><strong>Name:</strong> ${track.name}</p>
                <p><strong>Speaker:</strong> ${track.speaker}</p>
                <p><strong>Time:</strong> ${track.time}</p>
                <p><strong>Room:</strong> ${track.room}</p>
            </div>
        `;
        cardContainer.append(card);
    });
}

// to sort the tracks based on the key
function sortTracks(key: keyof Track): Track[] {
    return tracks.sort((a, b) => {
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
function searchTracks(term: string): Track[] {
    term = term.toLowerCase();
    return tracks.filter(track =>
        track.id.toString().includes(term) ||
        track.name.toLowerCase().includes(term) ||
        track.speaker.toLowerCase().includes(term) ||
        track.time.toLowerCase().includes(term) ||
        track.room.toLowerCase().includes(term)
    );
}

$(document).ready(() => {
    displayTracks(tracks);

    $('#tasksInput').on('input', (event) => {
        const target = event.target as HTMLInputElement;
        const sortBy = target.value as keyof Track;
        if (['id', 'name', 'speaker', 'time', 'room'].includes(sortBy)) {
            const sortedTracks = sortTracks(sortBy);
            displayTracks(sortedTracks);
            console.log(`Sorted by: ${sortBy}`, sortedTracks);
        } else {
            console.error(`Invalid sort key: ${sortBy}`);
        }
    });

    $('#searchButton').on('click', () => {
        const searchInput = $('#searchInput').val() as string;
        const filteredTracks = searchTracks(searchInput);
        displayTracks(filteredTracks);
        console.log(`Search term: ${searchInput}`, filteredTracks);
    });
});

$(document).ready(() => {
    displayTracksAsCards(tracks);

    $('#tasksInput').on('input', (event) => {
        const target = event.target as HTMLInputElement;
        const sortBy = target.value as keyof Track;
        const sortedTracks = sortTracks(sortBy);
        displayTracksAsCards(sortedTracks);
    });

    $('#searchButton').on('click', () => {
        const searchTerm = $('#searchInput').val()?.toString().toLowerCase() || '';
        const filteredTracks = tracks.filter(track =>
            track.id.toString().includes(searchTerm) ||
            track.name.toLowerCase().includes(searchTerm) ||
            track.speaker.toLowerCase().includes(searchTerm) ||
            track.time.toLowerCase().includes(searchTerm) ||
            track.room.toLowerCase().includes(searchTerm)
        );
        displayTracksAsCards(filteredTracks);
    });
});