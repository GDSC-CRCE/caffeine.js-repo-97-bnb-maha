import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bold, Italic, Type, Highlighter, AlignLeft, AlignCenter, AlignRight, Indent, Outdent } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TextEditor() {
  const [versions, setVersions] = useState([{ id: 1, content: '', timestamp: new Date() }])
  const [currentVersionId, setCurrentVersionId] = useState(1)
  const editorRef = useRef(null)

  const saveVersion = () => {
    if (editorRef.current) {
      const newVersion = {
        id: versions.length + 1,
        content: editorRef.current.innerHTML,
        timestamp: new Date()
      }
      setVersions([...versions, newVersion])
      setCurrentVersionId(newVersion.id)
    }
  }

  const switchVersion = (versionId) => {
    setCurrentVersionId(versionId)
  }

  useEffect(() => {
    const currentVersion = versions.find(v => v.id === currentVersionId)
    if (currentVersion && editorRef.current) {
      editorRef.current.innerHTML = currentVersion.content
    }
  }, [currentVersionId, versions])

  const applyStyle = (command, value) => {
    document.execCommand(command, false, value)
  }

  const changeFontSize = (increase) => {
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) {
      const range = selection.getRangeAt(0)
      const span = document.createElement('span')
      const size = increase ? 'larger' : 'smaller'
      span.style.fontSize = size
      range.surroundContents(span)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  const highlight = () => {
    applyStyle('hiliteColor', 'yellow')
  }

  return (
    <div className="flex flex-col md:flex-row h-screen max-w-full mx-auto p-4 gap-4">
      <div className="flex flex-col w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Enhanced Version Control Text Editor</h1>
        <div className="flex gap-2 mb-2 flex-wrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => applyStyle('bold')}>
                  <Bold className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bold</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => applyStyle('italic')}>
                  <Italic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Italic</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => changeFontSize(true)}>
                  <Type className="h-4 w-4" />+
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Increase font size</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => changeFontSize(false)}>
                  <Type className="h-4 w-4" />-
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Decrease font size</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={highlight}>
                  <Highlighter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Highlight</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => applyStyle('justifyLeft')}>
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => applyStyle('justifyCenter')}>
                  <AlignCenter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align center</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => applyStyle('justifyRight')}>
                  <AlignRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Align right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => applyStyle('indent')}>
                  <Indent className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Increase indentation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => applyStyle('outdent')}>
                  <Outdent className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Decrease indentation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div
          ref={editorRef}
          contentEditable
          className="flex-grow p-4 border rounded overflow-auto"
          style={{ minHeight: '200px' }}
        />
        <Button onClick={saveVersion} className="mt-4">Save Version</Button>
      </div>
      <div className="w-full md:w-1/2 mt-4 md:mt-0">
        <h2 className="text-xl font-semibold mb-4">Versions</h2>
        <ScrollArea className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
          {versions.map((version) => (
            <div
              key={version.id}
              className={`p-2 mb-2 rounded cursor-pointer ${
                version.id === currentVersionId ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
              }`}
              onClick={() => switchVersion(version.id)}
            >
              <h3 className="font-medium">Version {version.id}</h3>
              <p className="text-sm">{version.timestamp.toLocaleString()}</p>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}