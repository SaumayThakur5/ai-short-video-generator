"use client"
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/Button'
import { Textarea } from "@/components/ui/textarea"
import { Loader2Icon, SparklesIcon } from 'lucide-react'
import axios from 'axios'


const suggestions = [
  "Historic Story",
  "Kids Story", 
  "Movie Stories",
  "AI Innovations"
];

function Topic({ onHandleInputChange }) {
  const [selectTopic, setSelectedTopic] = useState();
  const [isGenerating, setIsGenerating] = useState(false);
  const[scripts, setScripts]= useState();
  const[loading, setLoading]= useState(false);
  const[selectedScriptIndex, setSelectedScriptIndex]= useState();

  
  const GenerateScript = async () => {
  setLoading(true);
  setSelectedScriptIndex(null);
  if (!selectTopic) {
    return;
  }

  setIsGenerating(true);
  
  try {
    const result = await axios.post('/api/generate-script', {
      topic: selectTopic
    });

    console.log(result.data);
    setScripts(result.data?.scripts); // ✅ Move here

  } catch (error) {
    console.log('Error:', error);
  } finally {
    setIsGenerating(false);
    setLoading(false);
  }
};


  return (
    <div>
      <h2 className='mb-1'>Project Title</h2>
      <input
        placeholder="Enter project title"
        onChange={(event) => onHandleInputChange('title', event?.target.value)}
      />
      
      <div className='mt-5'>
        <h2>Video Topic</h2>
        <p className='text-sm text-gray-600'>Select Topic for your video</p>
        
        <Tabs defaultValue="suggestion" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
            <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="suggestion">
            <div>
              {suggestions.map((suggestion, index) => (
                <Button
                  variant="outline"
                  key={index}
                  className={`m-1 ${suggestion === selectTopic && 'bg-secondary'}`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChange('topic', suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="your_topic">
            <div>
              <h2>Enter your own topic</h2>
              <Textarea
                placeholder="Enter your topic here"
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedTopic(value);
                  onHandleInputChange('topic', value);
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
        {scripts?.length>0 && <div className='grid grid-cols-2 gap-5'>
            {scripts?.map((item,index)=>(
                <div key={index}
                className={`p-3 border rounded-lg cursor-pointer'
                    ${selectedScriptIndex == index && 'border-white bg-secondary'}
                `}
                   onClick={() => {setSelectedScriptIndex(index);
                    onHandleInputChange('script', item.content);
                   }}
                >
                    <h2 className='line-clamp-4 text-sm text-gray-500'>{item.content}</h2>
                    </div>
            ))}
        </div>}
      </div>

      {!scripts &&<Button 
        className="mt-3" 
        onClick={GenerateScript}
        disabled={isGenerating || !selectTopic || loading}
      >
        {loading? <Loader2Icon className='animate-spin'/> :
        <SparklesIcon className="mr-2 h-4 w-4" /> }
        {isGenerating ? 'Generating...' : 'Generate Script'}
      </Button>}
    </div>
  );
}

export default Topic;