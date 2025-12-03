import BreadCrumb from "@/components/common/breadCrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ContactSchema } from "@/utils/formschema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const [char, setChatLen] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ContactSchema),
  });

  const handelContact = (data: any) => {
    console.log("🚀 ~ handelContact ~ data:", data);
  };

  const messageValue = watch("message", "");
  useEffect(() => {
    setChatLen(messageValue.length);
  }, [messageValue]);

  return (
    <div className="">
      <BreadCrumb
        items={[{ label: "Home", href: "/e-book/home" }, { label: "Contact" }]}
      />
      <h1 className="text-4xl font-bold mb-8 dark:text-white mt-6">Contact Us</h1>

      {/* Contact Information and Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className="dark:bg-dark-primary rounded-lg shadow-lg p-6 dark:text-white">
            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5  mt-1 mr-3" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="">45 Thali Street</p>
                  <p className="">Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="">+977-98614965784</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="">info@kathmandubooks.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form
            className="dark:bg-dark-primary dark:text-white rounded-lg shadow-lg p-6"
            onSubmit={handleSubmit(handelContact)}
          >
            <h3 className="text-xl font-semibold mb-4">Book Inquiry</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col ">
                <Label htmlFor="name" className="block text-sm  mb-1">
                  Your Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  className={`${
                    errors?.name ? "border-red-500" : "dark:border dark:border-gray-3"
                  } w-full px-4 py-2 border  rounded-md  dark:bg-dark-secondary  dark:placeholder:text-white`}
                  placeholder="John Doe"
                  {...register("name")}
                />
                {errors?.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col ">
                <Label htmlFor="email" className="block text-sm  mb-1">
                  Your Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  className={`${
                    errors?.email ? "border-red-500" : "dark:border dark:border-gray-3"
                  } w-full px-4 py-2 border  rounded-md  dark:bg-dark-secondary  dark:placeholder:text-white`}
                  placeholder="john@example.com"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col ">
              <Label htmlFor="subject" className="block text-sm  mb-1">
                Phone Number
              </Label>
              <Input
                type="text"
                id="phoneNumber"
                className={` ${
                  errors?.phoneNumber ? "border-red-500" : "dark:border dark:border-gray-3"
                  } w-full px-4 py-2 border  rounded-md  dark:bg-dark-secondary  dark:placeholder:text-white`}
                placeholder="+977-98********"
                {...register("phoneNumber")}
              />
              {errors?.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mt-4">
              <Label htmlFor="subject" className="block text-sm  mb-1">
                Subject
              </Label>
              <Input
                type="text"
                id="subject"
                className={` ${
                  errors?.subject ? "border-red-500" : "dark:border dark:border-gray-3"
                  } w-full px-4 py-2 border  rounded-md  dark:bg-dark-secondary  dark:placeholder:text-white`}
                placeholder="Book request or question"
                {...register("subject")}
              />
              {errors?.subject && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="grid w-full gap-1.5 mt-4">
              <Label htmlFor="message" className="">
                Your Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here."
                maxLength={500}
                className={`${
                  errors?.message ? "border-red-500" : "dark:border dark:border-gray-3"
                  } w-full px-4 py-2 border  rounded-md  dark:bg-dark-secondary  dark:placeholder:text-white text-xs`}
                {...register("message")}
                onChange={(e) => {
                  register("message").onChange(e); // Register form update
                  setChatLen(e.target.value.length); // Update char count
                }}
              />

              {errors?.message ? (
                <p className="text-error-red text-xs mt-1">
                  {errors.message.message}
                </p>
              ) : (
                <div className="flex w-full flex-wrap justify-between ">
                  <p className="text-sm ">
                    Your message will be copied to the support team.
                  </p>
                  <p>
                    <span className="text-sm ">Character Limit: </span>
                    <span className="text-sm font-medium ">{char}/500</span>
                  </p>
                </div>
              )}
            </div>

            <Button
            aria-label="send inquiry"
              type="submit"
              className="w-full mt-4 bg-green-secondary
               hover:bg-green-primary 
               text-white cursor-pointer
                py-2 px-4 rounded-md
                transition duration-300"
            >
              Send Inquiry
            </Button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 dark:text-white">
          Visit Our Physical Store
        </h2>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9 w-full h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625953805!2d85.29111337431642!3d27.70895594443863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1712444580000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of Kathmandu, Nepal"
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="bg-gray-100 p-4">
            <p className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              Kathmandu, Nepal
              <Link
                to="https://goo.gl/maps/JLZzG7D9tZTgeFuS8"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center text-gray-800 hover:text-gray-600"
              >
                View larger map
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
