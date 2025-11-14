import BreadCrumb from "@/components/common/breadCrumb";
import { Award, BookMarked, BookOpen, Users, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="container mx-auto ">
      <div>
        <BreadCrumb
          items={[{ label: "Home", href: "/e-book/home" }, { label: "About" }]}
        />
      </div>
      <div className=" mb-16 mt-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block dark:text-white">
          About Us
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl ">
          Discover the story behind Kathmandu's premier literary destination
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-100 dark:border-gray-700 dark:text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <BookOpen className="mr-3 h-6 w-6 text-gray-700 dark:text-white" />
              Our Story
            </h2>
            <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
              Welcome to Kathmandu Books, the premier online bookstore based in
              the beautiful city of Kathmandu, Nepal. We are dedicated to
              bringing the joy of reading to book lovers across Nepal and
              beyond.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Founded in 2010, our bookstore began as a small collection of
              cherished titles and has since grown into a comprehensive online
              library offering thousands of books across all genres, from
              timeless classics to contemporary bestsellers.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border  dark:text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Award className="mr-3 h-6 w-6 text-gray-700 dark:text-white" />
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our mission is to promote literacy and a love for reading
              throughout Nepal while making quality literature accessible to
              everyone. We take pride in our carefully curated collection that
              includes both international titles and works by local Nepali
              authors.
            </p>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-2xl h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
          <img
          loading="lazy"
            src="/public/images/Light mode logo.png"
            alt="Kathmandu Books Store"
            className="w-full h-full object-cover dark:hidden"
          />
          <img
          loading="lazy"
            src="/public/images/darkmode.png"
            alt="Kathmandu Books Store"
            className="w-full h-full object-cover hidden dark:block"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">
            Our Values
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white hover:scale-105 duration-500 dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <BookMarked className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">
              Literary Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in the transformative power of books and strive to
              offer only the highest quality literature across all genres.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 hover:scale-105 duration-500 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">
              Community Building
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We strive to build a community of readers through personalized
              recommendations, author events, and reading clubs that bring book
              enthusiasts together.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 hover:scale-105 duration-500 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <Award className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">
              Cultural Heritage
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We are committed to preserving Nepal's rich literary heritage
              while introducing readers to the best of global literature.
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-10 rounded-xl mb-20 border border-gray-100 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
            Our Vision
          </h2>
          <div className="text-lg text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Our vision is to become Nepal's most beloved literary destination,
              recognized for our vast selection, knowledgeable staff, and
              commitment to promoting both local and international literature.
            </p>
            <p>
              We aspire to be more than just a bookstore – we aim to be a
              cultural hub that fosters intellectual curiosity, celebrates
              diverse perspectives, and preserves Nepal's rich literary heritage
              while introducing readers to the best of global literature.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
          What Our Customers Say
        </h2>

        {/* Scrollable container */}
        <div className="flex  gap-6 px-4 pb-4 scrollbar-thin ">
          <div className="min-w-[280px] max-w-[300px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 p-2.5">
                <Users2 className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-bold dark:text-white">Aarav Sharma</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Book Enthusiast
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">
              "Kathmandu Books has transformed my reading experience. Their
              curated collection introduced me to Nepali authors I never knew
              existed!"
            </p>
          </div>

          <div className="min-w-[280px] max-w-[300px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 p-2.5">
                <Users2 className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-bold dark:text-white">Aarav Sharma</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Book Enthusiast
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">
              "Kathmandu Books has transformed my reading experience. Their
              curated collection introduced me to Nepali authors I never knew
              existed!"
            </p>
          </div>
          <div className="min-w-[280px] max-w-[300px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 p-2.5">
                <Users2 className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-bold dark:text-white">Aarav Sharma</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Book Enthusiast
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">
              "Kathmandu Books has transformed my reading experience. Their
              curated collection introduced me to Nepali authors I never knew
              existed!"
            </p>
          </div>
          <div className="min-w-[280px] max-w-[300px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 p-2.5">
                <Users2 className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-bold dark:text-white">Aarav Sharma</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Book Enthusiast
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">
              "Kathmandu Books has transformed my reading experience. Their
              curated collection introduced me to Nepali authors I never knew
              existed!"
            </p>
          </div>
          <div className="min-w-[280px] max-w-[300px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 p-2.5">
                <Users2 className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </div>
              <div>
                <h4 className="font-bold dark:text-white">Aarav Sharma</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Book Enthusiast
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">
              "Kathmandu Books has transformed my reading experience. Their
              curated collection introduced me to Nepali authors I never knew
              existed!"
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          Join Our Literary Journey
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover our carefully curated collection of books and become part of
          our growing community of readers.
        </p>
        <Link
          to="/e-book/home"
          className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          Explore Our Collection
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
