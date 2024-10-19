"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Sidebar from "./Sidebar" // Import the Sidebar component

const legalCases = [
  { title: "Smith vs. Johnson Medical Center", class: "Medical Records" },
  { title: "TechCorp Patent Infringement", class: "Intellectual Property" },
  { title: "Brown Family Custody Dispute", class: "Family Disputes/Laws" },
  { title: "GreenEnergy Environmental Compliance", class: "Environmental Cases" },
  { title: "State vs. Thompson", class: "Criminal Cases" },
  { title: "ABC Corp Shareholder Agreement", class: "Corporate Governance" },
  { title: "XYZ Company Merger MOU", class: "Memorandum of Understanding" },
  { title: "Landlord-Tenant Dispute", class: "Agreements & Contracts" },
]

export default function LegalCasesDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("")

  const filteredCases = legalCases.filter(
    (legalCase) =>
      legalCase.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass === "" || legalCase.class === selectedClass)
  )

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Navigation and sheet included) */}
      <Sidebar/>

      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Legal Cases Dashboard</h1>
        </div>
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search cases..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="rounded-md border px-3 py-2"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {legalCases.map((legalClass) => (
              <option key={legalClass.class} value={legalClass.class}>
                {legalClass.class}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((legalCase, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">{legalCase.title}</h3>
              <p className="text-sm text-gray-600">{legalCase.class}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
