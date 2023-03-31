import { createBrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import ResultsPage from "../pages/ResultsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/results",
        element: <ResultsPage />,
    },
]);
