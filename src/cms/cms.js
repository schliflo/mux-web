import CMS from "netlify-cms";

import ContentPagePreview from "./preview-templates/ContentPagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", ContentPagePreview);
CMS.registerPreviewTemplate("contact", ContentPagePreview);
CMS.registerPreviewTemplate("imprint", ContentPagePreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);
