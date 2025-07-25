import React from "react";

const Newsitem = (props) => {
  let { title, description, imageUrl, newsUrl, author, postedAt, sourceName } =
    props;
  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <ul className="list-group border-0">
            <li className="list-group-item border-0 d-flex align-items-start">
              <span className="badge text-bg-info rounded-pill me-2">
                {sourceName}
              </span>
              <div className="ms-2">
                <div className="fw-bold"></div>
              </div>
            </li>
          </ul>

          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
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
};

export default Newsitem;
