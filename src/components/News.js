import React, { useState, useEffect } from "react";
import NewsItem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [totalResults, setTotalResults] = useState(0);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const updateNews = async () => {
    props.setProgress(10);
    const newsUrl = process.env.REACT_APP_YOUR_URL;
    const api = process.env.REACT_APP_YOUR_API_KEY;
    let url = `${newsUrl}country=${props.country}&category=${props.category}&apiKey=${api}&page=${page}&pageSize=${props.pageSize}`;
    console.log(url);
    props.setProgress(40);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(80);

    setTotalResults(parsedData.totalResults);
    setArticles(parsedData.articles);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    let nextPage = page + 1;
    setPage(nextPage);
    const newsUrl = process.env.REACT_APP_YOUR_URL;
    const api = process.env.REACT_APP_YOUR_API_KEY;
    let url = `${newsUrl}country=${props.country}&category=${props.category}&apiKey=${api}&page=${nextPage}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();
    const newArticles = parsedData.articles.filter(
      (a) => !articles.some((b) => b.url === a.url)
    );
    const newNewArticle = articles.concat(newArticles).length;
    setTotalResults(newNewArticle);
    setArticles(articles.concat(newArticles));
  };

  return (
    <>
      <h2 className="text-center">News Agent - Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {this.state.articles.map((element, index) => {
              return (
                <div className="col md-4" key={element.url}>
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
};

News.deafultProps = {
  country: "us",
  category: "general",
  pageSize: 10,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
