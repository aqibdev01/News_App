import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let {
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      postedAt,
      sourceName,
    } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <ul className="list-group border-0">
              <li className="list-group-item border-0 d-flex align-items-start">
                <span className="badge text-bg-primary rounded-pill me-2">
                  {sourceName}
                </span>
                <div className="ms-2">
                  <div className="fw-bold"></div>
                </div>
              </li>
            </ul>

            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p class="card-text">
              <small class="text-body-secondary">
                By {author} on
                <br />
                {postedAt}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
