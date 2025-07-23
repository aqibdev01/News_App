import React, { Component } from "react";
import NewsItem from "./Newsitem";
import Spinner from "./Spinner";

export default class News extends Component {
  constructor(props) {
    super();
    this.state = {
      totalResults: 0,
      articles: [],
      page: 1,
      loading: false,
    };
  }

  async componentDidMount() {
    const api_key = process.env.REACT_APP_YOUR_API_KEY;
    let url = `${api_key}&page=${1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
    });
  }

  handlePreviousClick = async () => {
    const api_key = process.env.REACT_APP_YOUR_API_KEY;
    let url = `${api_key}&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  handleNextClick = async () => {
    const api_key = process.env.REACT_APP_YOUR_API_KEY;
    let url = `${api_key}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h2>News Agent - Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
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
            disabled={
              this.state.page ===
              Math.ceil(this.state.totalResults / this.state.pageSize)
            }
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
