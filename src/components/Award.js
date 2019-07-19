import React from "react";
import PropTypes from "prop-types";
import icon from "../img/award.svg";

const AwardInner = ({ year, grade, title, category }) => {
  return (
    <div className="award">
      <div className="award__icon-wrap">
        <img className="award__icon" src={icon} alt="award icon"/>
        <span className="award__year">{year}</span>
        <span className="award__grade">{grade}</span>
      </div>
      <span className="award__title">{title}</span>
      <span className="award__category">{category}</span>
    </div>
  );
};

const Award = ({ year, grade, title, category, href }) => {
  if (href) {
    return (
      <a className="award" href={href} title={title} rel="noopener noreferrer" target="_blank">
        <AwardInner year={year} grade={grade} title={title} category={category}/>
      </a>
    );
  }
  return (
    <div className="award">
      <AwardInner year={year} grade={grade} title={title} category={category}/>
    </div>
  );
};

Award.propTypes = {
  year: PropTypes.string,
  grade: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  href: PropTypes.string
};

export default Award;
