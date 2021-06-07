import Register from '../src/components/Register'
import Login from '../src/components/Login'
import Home from '../src/components/Home'
import Navbar from '../src/components/Navbar'
import Index from '../src/components/Index'
import { BrowserRouter, Route } from 'react-router-dom'
import NoteState from './context/notes/noteState'
import AlertState from './context/alerts/alertState'
import AuthState from './context/auth/authState'
import authToken from './config/tokenAuth'
import PrivateRoute from './components/PrivateRoute'


// Revisar si tengo un token
const token = localStorage.getItem('token')
if(token) {
  authToken(token)
}


function App() {

  
  return (
    <div className="App">
      <AlertState>
        <AuthState>
          <NoteState>
            <BrowserRouter>
                <Navbar />
                <Route path="/" component={Index} exact />
                <PrivateRoute path="/home"  component={Home} exact />                   
                <Route path='/register' component={Register} exact />
                <Route path='/login' component={Login} exact />
                                      
            </BrowserRouter>
          </NoteState>
        </AuthState>  
      </AlertState>
    </div>
  );
}

export default App;
