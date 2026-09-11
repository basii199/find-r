import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import FeaturedCategories from "./FeaturedCategories";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
