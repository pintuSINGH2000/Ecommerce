import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - Ecommerce app"}>
    <div className='row m-lg-4'> 
       <div className='col-md-6 px-4'>
         <img src="/images/vecteezy_group-call-center-workers-in-a-modern-office_2109607.jpg"
         alt="contactus"
         class="mt-5"
         style={{width:"100%",minHeight: "38vw"}}
         />
       </div>

       <div className='col-md-6 mt-5 fs-4'>
       <p className='p-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
       </div>
    </div>
</Layout>
  )
}

export default Policy