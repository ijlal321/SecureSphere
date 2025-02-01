import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Code, FileText, FileQuestion, ContrastIcon as CompareIcon } from "lucide-react"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import * as diff from "diff"

const initialContent = [
  { id: 1, user: "User 1", content: "function hello() {\n  console.log('Hello, World!');\n}" },
  { id: 2, user: "User 2", content: "Research findings on climate change impact" },
  { id: 3, user: "User 1", content: "const sum = (a, b) => a + b;" },
  { id: 4, user: "User 3", content: "Ideas for new product features" },
  { id: 5, user: "User 2", content: "Latest data on renewable energy adoption" },
]

export default function ContentSharingPlatform() {
  const [contents, setContents] = useState(initialContent)
  const [selectedContent, setSelectedContent] = useState(null)
  const [contentType, setContentType] = useState("other")
  const [newUser, setNewUser] = useState("")
  const [newContent, setNewContent] = useState("")
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [compareContent1, setCompareContent1] = useState(null)
  const [compareContent2, setCompareContent2] = useState(null)

  useEffect(() => {
    if (selectedContent) {
      Prism.highlightAll()
    }
  }, [selectedContent])

  const handleContentSelect = (content) => {
    if (compareMode) {
      if (!compareContent1) {
        setCompareContent1(content)
      } else if (!compareContent2) {
        setCompareContent2(content)
      }
    } else {
      setSelectedContent(content)
    }
  }

  const handleAddContent = (e) => {
    e.preventDefault()
    if (newUser.trim() && newContent.trim()) {
      const newItem = {
        id: contents.length + 1,
        user: newUser.trim(),
        content: newContent.trim(),
      }
      setContents([...contents, newItem])
      setNewUser("")
      setNewContent("")
      setIsFormVisible(false)
    }
  }

  const beautifyCode = (code) => {
    return code.replace(/{\s*/g, "{\n  ").replace(/;\s*/g, ";\n  ").replace(/}\s*/g, "\n}").trim();
  }

  const renderContent = (content) => {
    if (contentType === "code") {
      return (
        (<pre className="rounded-md overflow-x-auto">
          <code className="language-javascript">{beautifyCode(content)}</code>
        </pre>)
      );
    } else {
      return <pre className="bg-gray-800 text-gray-200 p-4 rounded-md whitespace-pre-wrap">{content}</pre>;
    }
  }

  const renderComparison = () => {
    if (!compareContent1 || !compareContent2) return null

    const differences = diff.diffLines(compareContent1.content, compareContent2.content)

    return (
      (<div className="mt-4">
        <h3 className="text-xl font-bold mb-2 text-amber-300">Comparison Result</h3>
        <div className="bg-gray-800 p-4 rounded-md">
          {differences.map((part, index) => (
            <span
              key={index}
              className={
                part.added ? "bg-green-900 text-green-200" : part.removed ? "bg-red-900 text-red-200" : "text-gray-200"
              }>
              {part.value}
            </span>
          ))}
        </div>
      </div>)
    );
  }

  return (
    (<div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Tabs
        defaultValue="other"
        className="w-full p-4"
        onValueChange={setContentType}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 rounded-lg">
          <TabsTrigger
            value="code"
            className="data-[state=active]:bg-teal-600 transition-colors">
            <Code className="w-5 h-5 mr-2" />
            Code
          </TabsTrigger>
          <TabsTrigger
            value="research"
            className="data-[state=active]:bg-teal-600 transition-colors">
            <FileText className="w-5 h-5 mr-2" />
            Research
          </TabsTrigger>
          <TabsTrigger
            value="other"
            className="data-[state=active]:bg-teal-600 transition-colors">
            <FileQuestion className="w-5 h-5 mr-2" />
            Other
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar with user content list */}
        <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-teal-300">Content List</h2>
            <Button
              onClick={() => {
                setCompareMode(!compareMode)
                setCompareContent1(null)
                setCompareContent2(null)
              }}
              variant="outline"
              className={`${compareMode ? "bg-amber-600 text-white" : "bg-gray-700 text-gray-200"}`}>
              <CompareIcon className="w-5 h-5 mr-2" />
              Compare
            </Button>
          </div>
          <ScrollArea className="flex-1 pr-4">
            <AnimatePresence>
              {contents.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}>
                  <Button
                    onClick={() => handleContentSelect(item)}
                    variant="ghost"
                    className={`w-full justify-start mb-2 text-left hover:bg-gray-700 transition-colors ${
                      (compareContent1 && compareContent1.id === item.id) ||
                      (compareContent2 && compareContent2.id === item.id)
                        ? "bg-teal-700"
                        : ""
                    }`}>
                    <span className="font-medium">{item.user}</span>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        </div>

        {/* Right content display area */}
        <div className="w-2/3 p-4 overflow-auto bg-gray-900">
          <AnimatePresence mode="wait">
            {compareMode ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold mb-4 text-amber-300">Content Comparison</h2>
                {compareContent1 && (
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 text-teal-300">{compareContent1.user}'s Content</h3>
                    {renderContent(compareContent1.content)}
                  </div>
                )}
                {compareContent2 && (
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 text-teal-300">{compareContent2.user}'s Content</h3>
                    {renderContent(compareContent2.content)}
                  </div>
                )}
                {renderComparison()}
              </motion.div>
            ) : selectedContent ? (
              <motion.div
                key={selectedContent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold mb-4 text-amber-300">{selectedContent.user}'s Content</h2>
                {renderContent(selectedContent.content)}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 mt-10">
                Select a content item from the list to view details
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* New content form at the bottom */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <AnimatePresence>
          {isFormVisible ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onSubmit={handleAddContent}
              className="flex flex-col space-y-2">
              <Input
                type="text"
                placeholder="Your Name"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                className="bg-gray-700 text-white placeholder-gray-400 border-gray-600" />
              <Textarea
                placeholder="Enter your content here"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                rows={4} />
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                  Add Content
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white">
                  Cancel
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Button
                onClick={() => setIsFormVisible(true)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                <PlusCircle className="w-5 h-5 mr-2" />
                Add New Content
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>)
  );
}

