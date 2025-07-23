import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router";

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<News key="gen" pageSize={10} country="us" category="general" />}
            />
            <Route
              path="/business"
              element={<News key="business" pageSize={10} country="us" category="business" />}
            />
            <Route
              path="/entertainment"
              element={
                <News key="entertainment" pageSize={10} country="us" category="entertainment" />
              }
            />
            <Route
              path="/general"
              element={<News key="general" pageSize={10} country="us" category="general" />}
            />
            <Route
              path="/health"
              element={<News key="health" pageSize={10} country="us" category="health" />}
            />
            <Route
              path="/science"
              element={<News key="science" pageSize={10} country="us" category="science" />}
            />
            <Route
              path="/sports"
              element={<News key="sports" pageSize={10} country="us" category="sports" />}
            />
            <Route
              path="/technology"
              element={
                <News key="tech" pageSize={10} country="us" category="technology" />
              }
            />
            {/* <Route path="/about" element={} /> */}
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
