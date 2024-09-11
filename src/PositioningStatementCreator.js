import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

const PositioningStatementCreator = () => {
  const [formData, setFormData] = useState({
    targetAudience: '',
    brand: '',
    category: '',
    keyBenefit: '',
    competitor: '',
    usp: ''
  });
  const [copied, setCopied] = useState(false);
  const [animateSparkle, setAnimateSparkle] = useState(false);
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const generateStatement = () => {
    return `For ${formData.targetAudience || '[target audience]'}, ${formData.brand || '[brand]'} offers ${formData.category || '[category/product]'} that delivers ${formData.keyBenefit || '[key benefit]'}. Unlike ${formData.competitor || '[competitor]'}, ${formData.brand || '[brand]'} emphasizes ${formData.usp || '[USP]'}.`;
  };

  const copyToClipboard = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    setAnimateSparkle(true);
    const timer = setTimeout(() => setAnimateSparkle(false), 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const getPlaceholder = (key) => {
    const placeholders = {
      targetAudience: 'Target audience',
      brand: 'Brand',
      category: 'Category/product',
      keyBenefit: 'Key benefit',
      competitor: 'Competitor',
      usp: 'USP'
    };
    return placeholders[key] || key;
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-8 bg-blue-100 rounded-lg shadow-2xl">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-700 text-center">
        Positioning statement creator
        <Sparkles className={`inline-block ml-2 ${animateSparkle ? 'animate-spin' : ''} text-yellow-400`} />
      </h1>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="relative">
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleInputChange}
              placeholder={getPlaceholder(key)}
              className="w-full p-3 border-2 border-blue-300 rounded-lg bg-white bg-opacity-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow-inner mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Your positioning statement:</h2>
        <textarea
          ref={textareaRef}
          value={generateStatement()}
          readOnly
          className="w-full p-4 border-2 border-blue-300 rounded-lg bg-white bg-opacity-50 text-gray-700 focus:outline-none focus:border-yellow-400 transition duration-300 h-32 resize-none"
        />
      </div>

      <div className="flex justify-center">
        <button 
          onClick={copyToClipboard}
          className={`px-6 py-3 rounded-full flex items-center ${
            copied ? 'bg-green-400' : 'bg-yellow-300'
          } text-gray-700 font-bold text-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50`}
        >
          {copied ? <Check className="mr-2" /> : <Copy className="mr-2" />}
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </button>
      </div>
    </div>
  );
};

export default PositioningStatementCreator;