import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

export const AwardTemplate = ({ data }) => {
  return (
    <section>&nbsp;</section>
  );
};

AwardTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export default AwardTemplate;

export const AwardPageQuery = graphql`
  query AwardPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
