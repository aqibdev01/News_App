import React, { Component } from "react";
import NewsItem from "./Newsitem";

export default class News extends Component {
  articles = [];

  constructor(props) {
    super();
    this.state = {
      totalResults: 0,
      articles: this.articles,
      page: 1,
      pageSize: 20,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=a39486d08df74da581515ee665e95829&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
    });
  }

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=a39486d08df74da581515ee665e95829&page=${
      this.state.page - 1
    }&pageSize=${ this.state.pageSize }`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
    });
  };

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=a39486d08df74da581515ee665e95829&page=${
      this.state.page + 1
    }&pageSize=${ this.state.pageSize }`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
    });
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
        <div className="container d-flex justify-content-around">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={this.state.page === (Math.ceil( this.state.totalResults / this.state.pageSize )) }
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
