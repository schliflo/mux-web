import CMS from "netlify-cms";

import ContentPagePreview from "./preview-templates/ContentPagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import AboutPagePreview from "./preview-templates/AboutPagePreview";

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("contact", ContentPagePreview);
CMS.registerPreviewTemplate("imprint", ContentPagePreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);
