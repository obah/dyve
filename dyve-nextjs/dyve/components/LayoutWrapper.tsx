import React, { PropsWithChildren } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const LayoutWrapper = ({children}: PropsWithChildren) => {
  return (
    <div>
        <Navbar/>
        <main>{children}</main>
        <Footer />
    </div>
  )
}

export default LayoutWrapper