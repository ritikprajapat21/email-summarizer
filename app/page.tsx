"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export default function Home() {
  const headerRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    );

    const refs = [headerRef, featuresRef, pricingRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {" "}
      {/* Updated gradient */}
      {/* Navigation */}
      <nav className="w-full backdrop-blur-md bg-black/20 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500"
          >
            MailSage
          </Link>
          <Button
            className="bg-gradient-to-r from-teal-500 to-purple-500 text-white hover:from-teal-600 hover:to-purple-600"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </nav>
      {/* Main Content with padding-top to account for fixed nav */}
      <div className="pt-20 flex flex-col items-center justify-start p-6">
        {/* Header Section */}
        <header
          ref={headerRef}
          className="w-full max-w-4xl text-center mt-10 opacity-0"
        >
          {" "}
          {/* Start hidden */}
          <h1 className="text-6xl font-extrabold text-transparent text-balance bg-clip-text bg-gradient-to-r from-teal-400 to-gray-200">
            MailSage: Smart Email Insights
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Revolutionize your inbox with AI-driven summarization and automated
            tagging.
          </p>
        </header>

        {/* Features & Benefits Section */}
        <section
          ref={featuresRef}
          className="w-full max-w-4xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0"
        >
          {" "}
          {/* Start hidden */}
          {/* Features */}
          <div className="group transition-all duration-300 border-2 border-transparent hover:border-teal-500/50 rounded-xl w-full sm:max-w-md mx-auto transform hover:scale-105">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-purple-600/20 h-full">
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                Features
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-teal-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Intelligent email summarization powered by AI.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Automated tagging & smart categorization.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Seamless integration with the Gmail API.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Custom email filters and adaptive summary lengths.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Benefits */}
          <div className="group transition-all duration-300 border-2 border-transparent hover:border-teal-500/50 rounded-xl w-full sm:max-w-md mx-auto transform hover:scale-105">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-purple-600/20 h-full">
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                Benefits
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-teal-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Boost productivity by quickly digesting emails.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Stay organized with automated email categorization.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Focus on what matters by filtering out noise.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Enhance your workflow with instant email insights.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section ref={pricingRef} className="w-full max-w-4xl mt-16 opacity-0">
          {" "}
          {/* Start hidden */}
          <h2 className="text-4xl font-bold text-white text-center mb-8">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pro Plan - Highlighted */}
            <div className="group transition-all duration-300 border-2 border-teal-400 hover:border-teal-300 rounded-xl w-full sm:max-w-md mx-auto transform hover:scale-105 shadow-lg shadow-purple-500/30">
              <Card className="bg-white/15 backdrop-blur-lg p-4 h-full grid grid-flow-row">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-100">
                    Pro
                  </CardTitle>
                  <p className="text-lg mt-2 text-gray-300">$9.99 / month</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-teal-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        All Basic features plus advanced analytics.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-teal-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Customizable tagging & filters.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-teal-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Priority support & regular updates.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-teal-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Unlimited email insights.
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <div className="mt-4 text-center w-full place-self-end">
                  <Button
                    className="bg-gradient-to-r from-teal-500 to-purple-500 text-white hover:from-teal-600 hover:to-purple-600"
                    asChild
                  >
                    <Link href="/pay?amount=9.99">Upgrade Now</Link>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Free Trial */}
            <div className="group transition-all duration-300 border-2 border-transparent hover:border-teal-500/50 rounded-xl w-full sm:max-w-md mx-auto transform hover:scale-105">
              <Card className="bg-white/10 backdrop-blur-lg p-4 h-full grid grid-flow-row">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-100">
                    Free Trial
                  </CardTitle>
                  <p className="text-lg mt-2 text-gray-300">7 Days Free</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-teal-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Full access to Pro features.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-teal-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        No commitment required.
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <div className="mt-4 text-center w-full place-self-end">
                  <Button
                    variant="outline"
                    className="border border-teal-400 bg-gradient-to-r from-teal-500 to-purple-500 text-white hover:from-teal-600 hover:to-purple-600"
                    asChild
                  >
                    <Link href="/login">Start Free Trial</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-gray-300 text-center">
          <p>
            &copy; {new Date().getFullYear()} MailSage. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
