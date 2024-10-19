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

  useEffect(() => {
    // Fetch initial content from the server
    const fetchInitialContent = async () => {
      try {
        // const response = await fetch('/api/initial-content') // Adjust the endpoint as needed
        // const data = await response.json()
        const data = {
          "content": "<p><strong>Deed of Lease (for a Term of Years) Rent Agreement</strong></p><p>This Deed of Lease is made at Value for first placeholder this Value for second placeholder day of #3, Value for first placeholder8 between #4 of #5 hereinafter called 'The Lessor' of the One Part and #6 also of #7 hereinafter called 'The Lessee' of the Other Part.</p><p>WHEREAS, the Lessor is absolutely seized and possessed of or otherwise well and sufficiently entitled to the land and premises described in the Schedule hereunder written.</p><p>AND WHEREAS, the Lessor has agreed to grant to the Lessee a lease in respect of the said land and premises for a term of #8 years in the manner hereinafter appearing.</p><p>Now This Deed Witnesseth as Follows:</p><p>1.     In pursuance of the said agreement and in consideration of the rent hereby reserved and of the terms and conditions, covenants and agreements herein contained and on the part of the Lessee to be observed and performed the Lessor doth hereby demise unto the Lessee all that the said land and premises situated at #9 and described in the Schedule hereunder written (hereinafter for the brevity's sake referred to as 'the demised premises') to hold the demised premises unto the Lessee (and his heirs, executors, administrators and assigns) for a term of #8 years commencing from the 1st day of Value for first placeholder0, Value for first placeholder1, but subject to the earlier determination of this demise as hereinafter provided and yielding and paying therefor during the said term the monthly ground rent of Rs Value for first placeholder2 free and clear of all deductions and strictly in advance on or before the 5th day of each and every calendar month. The first of such monthly ground rent shall be paid on the 5th day of Value for first placeholder0 and the subsequent rent to be paid on or before the 5th day of every succeeding month regularly.</p><p>2.     The Lessee hereby for himself, his heirs, executors, administrators and assigns and to the intent that the obligations herein contained shall continue throughout the term hereby created covenants with the Lessor as follows:</p><p>a.     To pay the ground rent hereby reserved on the days and in the manner aforesaid clears of all deductions. The first of such monthly rent as hereinbefore provided shall be paid on the 5th of Value for first placeholder0 and the subsequent rent shall be paid on the 5th day of every succeeding month regularly and If the-ground rent is not paid on the due dates the Lessee shall pay interest thereon at the rate of Value for first placeholder3 % per annum from the due date till payment, though the payment of Interest shall not entitle the Lessee to make default in payment of rent on due dates.</p><p>b.    To bear pay and discharge the existing and future rates. taxes and assessment duties, cess, impositions, outgoing and burdens whatsoever which may at any time or from time to time during the term hereby created be Imposed or charged upon the demised land and the building or structures standing thereon and on the buildings or structures hereafter to be erected and for the time being standing on the demised land and payable either by the owners, occupiers or tenants thereof and to keep the Lessor and his estate and effects Indemnified against all such payment. The annual Municipal and other taxes at present are Rs…………...</p><p>c.     To keep the buildings and structures on the demised premises ,in good and tenantable repairs in the same way as the Lessor is liable to do under the law provided that if the Lessee so desires he shall have power to demolish any existing building or structure without being accountable to the Lessor for the building material of such building and structure and the Lessee shall have also power to construct any new buildings in their place.</p><p>d.    The Lessee shall be at liberty to carry out any additions or alterations to the buildings or structures at present existing on the demised premises or to put up any additional structures or buildings on the demised premises In accordance with the plans approved by the authorities at any time or from time to time during the subsistence of the term hereby created.</p><p>e.     Not to sell or dispose of any earth, gravel or sand from the demised land and not to excavate the same except so far as may be necessary for the execution of construction work.</p><p>f.     To use or permit to be used the buildings and structures to be constructed on the demised premises for any and all lawful purposes as may be permitted by the authorities from time to time.</p><p>3.     The Lessor doth hereby covenant with the Lessee that:</p><p>a.     the Lessor now has in himself good right full power and absolute authority to demise unto the Lessee the demised premises and the buildings and structures standing thereon In the manner herein appearing in accordance with the terms and conditions set forth in this lease agreement.</p><p>b.    that on the Lessee paying the said monthly ground rent on the due dates thereof and in the manner herein provided and observing and performing the covenants. conditions, and stipulations herein contained and on his part to be observed and performed shall and may peaceably and quietly hold, possess and enjoy the demised premises together with the buildings and structures standing thereon during the term hereby created without any eviction, interruption, disturbance, claim and demand whatsoever by the Lessor or any person or persons lawfully or equitably claiming by, from, under or in trust for him.</p><p>4.     It is hereby agreed and declared that these presents are granted on the express condition that if the said monthly ground rent or any part thereof payable in the manner hereinbefore mentioned shall be an arrears for the space of Value for first placeholder5 months after the same shall have become due and payable on any of the said days wherein the same ought to be paid as aforesaid whether the same shall or shall not be legally demanded or If any of the covenants and stipulations herein contained and on the part of the Lessee to be observed and performed shall not be so observed and performed by the Lessee or If the Lessee shall raise an objection to the amount of the monthly ground rent hereby fixed for any reason whatsoever then and in such event it shall be lawful for the Lessor or any person or persons duly authorised by him in that behalf at any time hereafter to enter into and upon the land and premises and the buildings and structures constructed or to he constructed thereon or any part or parts thereof in the name of the whole and the same to have, possess and enjoy and thereupon this demise shall absolutely determine but without prejudice to the right of action of the Lessor in respect of any breach of any of the covenants by the Lessee herein contained PROVIDED ALWAYS that, no re-entry shall be made under the foregoing power for breach of the covenants and stipulations herein contained and on the part of the Lessee to be observed and performed (save and except the covenant for payment of rent) unless and until the Lessor shall have given to the Lessee a notice in writing specifying the covenants and conditions or stipulations which require to be complied with or carried out and the Lessee shall have failed to comply with or carry out the same within Value for first placeholder5 months from the date of the receipt of by such notice.</p><p>5.     And it is hereby expressly agreed and declared between the parties as follows</p><p>a.     On the expiration of the term hereby created or earlier determination under the provisions hereof all the buildings and structures standing on the demised land shall automatically vest in the Lessor without payment of any compensation therefor by the Lessor to the Lessee.</p><p>b.    The Lessee shall not be entitled, without obtaining In writing the permission of the Lessor, to assign mortgage, sublet (except to the extent of creating monthly tenancies) or otherwise part with possession of the demised premises or any of them or any part thereof and the buildings and structure standing thereon though such permission shall not be unreasonably withheld.</p><p>IN WITNESS WHEREOF the Lessor and the Lessee have put their respective hands on the original and duplicate hereof the day and year first herein above written.</p><p>THE SCHEDULE ABOVE REFERRED TO</p><p>Signed and delivered by the</p><p>Withinnamed Lessor #6 in the presence of Value for first placeholder6</p><p>Signed and delivered by the</p><p>Withinnamed Lessee #4 in the presence of Value for first placeholder7</p>"
        }
        if (data.content && editorRef.current) {
          editorRef.current.innerHTML = data.content
          saveVersion() // Save the initial content as the first version
        }
      } catch (error) {
        console.error('Failed to fetch initial content:', error)
      }
    }

    fetchInitialContent()
  }, [])

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