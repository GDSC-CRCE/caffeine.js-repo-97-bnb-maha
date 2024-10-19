"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Home, FileText, Upload, Menu } from "lucide-react"
import { Link } from "react-router-dom";

export default function Sidebar() {
  const Navigation = () => (
    <nav className="space-y-2 h-screen">
      <Button variant="ghost" className="w-full justify-start">
        <Home className="mr-2 h-4 w-4" />
        <Link to="/home">Home</Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <FileText className="mr-2 h-4 w-4" />
        <Link to="/create">Create Contracts</Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <Upload className="mr-2 h-4 w-4" />
        <Link to="/upload">Upload Documents</Link>
      </Button>

    
    </nav>
  )

  return (
    <div className="h-screen sticky top-0">
      {/* Sidebar for large screens */}
      <aside className="hidden w-64 bg-white p-6 shadow-md lg:block">
        <h2 className="mb-6 text-2xl font-bold">Navigation</h2>
        <Navigation />
      </aside>

      {/* Sheet for small screens */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Navigate through different sections</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Navigation />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
