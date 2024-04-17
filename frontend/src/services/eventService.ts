interface Event {
    _id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
    maxAttendance: number;
    description: string;
  }
  
  const getEvents = async () => {
    const events: Event[] = [
      {
        _id: "EV12345",
        title: "Music Concert",
        date: "2024-05-15",
        time: "19:00",
        location: "City Park",
        image: "music_concert.jpg",
        maxAttendance: 500,
        description: "Enjoy live music performances from various artists."
      },
      {
        _id: "EV12346",
        title: "Food Festival",
        date: "2024-06-20",
        time: "12:00",
        location: "Downtown Square",
        image: "food_festival.jpg",
        maxAttendance: 300,
        description: "Taste a variety of delicious foods from different cuisines."
      },
    {
        _id: "EV12347",
        title: "Art Exhibition",
        date: "2024-07-10",
        time: "15:00",
        location: "Art Gallery",
        image: "art_exhibition.jpg",
        maxAttendance: 200,
        description: "Explore stunning artworks from talented artists."
    },
    {
        _id: "EV12348",
        title: "Movie Night",
        date: "2024-08-05",
        time: "20:30",
        location: "Outdoor Theater",
        image: "movie_night.jpg",
        maxAttendance: 400,
        description: "Watch a classic movie under the stars."
    }
    ];
  
    return events;
  };
  
  export { type Event, getEvents };
  