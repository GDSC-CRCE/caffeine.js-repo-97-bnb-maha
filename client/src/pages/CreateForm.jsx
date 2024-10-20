import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RentalAgreementForm = () => {
  const [formData, setFormData] = useState({
    form_id: 1,
    tenantName: "",
    tenantState: "",
    ownerName: "",
    ownerState: "",
    witness1: "",
    witness2: "",
    signingTime: "",
    signingDate: "",
    signingMonth: "",
    landLocation: "",
    rentalContractYears: "",
    agreementStartMonth: "",
    agreementStartYear: "",
    monthlyRent: "",
    interestRate: "",
    landTax: "",
    paymentDeadlineMonths: "",
    paymentDeadlineYear: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mappedData = {
        form_id: formData.form_id,
        1: formData.tenantName,
        2: formData.tenantState,
        3: formData.ownerName,
        4: formData.ownerState,
        5: formData.witness1,
        6: formData.witness2,
        7: formData.signingTime,
        8: formData.signingDate,
        9: formData.signingMonth,
        10: formData.landLocation,
        11: formData.rentalContractYears,
        12: formData.agreementStartMonth,
        13: formData.agreementStartYear,
        14: formData.monthlyRent,
        15: formData.interestRate,
        16: formData.landTax,
        17: formData.paymentDeadlineMonths,
        18: formData.paymentDeadlineYear
    };    

    console.log("Form submitted:", mappedData);
    const response = await axios.post('http://localhost:5001/api/final-content', mappedData);
    const content = response.data.content;
    navigate('/create/textEditor', { state: { param: content } });
  };

  return (
    <div className="flex">
        <Sidebar />
        <form onSubmit={handleSubmit} className="space-y-8 w-3/4 mx-auto p-4">
        <Card>
            <CardHeader>
            <CardTitle>Rental Agreement Form</CardTitle>
            <CardDescription>Please fill out all the required information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            {/* Parties */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Parties</h3>
                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tenantName">Tenant Name</Label>
                    <Input id="tenantName" name="tenantName" value={formData.tenantName} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="tenantState">Tenant State</Label>
                    <Input id="tenantState" name="tenantState" value={formData.tenantState} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ownerState">Owner State</Label>
                    <Input id="ownerState" name="ownerState" value={formData.ownerState} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="witness1">Witness 1</Label>
                    <Input id="witness1" name="witness1" value={formData.witness1} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="witness2">Witness 2</Label>
                    <Input id="witness2" name="witness2" value={formData.witness2} onChange={handleInputChange} required />
                </div>
                </div>
            </div>

            {/* Signing Date */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Signing Date</h3>
                <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="signingTime">Time</Label>
                    <Input id="signingTime" name="signingTime" type="time" value={formData.signingTime} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="signingDate">Date</Label>
                    <Input id="signingDate" name="signingDate" type="date" value={formData.signingDate} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="signingMonth">Month</Label>
                    <Select name="signingMonth" value={formData.signingMonth} onValueChange={(value) => handleInputChange({ target: { name: "signingMonth", value } })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                        <SelectItem key={month} value={month}>
                            {month}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Details</h3>
                <div className="space-y-2">
                <Label htmlFor="landLocation">Land Location</Label>
                <Input id="landLocation" name="landLocation" value={formData.landLocation} onChange={handleInputChange} required />
                </div>
            </div>

            {/* Terms and Payments */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Terms and Payments</h3>
                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="rentalContractYears">Rental Contract in Years</Label>
                    <Input id="rentalContractYears" name="rentalContractYears" type="number" value={formData.rentalContractYears} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="agreementStartMonth">Agreement Start Month</Label>
                    <Select name="agreementStartMonth" value={formData.agreementStartMonth} onValueChange={(value) => handleInputChange({ target: { name: "agreementStartMonth", value } })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                        <SelectItem key={month} value={month}>
                            {month}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="agreementStartYear">Start Year of Agreement</Label>
                    <Input id="agreementStartYear" name="agreementStartYear" type="number" value={formData.agreementStartYear} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="monthlyRent">Monthly Rent</Label>
                    <Input id="monthlyRent" name="monthlyRent" type="number" value={formData.monthlyRent} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="interestRate">Rate of Interest</Label>
                    <Input id="interestRate" name="interestRate" type="number" step="0.01" value={formData.interestRate} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="landTax">Tax on Land</Label>
                    <Input id="landTax" name="landTax" type="number" step="0.01" value={formData.landTax} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="paymentDeadlineMonths">Payment Deadline in Months</Label>
                    <Input id="paymentDeadlineMonths" name="paymentDeadlineMonths" type="number" value={formData.paymentDeadlineMonths} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="paymentDeadlineYear">Payment Deadline Year</Label>
                    <Input id="paymentDeadlineYear" name="paymentDeadlineYear" type="number" value={formData.paymentDeadlineYear} onChange={handleInputChange} required />
                </div>
                </div>
            </div>
            </CardContent>
            <CardFooter>
            <Button type="submit" className="w-full">Submit Rental Agreement</Button>
            </CardFooter>
        </Card>
        </form>
    </div>
  );
};

export default RentalAgreementForm;