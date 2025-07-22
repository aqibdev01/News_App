import React, { Component } from "react";
import NewsItem from "./Newsitem";

export default class News extends Component {
  articles = [];

  constructor(props) {
    super();
    this.state = {
      articles: this.articles,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=a39486d08df74da581515ee665e95829";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
  }

  handlePreviousClick = async () => {
    console.log("object");
  };
  handleNextClick = async () => {
    console.log("object");
  };
  render() {
    return (
      <div className="container my-3">
        <h2>News Agent - Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div class="container d-flex justify-content-around">
          <button
            type="button"
            class="btn btn-primary"
            onClick={handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
