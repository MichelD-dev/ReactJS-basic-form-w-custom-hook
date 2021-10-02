import useInput from '../hooks/use-input'
import validator from 'validator'

const isNotEmpty = value => value.trim() !== ''
const isEmail = value => validator.isEmail(value)

const BasicForm = () => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty)

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty)

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isNotEmpty && isEmail)

  let formIsValid = false
  firstNameIsValid && lastNameIsValid && emailIsValid && (formIsValid = true)

  const submitChangeHandler = e => {
    e.preventDefault()
    if (!formIsValid) {
      return
    }
    resetFirstName()
    resetLastName()
    resetEmail()
  }

  return (
    <form onSubmit={submitChangeHandler}>
      <div className='control-group'>
        <div className={`form-control ${firstNameHasError && 'invalid'}`}>
          <label htmlFor='firstname'>First Name</label>
          <input
            type='text'
            id='firstname'
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
                <p className='error-text'>
          {firstNameHasError && 'Please enter a valid first name.'}
        </p>
        </div>

        <div className={`form-control ${lastNameHasError && 'invalid'}`}>
          <label htmlFor='lastname'>Last Name</label>
          <input
            type='text'
            id='lastname'
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
              <p className='error-text'>
          {lastNameHasError && 'Please enter a valid last name.'}
        </p>
      </div>
      </div>

      <div className={`form-control ${emailHasError && 'invalid'}`}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      <p className='error-text'>
        {emailHasError && 'Please enter a valid email. '}
      </p>

      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  )
}

export default BasicForm
