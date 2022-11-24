import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../components/contexts/user.context";

import ResetStyles from "../assets/css/reset.styles";
import GlobalStyles from "../assets/css/global.styles";

import SignInScreen from "../components/screens/SignIn.screen";

function App() {
    return (
        <UserContext.Provider value={{}}>
            <ResetStyles />
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignInScreen />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;