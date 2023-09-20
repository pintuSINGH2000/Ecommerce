import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from 'react-helmet';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
        <Helmet>
          <meta charSet='utf-8' />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <Header/>
        <main style={{minHeight:"75vh"}}>
          <ToastContainer />
          {children}
        </main>
        <Footer/>
    </div>
  )
}

Layout.defaultPorps = {
  title: 'Ecommerce app - shop now',
  description: 'mern stack project',
  keywords: "mern;react;node;mongdb",
  author: "Pintu Singh"
}

export default Layout