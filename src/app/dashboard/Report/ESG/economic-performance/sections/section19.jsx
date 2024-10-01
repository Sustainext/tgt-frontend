'use client'
import DynamicTable from '../tables/table4'
import AntiCorruptionTable from '../tables/table5'

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

        const title3="Total number and percentage of business partners that the organization’s anti-corruption policies and procedures have been communicated to, broken down by type of business partner and region"
        const columns3 = [
          { header: "Location Name" },
          { header: "Type of business partner" },
          { header: "Total number of business partners that the organization's anti-corruption policies and procedures have been communicated to" },
          { header: "Total number of business partners in this region" },
          { header: "Percentage of business partners that the organization's anti-corruption policies and procedures have been communicated to" },
        ];
        
        const data3 = [
          {
            "Location Name": "Location 1",
            "Type of business partner": "Type of business partner A",
            "Total number of business partners that the organization's anti-corruption policies and procedures have been communicated to": "value",
            "Total number of business partners in this region": "value",
            "Percentage of business partners that the organization's anti-corruption policies and procedures have been communicated to": "value",
          },
          {
            "Location Name": "Location 1",
            "Type of business partner": "Type of business partner B",
            "Total number of business partners that the organization's anti-corruption policies and procedures have been communicated to": "value",
            "Total number of business partners in this region": "value",
            "Percentage of business partners that the organization's anti-corruption policies and procedures have been communicated to": "value",
          },
          {
            "Location Name": "Location 1",
            "Type of business partner": "Type of business partner C",
            "Total number of business partners that the organization's anti-corruption policies and procedures have been communicated to": "value",
            "Total number of business partners in this region": "value",
            "Percentage of business partners that the organization's anti-corruption policies and procedures have been communicated to": "value",
          },
          {
            "Location Name": "Location 1",
            "Type of business partner": "Total",
            "Total number of business partners that the organization's anti-corruption policies and procedures have been communicated to": "value",
            "Total number of business partners in this region": "value",
            "Percentage of business partners that the organization's anti-corruption policies and procedures have been communicated to": "value",
          },
        ];

        const title4="Total number and percentage of governance body members that have received training on anti-corruption, broken down by region."
        const columns4 = [
          { header: "Location Name" },
          { header: "Total number of governance body members that have received training on anti-corruption" },
          { header: "Total number of governance body members" },
          { header: "Percentage of governance body members that have received training on anti-corruption" },
        ];
        
        const data4 = [
          {
            "Location Name": "Location 1",
            "Total number of governance body members that have received training on anti-corruption": "value",
            "Total number of governance body members": "value",
            "Percentage of governance body members that have received training on anti-corruption": "value",
          },
        ];

        const title5="Total number and percentage of employees that have received training on anti-corruption, broken down by region."
        const columns5 = [
          { header: "Location Name" },
          { header: "Employee Category" },
          { header: "Total number of employees that have received training on anti-corruption" },
          { header: "Total number of employees" },
          { header: "Percentage of employees that have received training on anti-corruption" },
        ];
        
        const data5 = [
          {
            "Location Name": "Location 1",
            "Employee Category": "Employee category A",
            "Total number of employees that have received training on anti-corruption": "value",
            "Total number of employees": "value",
            "Percentage of employees that have received training on anti-corruption": "value",
          },
          {
            "Location Name": "Location 1",
            "Employee Category": "Employee category B",
            "Total number of employees that have received training on anti-corruption": "value",
            "Total number of employees": "value",
            "Percentage of employees that have received training on anti-corruption": "value",
          },
          {
            "Location Name": "Location 1",
            "Employee Category": "Employee category C",
            "Total number of employees that have received training on anti-corruption": "value",
            "Total number of employees": "value",
            "Percentage of employees that have received training on anti-corruption": "value",
          },
          {
            "Location Name": "Location 1",
            "Employee Category": "Total",
            "Total number of employees that have received training on anti-corruption": "value",
            "Total number of employees": "value",
            "Percentage of employees that have received training on anti-corruption": "value",
          },
        ];
        
        

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
           <div className='rounded-md shadow-md mb-4'>
                <AntiCorruptionTable title={title3} columns={columns3} data={data3}/>
           </div>
           <div className='rounded-md shadow-md mb-4'>
                <AntiCorruptionTable title={title4} columns={columns4} data={data4}/>
           </div>
           <div className='rounded-md shadow-md mb-4'>
                <AntiCorruptionTable title={title5} columns={columns5} data={data5}/>
           </div>
        </div>
        </>
    )
}

export default Section19