import React from 'react';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <div style={{
        backgroundColor: '#f5f6fa',
        backgroundSize: 'cover',
        backgroundImage: `url('https://cdn.deepseek.com/blog/banner-background.webp')`,
      }}>
      <Link to="/user">
      <nav className="fixed w-full bg-white z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-14 items-center">
            <div className="flex items-center">
              <img src='image.png' className="h-8 w-30 text-[#4B9EFF]" />
             
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                API Platform ↗
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                中文
              </a>
            </div>
          </div>
        </div>
      </nav>
      </Link>
     

      {/* Announcement Banner */}
      <div className="pt-20 pb-4 text-center">
        <p className="text-sm text-gray-600">
          🎉 DeepSeek-R1 is now live and open source, rivaling OpenAI's Model o1. Available on web, app, and API.
          <a href="#" className="text-[#4B9EFF] hover:text-blue-600 ml-1">Click for details.</a>
        </p>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className='flex justify-center mb-4'>
           <img src='image2.png' className="flex justify-center mb-4 text-[64px] font-bold text-[#4B9EFF] mb-4"
            
          /> 
          </div>
          
          <p className="text-[32px] text-gray-700 mb-16">
            Into the unknown
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Link to="/user">
            <div className="bg-white rounded-2xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:shadow-[0_0_25px_rgba(0,0,0,0.08)] transition-shadow">
              <h3 className="text-xl font-semibold text-[#4B9EFF] mb-4">Start Now</h3>
              <p className="text-gray-600 leading-relaxed">
                Free access to DeepSeek-V3.<br />
                Experience the intelligent model.
              </p>
            </div>
            </Link>
           <Link to="/user">
           <div className="bg-white rounded-2xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:shadow-[0_0_25px_rgba(0,0,0,0.08)] transition-shadow">
              <h3 className="text-xl font-semibold text-[#4B9EFF] mb-4">Get DeepSeek App</h3>
              <p className="text-gray-600 leading-relaxed">
                Chat on the go with DeepSeek-V3<br />
                Your free all-in-one AI tool
              </p>
            </div>
           </Link>
            
          </div>
        </div>
      </section>

      </div>
      
      {/* Capabilities Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[32px] font-bold text-center text-gray-900 mb-6">
            DeepSeek-V3 Capabilities
          </h2>
          <p className="text-center text-gray-600 mb-3 leading-relaxed">
            DeepSeek-V3 achieves a significant breakthrough in inference speed over previous models.
          </p>
          <p className="text-center text-gray-600 mb-16 leading-relaxed">
            It tops the leaderboard among open-source models and rivals the most advanced closed-source models globally.
          </p>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Benchmark (Metric)</th>
                  <th className="py-4 px-6 bg-blue-50 text-[#4B9EFF] font-medium">DeepSeek V3</th>
                  <th className="py-4 px-6 font-medium text-gray-600">DeepSeek V2.5</th>
                  <th className="py-4 px-6 font-medium text-gray-600">Qwen2.5</th>
                  <th className="py-4 px-6 font-medium text-gray-600">Llama3.1</th>
                  <th className="py-4 px-6 font-medium text-gray-600">Claude-3.5</th>
                  <th className="py-4 px-6 font-medium text-gray-600">GPT-4o</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6">Architecture</td>
                  <td className="py-4 px-6 bg-blue-50 text-[#4B9EFF]">MoE</td>
                  <td className="py-4 px-6">MoE</td>
                  <td className="py-4 px-6">Dense</td>
                  <td className="py-4 px-6">Dense</td>
                  <td className="py-4 px-6">-</td>
                  <td className="py-4 px-6">-</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6"># Activated Params</td>
                  <td className="py-4 px-6 bg-blue-50 text-[#4B9EFF]">37B</td>
                  <td className="py-4 px-6">21B</td>
                  <td className="py-4 px-6">72B</td>
                  <td className="py-4 px-6">405B</td>
                  <td className="py-4 px-6">-</td>
                  <td className="py-4 px-6">-</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6">MMLU (EM)</td>
                  <td className="py-4 px-6 bg-blue-50 text-[#4B9EFF]">88.5</td>
                  <td className="py-4 px-6">80.6</td>
                  <td className="py-4 px-6">85.3</td>
                  <td className="py-4 px-6">88.6</td>
                  <td className="py-4 px-6">88.3</td>
                  <td className="py-4 px-6">87.2</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6">DROP (3-shot F1)</td>
                  <td className="py-4 px-6 bg-blue-50 text-[#4B9EFF]">91.6</td>
                  <td className="py-4 px-6">87.8</td>
                  <td className="py-4 px-6">76.7</td>
                  <td className="py-4 px-6">88.7</td>
                  <td className="py-4 px-6">88.3</td>
                  <td className="py-4 px-6">83.7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;