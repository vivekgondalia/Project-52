import {useState} from 'react';

const Movie = ({onAdd, onCancel}) => {
    const [formData, setFormData] = useState({title: '', year: '', month: ''});

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name] : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let movieDto = {
            "title" : formData.title,
            "year" : formData.year,
            "month" : formData.month
        }
        //console.log(`Please send this to DB via API : ${JSON.stringify(movieDto)}`);
        onAdd(movieDto);
        setFormData({title : '', year: '', month: ''});
    }

    const handleCancel = () => {
        onCancel();
    }

    return <>
        <form className="addMovieWrapper">
            <input
                className='addManualTitle' 
                type="text"
                name="title"
                placeholder='Movie Title'
                value={formData.title}
                onChange={handleFormChange}
            />
            <input 
                type="text"
                name="year"
                placeholder='Release Year'
                value={formData.year}
                onChange={handleFormChange}
            />
            <input 
                type="text"
                name="month"
                placeholder='Preferred Month'
                value={formData.month}
                onChange={handleFormChange}
            />
            <div className="addMovieButtonWrapper">
                <button className="buttonAddManual" onClick={handleSubmit}>Add Movie</button> 
                <button className="buttonCancelManual" onClick={handleCancel}>Cancel</button> 
            </div>
        </form>
    </>
}

export default Movie;