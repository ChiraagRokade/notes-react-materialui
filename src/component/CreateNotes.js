import React, { useState } from "react";
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import SendIcon from '@material-ui/icons/Send';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup
} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles( {
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
} );

const CreateNote = () => {
  const classes = useStyles();
  const history = useNavigate();
  const [ title, setTitle ] = useState( '' );
  const [ titleError, setTitleError ] = useState( false );
  const [ details, setDetails ] = useState( false );
  const [ detailsError, setDetailsError ] = useState( false );
  const [ category, setCategory ] = useState();

  const handleSubmit = ( e ) => {
    e.preventDefault();

    if ( title === '' )
    {
      setTitleError( true );
    }

    if ( details === '' )
    {
      setDetailsError( true );
    }

    if ( title && details )
    {
      fetch( 'http://localhost:8000/notes', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify( { title, details, category } )
      } ).then( () => history( '/' ) );
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a new Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={ handleSubmit }>
        <TextField
          onChange={ ( e ) => setTitle( e.target.value ) }
          className={ classes.field }
          label="Note Title"
          variant="outlined"
          fullWidth
          required
          error={ titleError }
        />

        <TextField
          onChange={ ( e ) => setDetails( e.target.value ) }
          className={ classes.field }
          label="Description"
          variant="outlined"
          multiline
          rows={ 4 }
          fullWidth
          required
          error={ detailsError }
        />

        <FormControl className={ classes.field }>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={ category } onChange={ ( e ) => setCategory( e.target.value ) }>
            <FormControlLabel value="money" control={ <Radio /> } label="Money" />
            <FormControlLabel value="todos" control={ <Radio /> } label="Todos" />
            <FormControlLabel value="reminders" control={ <Radio /> } label="Reminders" />
            <FormControlLabel value="works" control={ <Radio /> } label="Works" />
          </RadioGroup>
        </FormControl>

        <Button
          onClick={ () => console.log( 'You Click me😡' ) }
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={ <SendIcon /> }
        >
          Submit
        </Button>
      </form>


    </Container >
  );
}

export default CreateNote;