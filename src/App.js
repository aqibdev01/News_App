import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 8;
  const [progress, setProgress] = useState(0);
  setProgress(progress);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <LoadingBar color="#f11946" progress={progress} />
        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={progress}
                key="gen"
                pageSize={pageSize}
                country="us"
                category="general"
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                setProgress={progress}
                key="business"
                pageSize={pageSize}
                country="us"
                category="business"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                setProgress={progress}
                key="entertainment"
                pageSize={pageSize}
                country="us"
                category="entertainment"
              />
            }
          />
          <Route
            path="/general"
            element={
              <News
                setProgress={progress}
                key="general"
                pageSize={pageSize}
                country="us"
                category="general"
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                setProgress={progress}
                key="health"
                pageSize={pageSize}
                country="us"
                category="health"
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                setProgress={progress}
                key="science"
                pageSize={pageSize}
                country="us"
                category="science"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                setProgress={progress}
                key="sports"
                pageSize={pageSize}
                country="us"
                category="sports"
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                setProgress={progress}
                key="tech"
                pageSize={pageSize}
                country="us"
                category="technology"
              />
            }
          />
          {/* <Route path="/about" element={} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
