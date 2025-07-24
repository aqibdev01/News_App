import React, { Component } from "react";
import NewsItem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static deafultProps = {
    country: "us",
    category: "general",
    pageSize: 5,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

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
    const newsUrl = process.env.REACT_APP_YOUR_URL;
    const api = process.env.REACT_APP_YOUR_API_KEY;
    let url = `${newsUrl}country=${this.props.country}&category=${
      this.props.category
    }&apiKey=${api}&page=${1}&pageSize=${this.props.pageSize}`;
    console.log(url);
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
    });
  }

  handlePreviousClick = async () => {
    const newsUrl = process.env.REACT_APP_YOUR_URL;
    const api = process.env.REACT_APP_YOUR_API_KEY;
    let url = `${newsUrl}country=${this.props.country}&category=${
      this.props.category
    }&apiKey=${api}&page=${this.state.page - 1}&pageSize=${
      this.props.pageSize
    }`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  handleNextClick = async () => {
    const newsUrl = process.env.REACT_APP_YOUR_URL;
    const api = process.env.REACT_APP_YOUR_API_KEY;
    let url = `${newsUrl}country=${this.props.country}&category=${
      this.props.category
    }&apiKey=${api}&page=${this.state.page + 1}&pageSize=${
      this.props.pageSize
    }`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page + 1,
      loading: false,
    });
  };

  fetchMoreData = async () => {
    let nextPage = this.state.page + 1;
    this.setState({
      page: nextPage
    })
    console.log(`This is from fetch more data function ${nextPage}`)
    const newsUrl = process.env.REACT_APP_YOUR_URL;
    const api = process.env.REACT_APP_YOUR_API_KEY;
    let url = `${newsUrl}country=${this.props.country}&category=${
      this.props.category
    }&apiKey=${api}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      totalResults: parsedData.totalResults,
      articles: this.state.articles.concat(parsedData.articles),
    });
  };

  render() {
    return (
      <>
        <h2 className="text-center">News Agent - Headlines</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // {this.state.page < Math.ceil(this.state.totalResults / this.state.articles.length)}
          loader={<Spinner/>}
        >
          
 {         console.log(`Articles length ${this.state.articles.length}`)}
{          console.log(`Total results ${this.state.totalResults}`)}
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((element, index ) => {
                return (
                  <div className="col md-4" key={index}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      postedAt={new Date(element.publishedAt).toUTCString()}
                      sourceName={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
