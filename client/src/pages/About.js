import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row m-lg-4">
        <div className="col-md-6 px-4">
          <img
            src="/images/untitle2.png"
            alt="contactus"
            class="mt-5"
            style={{ width: "100%", minHeight: "38vw" }}
          />
        </div>

        <div className="col-md-6 mt-5 fs-4">
        <h1 className="text-center ff-Pd text-secondary">About Us</h1>
          <p className="p-4">
            Ecommerce, short for electronic commerce, refers to the buying and
            selling of goods and services over the internet. It has become a
            significant and rapidly growing sector of the global economy,
            transforming the way businesses operate and consumers shop.
            Ecommerce has become an integral part of the modern business
            landscape, offering convenience to consumers and new opportunities
            for entrepreneurs and established companies alike. It continues to
            evolve, driven by technology advancements, changing consumer
            preferences, and market dynamics.Many ecommerce businesses expand
            globally to reach a wider audience.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
