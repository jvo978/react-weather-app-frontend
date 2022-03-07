import '../styles/Form.css'
import { useState } from 'react';
import PropTypes from 'prop-types'

const Form = ({ submitSearch, setError, setErrorMessage }) => {

    const [location, setLocation] = useState('')

    const onSubmitSearch = (event) => {
        event.preventDefault()
        if (!location || location === '') {
          setErrorMessage('Search field cannot be blank')
          setError(true)
          return;
        }
        submitSearch(location)
        setLocation('')
    }

  return (
    <div className="form__container">
    <form className="form__item" onSubmit={onSubmitSearch}>
        <input value={location} type="text" placeholder="Search Location" autoComplete='off' onChange={(event) => setLocation(event.target.value)}/>
         <button type="submit">Search</button>
    </form>
    </div>
  );
}

Form.propTypes = {
    submitSearch: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    setErrorMessage: PropTypes.func.isRequired
}

export default Form;
