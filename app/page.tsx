import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 via-indigo-900 to-slate-950">
      {/* Navigation */}
      <nav className="w-full backdrop-blur-md bg-black/20 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
          >
            MailSage
          </Link>
          <Button
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </nav>

      {/* Main Content with padding-top to account for fixed nav */}
      <div className="pt-20 flex flex-col items-center justify-start p-6">
        {/* Header Section */}
        <header className="w-full max-w-4xl text-center mt-10">
          <h1 className="text-6xl font-extrabold text-transparent text-balance bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            MailSage: Smart Email Insights
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Revolutionize your inbox with AI-driven summarization and automated
            tagging.
          </p>
        </header>

        {/* Features & Benefits Section */}
        <section className="w-full max-w-4xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Features */}
          <div className="group transition-colors duration-300 border-2 border-transparent hover:border-blue-500/50 rounded-xl w-full sm:max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-blue-600/20 h-full">
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                Features
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Intelligent email summarization powered by AI.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Automated tagging &amp; smart categorization.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Seamless integration with the Gmail API.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Custom email filters and adaptive summary lengths.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Benefits */}
          <div className="group transition-colors duration-300 border-2 border-transparent hover:border-blue-500/50 rounded-xl w-full sm:max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-blue-600/20">
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                Benefits
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Boost productivity by quickly digesting emails.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Stay organized with automated email categorization.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Focus on what matters by filtering out noise.
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-100">
                    Enhance your workflow with instant email insights.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full max-w-4xl mt-16">
          <h2 className="text-4xl font-bold text-white text-center mb-8">
            Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="group transition-colors duration-300 border-2 border-transparent hover:border-blue-500/50 rounded-xl w-full sm:max-w-md mx-auto">
              <Card className="bg-white/10 backdrop-blur-lg p-4 h-full grid grid-flow-row">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-100">
                    Basic
                  </CardTitle>
                  <p className="text-lg mt-2 text-gray-300">$0 / month</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Essential email insights.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Basic tagging &amp; filtering.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Limited summarization features.
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <div className="mt-4 text-center w-full place-self-end">
                  <Button
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                    asChild
                  >
                    <Link href="/login">Get Started</Link>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Pro Plan */}
            <div className="group transition-colors duration-300 border-2 border-transparent hover:border-blue-500/50 rounded-xl w-full sm:max-w-md mx-auto">
              <Card className="bg-white/10 backdrop-blur-lg p-4 h-full grid grid-flow-row">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-100">
                    Pro
                  </CardTitle>
                  <p className="text-lg mt-2 text-gray-300">$9.99 / month</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        All Basic features plus advanced analytics.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Customizable tagging &amp; filters.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Priority support &amp; regular updates.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Unlimited email insights.
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <div className="mt-4 text-center w-full place-self-end">
                  <Button
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                    asChild
                  >
                    <Link href="/login">Upgrade Now</Link>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Free Trial */}
            <div className="group transition-colors duration-300 border-2 border-transparent hover:border-blue-500/50 rounded-xl w-full sm:max-w-md mx-auto">
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
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        Full access to Pro features.
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-100">
                        No commitment required.
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <div className="mt-4 text-center w-full place-self-end">
                  <Button
                    variant="outline"
                    className="border border-blue-400 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
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
