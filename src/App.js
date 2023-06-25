import './App.css';
import Form from "./components/Form";
import SignIn from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

function App() {
    return (
        <div className="App">
            <div>Form</div>
            {/*<SignIn/>*/}
            <SignUpForm/>
            {/*<Form/>*/}
        </div>
    );
}

export default App;
