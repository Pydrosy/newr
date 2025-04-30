
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const memeTemplates = [
  {
    id: 'template-1',
    name: 'Distracted Boyfriend',
    image: 'https://i.imgflip.com/1ur9b0.jpg'
  },
  {
    id: 'template-2',
    name: 'Two Buttons',
    image: 'https://i.imgflip.com/1g8my4.jpg'
  },
  {
    id: 'template-3',
    name: 'Drake Hotline Bling',
    image: 'https://i.imgflip.com/30b1gx.jpg'
  },
  {
    id: 'template-4',
    name: 'Change My Mind',
    image: 'https://i.imgflip.com/24y43o.jpg'
  }
];

const inspirationalQuotes = [
  "Believe in yourself and all that you are.",
  "Every day may not be good, but there's good in every day.",
  "The only way to do great work is to love what you do.",
  "Your mental health is a priority. Your happiness is essential.",
  "You are enough just as you are.",
  "It's okay not to be okay—as long as you don't give up.",
  "Self-care is how you take your power back."
];

const CreateMeme: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedTab, setSelectedTab] = useState('meme');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [quote, setQuote] = useState(inspirationalQuotes[0]);
  const [customQuote, setCustomQuote] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#9b87f5');
  
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
    setQuote(inspirationalQuotes[randomIndex]);
  };
  
  const handleShareMeme = () => {
    // This would typically upload the meme or add it to a story feed
    toast({
      title: "Story Created!",
      description: "Your meme has been shared to your story.",
    });
    navigate('/story');
  };
  
  const handleShareQuote = () => {
    // This would typically share the quote to stories
    toast({
      title: "Story Created!",
      description: "Your inspirational quote has been shared to your story.",
    });
    navigate('/story');
  };
  
  return (
    <AppLayout title="Create Story" showBack>
      <div className="p-4 space-y-6">
        <Tabs defaultValue="meme" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="meme">Meme Creator</TabsTrigger>
            <TabsTrigger value="quote">Quote Creator</TabsTrigger>
          </TabsList>
          
          {/* Meme Creator */}
          <TabsContent value="meme" className="space-y-4">
            {selectedTemplate ? (
              <>
                <Card>
                  <CardContent className="p-4">
                    <div className="relative aspect-w-1 aspect-h-1 bg-black">
                      <img 
                        src={memeTemplates.find(t => t.id === selectedTemplate)?.image} 
                        alt="Meme Template"
                        className="w-full h-full object-contain"
                      />
                      {topText && (
                        <div className="absolute top-2 left-0 right-0 text-center">
                          <p className="text-xl font-bold text-white uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                            {topText}
                          </p>
                        </div>
                      )}
                      {bottomText && (
                        <div className="absolute bottom-2 left-0 right-0 text-center">
                          <p className="text-xl font-bold text-white uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                            {bottomText}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="top-text">Top Text</Label>
                    <Input
                      id="top-text"
                      value={topText}
                      onChange={(e) => setTopText(e.target.value)}
                      placeholder="Enter top text"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bottom-text">Bottom Text</Label>
                    <Input
                      id="bottom-text"
                      value={bottomText}
                      onChange={(e) => setBottomText(e.target.value)}
                      placeholder="Enter bottom text"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedTemplate(null)}
                  >
                    Change Template
                  </Button>
                  
                  <Button 
                    onClick={handleShareMeme}
                  >
                    Share to Story
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-center text-gray-500 mb-4">
                  Select a meme template to get started
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  {memeTemplates.map(template => (
                    <button
                      key={template.id}
                      className="border rounded-lg overflow-hidden hover:border-thrive-purple transition-colors"
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="aspect-w-1 aspect-h-1">
                        <img 
                          src={template.image} 
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-sm font-medium truncate">{template.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
          
          {/* Quote Creator */}
          <TabsContent value="quote" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div 
                  className="aspect-w-1 aspect-h-1 flex items-center justify-center rounded-lg p-6 text-white"
                  style={{ backgroundColor }}
                >
                  <div className="text-center">
                    <p className="text-xl font-medium italic">
                      {customQuote || quote}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="quote-text">Custom Quote</Label>
                <Textarea
                  id="quote-text"
                  value={customQuote}
                  onChange={(e) => setCustomQuote(e.target.value)}
                  placeholder="Enter your own inspiring quote or use one of ours"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="background-color">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="background-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={getRandomQuote}
              >
                Random Quote
              </Button>
              
              <Button 
                onClick={handleShareQuote}
              >
                Share to Story
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CreateMeme;
