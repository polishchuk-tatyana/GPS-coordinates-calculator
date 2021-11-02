import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import MapDistance from "./pages/MapDistance";

export const useRoutes = ready => {
    return (
        <Switch>
            <Route path="/" exact>
                <MapDistance />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}