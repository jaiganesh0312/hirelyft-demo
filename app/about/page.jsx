"use client";

import Link from "next/link";
import { Button, Card, CardBody, Chip, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Chip color="warning" variant="shadow" className="mb-4">
              Transforming Hiring in India
            </Chip>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              About Us
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80">
              Learn about our mission to transform the hiring landscape in India
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="bg-white px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <motion.div variants={fadeInUp} className="prose prose-lg mx-auto">
            <p className="lead text-lg text-gray-700">
              In today&rsquo;s fast-evolving job market, traditional hiring
              platforms often fail to meet the speed, accuracy, and privacy
              expectations of employers and candidates. Many candidates face
              scams, irrelevant job recommendations, and lengthy hiring
              processes. Employers, on the other hand, invest significant time
              and money but still struggle to find the right talent quickly.
            </p>

            <motion.p
              variants={fadeInUp}
              className="font-bold text-xl text-blue-600 mt-8"
            >
              We are here to change that.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-gray-700 mt-4">
              Our company is a next-generation job portal built for verified,
              skill-based, and privacy-protected hiring. We aim to create a
              platform where employers can find the right candidates faster, and
              candidates can discover genuine, skill-matched jobs without
              compromising their privacy or wasting time.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-gray-700 mt-4">
              By combining advanced technology, automation, and human insight,
              we make hiring faster, safer, and smarter.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-gray-700 mt-4">
              Our platform offers features like anonymous communication,
              verified employers, skill-tested candidates, instant interviews,
              and affordable pricing models — specifically tailored for
              startups, MSMEs, corporates, fresh graduates, and blue-collar
              workers across India.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Vision & Mission */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Guiding principles that shape our platform and services
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2 items-stretch">
            <motion.div variants={fadeInUp} className="h-full">
              <Card
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
                isPressable
              >
                <CardBody className="gap-4 p-8">
                  <div className="flex gap-2 items-center">
                    <div className="rounded-full bg-blue-100 p-3 w-fit">
                      <Icon
                        icon="mdi:eye-outline"
                        className="h-8 w-8 text-blue-600"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Our Vision
                    </h2>
                  </div>
                  <Divider className="my-4" />
                  <p className="text-gray-600">
                    To become India&rsquo;s most trusted and fastest-growing
                    skill-based hiring platform, enabling verified and efficient
                    recruitment across every city and industry.
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="h-full">
              <Card
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
                isPressable
              >
                <CardBody className="gap-4 p-8">
                  <div className="flex gap-2 items-center">
                    <div className="rounded-full bg-blue-100 p-3 w-fit">
                      <Icon
                        icon="mdi:flag-outline"
                        className="h-8 w-8 text-blue-600"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Our Mission
                    </h2>
                  </div>
                  <Divider className="my-4" />
                  <p className="text-gray-600">
                    To simplify and secure the hiring process by connecting
                    employers with skill-verified candidates through smart
                    technology, protecting user privacy, and promoting faster
                    employment opportunities at affordable costs.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="bg-white px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover what makes our platform unique
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "mdi:shield-check",
                title: "Verified & Secure",
                description:
                  "All employers and candidates are thoroughly verified to ensure a safe hiring environment.",
              },
              {
                icon: "mdi:lightning-bolt",
                title: "Fast & Efficient",
                description:
                  "Our AI-powered matching system connects the right candidates with the right jobs instantly.",
              },
              {
                icon: "mdi:lock",
                title: "Privacy First",
                description:
                  "Your data is protected with advanced security measures and privacy controls.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className="border-none shadow-md hover:shadow-lg transition-shadow duration-300"
                  isPressable
                >
                  <CardBody className="gap-4 p-6">
                    <div className="rounded-full bg-blue-100 p-3 w-fit">
                      <Icon
                        icon={feature.icon}
                        className="h-6 w-6 text-blue-600"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
            <div className="space-y-4 md:w-2/3">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Experience the Future of Hiring?
              </h2>
              <p className="text-xl text-white/80">
                Join our platform today and revolutionize your hiring or job
                search journey
              </p>
            </div>
            <div className="md:w-1/3">
              <Button
                as={Link}
                href="/auth/register"
                color="warning"
                size="lg"
                className="w-full"
                endContent={<Icon icon="mdi:arrow-right" />}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold">HireLyft</h3>
              <p className="mt-4 text-gray-400">
                Connecting talent with opportunity in a modern job marketplace.
              </p>
              <div className="mt-6 flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon icon="mdi:twitter" className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon icon="mdi:facebook" className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon icon="mdi:linkedin" className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon icon="mdi:instagram" className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold">For Job Seekers</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Browse Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Career Advice
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Create Resume
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Job Alerts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">For Employers</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Post a Job
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Search Resumes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Recruiting Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing Plans
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Company</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} HireLyft. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
