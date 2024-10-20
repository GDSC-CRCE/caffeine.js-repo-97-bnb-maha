import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Sidebar from "./Sidebar"
import { Link } from "react-router-dom"

const ILSI_CLASSES = [
  "Legal lease",
  "Medical Records",
  "Intellectual Property",
  "Family Disputes/Laws",
  "Memorandum of Understanding",
  "Criminal Cases",
]

const descriptions = {
  "Legal lease": "Draft and review lease agreements for residential and commercial properties, ensuring compliance with local regulations.",
  "Medical Records": "Handle confidential medical documentation, including release forms and HIPAA compliance documents.",
  "Intellectual Property": "Prepare patent applications, trademark registrations, and copyright protection documents for various creative works.",
  "Family Disputes/Laws": "Create divorce papers, child custody agreements, and other family-related legal documents.",
  "Memorandum of Understanding": "Develop non-binding agreements outlining the terms and details of an understanding between two or more parties.",
  "Criminal Cases": "Produce legal briefs, motions, and other necessary documentation for criminal proceedings and defense strategies.",
}

export default function Create() {
  return (
    <div className="flex">
        <Sidebar />
        <div className="container mx-auto px-10 py-10">
            <h1 className="text-3xl font-bold text-center mb-10">Legal Document Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ILSI_CLASSES.map((category) => (
                <Link to="/create/createForm" key={category}>
                    <Card className="flex flex-col h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                        <CardHeader>
                        <CardTitle>{category}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                        <CardDescription>{descriptions[category]}</CardDescription>
                        </CardContent>
                    </Card>
                </Link>
                ))}
            </div>
        </div>
    </div>
  )
}