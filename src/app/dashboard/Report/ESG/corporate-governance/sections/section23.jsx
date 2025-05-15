'use client'
import { useState, useRef, useEffect } from "react";


const Section22=({section9_6_4Ref,data})=>{
    
    
    return (
        <>
        <div id="section9_6_4" ref={section9_6_4Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
9.6.3  Defined Benefit Plan Obligations and Other Retirement Plans
</h3>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Value of the plan’s liabilities are met by the organization’s general resources: 
</p>
<p className="text-sm mb-2">
    {
        data['201_3a']?data['201_3a']:'No data available'
    }

</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The extent to which the scheme's liabilities are estimated to be covered by the assets that have been set aside to meet them
</p>
<p className="text-sm mb-2">
    {
        data['201_3b']?data['201_3b']?.liabilities_coverage_extent || "No data available":'No data available'
    }

</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The basis on which the estimate has been arrived at
</p>
<p className="text-sm mb-2">
    {
        data['201_3b']?data['201_3b']?.liabilities_estimate_basis || "No data available":'No data available'
    }

</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The details of when the estimate was made
</p>
<p className="text-sm mb-2">
    {
        data['201_3b']?data['201_3b']?.liabilities_estimate_date_details || "No data available":'No data available'
    }

</p>


<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The strategy (if any) adopted by the employer to work towards full coverage if a fund set up to pay the plan’s pension liabilities is not fully covered.
</p>
<p className="text-sm mb-2">
    {
        data['201_3c']?data['201_3c']?.strategy_for_full_pension_liabilities_coverage || "No data available":'No data available'
    }

</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The timescale (if any) by which the employer hopes to achieve full coverage, if a fund set up to pay the plan's pension liabilities is not fully covered.
</p>
<p className="text-sm mb-2">
    {
        data['201_3c']?data['201_3c']?.timescale_for_full_pension_liabilities_coverage || "No data available":'No data available'
    }

</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Percentage of salary contributed by employee or employer.
</p>
<p className="text-sm mb-2">
    {
        data['201_3d']?data['201_3d']:'No data available'
    }

</p>
<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Level of participation in retirement plans.
</p>
<p className="text-sm mb-2">
    {
        data['201_3e']?data['201_3e']:'No data available'
    }

</p>
{/* <p className="text-[15px] text-[#344054] mb-2 font-semibold">
The extent to which the scheme’s liabilities are estimated to be covered by the assets that have been set aside to meet them:
</p>
<p className="text-sm mb-4">{data["201_3b"]?data["201_3b"].liabilities_coverage_extent?data["201_3b"].liabilities_coverage_extent:"No data available":"No data available"}</p>


<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The basis on which the estimate has been arrived at:
</p>
<p className="text-sm mb-4">{data["201_3b"]?data["201_3b"].liabilities_estimate_basis?data["201_3b"].liabilities_estimate_basis:"No data available":"No data available"}</p>

<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Details of when the estimate was made:
</p>
<p className="text-sm mb-4">{data["201_3b"]?data["201_3b"].liabilities_estimate_date_details?data["201_3b"].liabilities_estimate_date_details:"No data available":"No data available"}</p>


<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Strategies adopted by the employer to work towards full coverage if a fund set up to pay the plan’s pension liabilities is not fully covered:
</p>
<p className="text-sm mb-4">{data["201_3c"]?data["201_3c"].strategy_for_full_pension_liabilities_coverage?data["201_3c"].strategy_for_full_pension_liabilities_coverage:"No data available":"No data available"}</p>

<p className="text-[15px] text-[#344054] mb-2 font-semibold">
The timescale by which the employer hopes to achieve full coverage:
</p>
<p className="text-sm mb-4">{data["201_3c"]?data["201_3c"].timescale_for_full_pension_liabilities_coverage?data["201_3c"].timescale_for_full_pension_liabilities_coverage:"No data available":"No data available"}</p>


<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Percentage of salary contributed by employee or employer.
</p>
<p className="text-sm mb-4">{data["201_3d"]?data["201_3d"]:"No data available"}</p>


<p className="text-[15px] text-[#344054] mb-2 font-semibold">
Level of participation in retirement plans:
</p>
<p className="text-sm mb-4">{data["201_3e"]?data["201_3e"]:"No data available"}</p> */}
</div>
        </>
    )
}

export default Section22