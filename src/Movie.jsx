import {useState} from 'react';

const Movie = () => {
    const [formData, setFormData] = useState({id: '', title: '', releaseYear: '', genre: '', monthOfTheYear: ''});
    const [maxId, setMaxId] = useState(0);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name] : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // handleCreate(formData);
        // console.log(formData);
        setFormData({id:'', title : '', releaseYear: '', genre: '', monthOfTheYear:''});
    }

    return <>
        <form>
            <input 
                type="text"
                name="title"
                placeholder='Movie Title'
                value={formData.title}
                onChange={handleFormChange}
            />
            <input 
                type="text"
                name="releaseYear"
                placeholder='Release Year'
                value={formData.releaseYear}
                onChange={handleFormChange}
            />
            <input 
                type="text"
                name="genre"
                placeholder='Genre'
                value={formData.genre}
                onChange={handleFormChange}
            />
            <input 
                type="number"
                name="monthOfTheYear"
                placeholder='What month would you like to watch this movie?'
                value={formData.monthOfTheYear}
                onChange={handleFormChange}
            />
            <button onClick={handleSubmit}>Add Movie</button> 
        </form>
    </>
}

export default Movie;