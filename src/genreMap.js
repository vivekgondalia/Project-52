const genreMap = new Map();  // Creating a Map

const genreList = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];

//populate hashmap {id, title}
genreList.forEach(genre => {
    genreMap.set(genre.id, genre.name);
});

//Outputs --> Action  
//console.log(genreMap.get(28));

// // Accessing a value by key
// console.log(hashmap.get('two'));  // Outputs: 2

// // Checking if a key exists
// console.log(hashmap.has('two'));  // Outputs: true

// // Removing a key-value pair
// hashmap.delete('two');

// // Checking again if a key exists after deletion
// console.log(hashmap.has('two'));  // Outputs: false

// // Iterating over keys and values
// hashmap.forEach((value, key) => {
//   console.log(key + ' = ' + value);
// });

// // Using iterator to get keys or values
// for (let [key, value] of hashmap) {
//   console.log(key + ' => ' + value);
// }

export default genreMap;