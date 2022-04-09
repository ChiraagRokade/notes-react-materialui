import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateNotes from './component/CreateNotes';
import Notes from './component/Notes'
import { createTheme, ThemeProvider } from "@material-ui/core";
import { purple } from '@material-ui/core/colors';
import Layout from './component/Layout';

const theme = createTheme( {
  patelette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple[ 500 ]
  }
} )

function App () {
  return (
    <div>
      <ThemeProvider theme={ theme }>
        <BrowserRouter>
          <Layout >
            <Routes>
              <Route exact path='/' element={ <Notes /> } />
              <Route path='/CreateNotes' element={ <CreateNotes /> } />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
