'use client'
import DynamicTable from '../tables/table4'

const Section19=({section11_5_4Ref})=>{
   
    
       const title1= "Total number and percentage of governance body members that the organization’s anti-corruption policies and procedures have been communicated to, by region: "
        const columns1= [
          { header: "Region"},
          { header: "Total number of governance body members that the organization's anti-corruption policies and procedures have been communicated to "},
          { header: "Total number of governance body members in that region"},
          { header: "Percentage of governance body members that the organization's anti-corruption policies and procedures have been communicated to "}
        ]
        const data1 =[
          { "Region": "Region1", 
            "Total number of governance body members that the organization's anti-corruption policies and procedures have been communicated to ": "data", 
            "Total number of governance body members in that region": "data" ,
            "Percentage of governance body members that the organization's anti-corruption policies and procedures have been communicated to ":"data"
          },
          { "Region": "Total", 
            "Total number of governance body members that the organization's anti-corruption policies and procedures have been communicated to ": "data", 
            "Total number of governance body members in that region": "data" ,
            "Percentage of governance body members that the organization's anti-corruption policies and procedures have been communicated to ":"data"
          }
        ]
      
      
       const title2="Total number and percentage of employees that the organization’s anti-corruption policies and procedures have been communicated to, broken down by employee category and region. "
       const columns2 =[
          { header: "Location Name" },
          { header: "Employee Category", subHeaders: ["Employee category A", "Employee category B"] },
          { header: "Total number of employees that the organization's anti-corruption policies and procedures have been communicated to " },
          { header: "Percentage of employees that the organization's anti-corruption policies and procedures have been communicated to" },
          ]
       const data2= [
          { "Location Name": "Location1", "Employee category A": "data", "Employee category B": "data", 
            "Total number of employees that the organization's anti-corruption policies and procedures have been communicated to ": "data", 
            "Percentage of employees that the organization's anti-corruption policies and procedures have been communicated to": "data" 
          },
          { "Location Name": "Location2", "Employee category A": "data", "Employee category B": "data", 
            "Total number of employees that the organization's anti-corruption policies and procedures have been communicated to ": "data", 
            "Percentage of employees that the organization's anti-corruption policies and procedures have been communicated to": "data" 
          }
        ]
      

    return (
        <>
        <div id="section11_5_4" ref={section11_5_4Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.5.4. Training on Anti-Corruption
</h3>
           <div className='rounded-md shadow-md mb-4'>
                <DynamicTable title={title1} columns={columns1} data={data1}/>
           </div>
           <div className='rounded-md shadow-md mb-4'>
                <DynamicTable title={title2} columns={columns2} data={data2}/>
           </div>
        </div>
        </>
    )
}

export default Section19