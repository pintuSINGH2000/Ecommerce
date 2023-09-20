import React from 'react'
import Layout from '../components/Layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport} from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us - Ecommerce app"}>
        <div className='row m-2 m-lg-5'> 
           <div className='col-md-6'>
             <img src="/images/vecteezy_young-business-staff-asian-woman-working-with-headphone-and_6853850_196.jpg"
             alt="contactus"
             class="mt-5"
             style={{width:"100%",minHeight: "38vw"}}
             />
           </div>

           <div className='col-md-6 mt-5 fs-3'>
           <h1 className='bg-dark p-2 mt-5 text-white text-center'>CONTACT US</h1>
           <p className='text-justify mt-5'>
              Any query and info about product feel free to call anytime we 24X7 available
           </p>
           <p className='my-4'>
               <BiMailSend /> : www.help@ecommerceapp.com
           </p>
           <p className='my-4'>
               <BiPhoneCall /> : 012-3456798
           </p>
           <p className='my-4'>
               <BiSupport /> : 1800-0000-0000 (toll free)
           </p>
           </div>
        </div>
    </Layout>

  )
}

export default Contact