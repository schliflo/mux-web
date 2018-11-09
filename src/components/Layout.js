import React from 'react'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './scss/main.scss'

const TemplateWrapper = ({children}) => (
    <div>
        <Helmet title="Max Neumeier - Video Editor"/>
        <Navbar/>
        <div>{children}</div>
    </div>
);

export default TemplateWrapper
