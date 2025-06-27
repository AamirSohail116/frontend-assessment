import { TrendingUp, BarChart3, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full py-20 md:py-24   bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-green-50 border-green-200 text-green-700">
                <TrendingUp className="w-4 h-4 mr-2" />
                Real-time Market Data
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Track Your Investments Like a Pro
              </h1>
              <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Monitor your portfolio performance, analyze market trends, and
                make informed investment decisions with our comprehensive stock
                tracking platform.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
              <button className="px-8 py-3 text-base  text-gray-700">
                <Link href={"/stock"}>Start Tracking Free</Link>
              </button>
              <button className="px-8 py-3 text-base text-gray-700">
                View Demo
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-slate-600">Real-time Prices</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-slate-600">
                  Advanced Analytics
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-slate-600">
                  Portfolio Insights
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-slate-200">
                <Image
                  src="/stock-market.png"
                  width={500}
                  height={400}
                  alt="Stock tracking dashboard showing portfolio performance, charts, and market data"
                  className="rounded-lg object-cover"
                />

                <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-slate-600">
                      Portfolio
                    </span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">+12.5%</div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-blue-500" />
                    <span className="text-xs font-medium text-slate-600">
                      AAPL
                    </span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    $175.43
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-center text-sm text-slate-500 mb-6">
            Trusted by over 50,000+ investors worldwide
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-slate-400">TechCrunch</div>
            <div className="text-2xl font-bold text-slate-400">Forbes</div>
            <div className="text-2xl font-bold text-slate-400">Bloomberg</div>
            <div className="text-2xl font-bold text-slate-400">Reuters</div>
          </div>
        </div>
      </div>
    </section>
  );
}
