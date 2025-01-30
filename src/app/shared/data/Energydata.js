import { MdChevronRight } from "react-icons/md";

export const Energydata = [
  {
    category: ["1"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 302: Energy 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 302-1 Energy consumption within the organization
          </p>
          <div>
            <p className="text-[13px] text-black mb-4">
              Compilation requirement:
            </p>
            <p className="text-[11px] text-[#727272]">
              When compiling the information specified in Disclosure 302-1, the
              reporting organization shall:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Avoid the double-counting of fuel consumption, when reporting
                self-generated energy consumption. If the organization generates
                electricity from a nonrenewable or renewable fuel source and
                then consumes the generated electricity, the energy consumption
                shall be counted once under fuel consumption
              </li>

              <li className="text-[11px] text-[#727272]">
                Report fuel consumption separately for non-renewable and
                renewable fuel sources.
              </li>
              <li className="text-[11px] text-[#727272]">
                Only report energy consumed by entities owned or controlled by
                the organization
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-1 break-all">
              Total energy consumption within the organization = Non-renewable
              fuel consumed + Renewable fuel consumed + Electricity, heating,
              cooling, and steam purchased for consumption + Self-generated
              electricity, heating, cooling, and steam, which are not consumed
              (see clause 2.1.1) - Electricity, heating, cooling, and steam
              sold.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12467&page=1",
  },
  {
    category: ["2"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 302: Energy 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 302-2 Energy consumption outside of the organization
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">
              Compilation requirement:
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              When compiling the information specified in Disclosure 302-2, the
              reporting organization shall exclude energy consumption reported
              in Disclosure 302-1.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Guidance:</p>
            <p className="text-[11px] text-[#727272] mb-2">
              The reporting organization can identify energy consumption outside
              of the organization by assessing whether an activity’s energy
              consumption:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Contributes significantly to the organization’s total
                anticipated energy consumption outside of the organization.
              </li>
              <li className="text-[11px] text-[#727272]">
                Offers potential for reductions the organization can undertake
                or influence.
              </li>
              <li className="text-[11px] text-[#727272]">
                Contributes to climate change-related risks, such as financial,
                regulatory, supply chain, product and customer, litigation, and
                reputational risks.
              </li>
              <li className="text-[11px] text-[#727272]">
                Is deemed material by stakeholders, such as customers,
                suppliers, investors, or civil society.
              </li>
              <li className="text-[11px] text-[#727272]">
                Results from outsourced activities previously performed
                in-house, or that are typically performed in-house by other
                organizations in the same sector.
              </li>
              <li className="text-[11px] text-[#727272]">
                Has been identified as significant for the organization’s
                sector.
              </li>
              <li className="text-[11px] text-[#727272]">
                Meets any additional criteria for determining relevance,
                developed by the organization or by organizations in its sector.
              </li>
            </ul>
            <p className="text-[13px] text-[#222222] mb-2">Background:</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Energy consumption can occur outside an organization, i.e.,
              throughout the organization’s upstream and downstream activities
              associated with its operations.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              This can include consumers’ use of products the organization
              sells, and the end-of-life treatment of products.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12467&page=1",
  },
  {
    category: ["3"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 302: Energy 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 302-3 Energy intensity
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">
              Compilation requirement:
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              When compiling the information specified in Disclosure 302-3, the
              reporting organization shall:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Calculate the ratio by dividing the absolute energy consumption
                (the numerator) by the organization-specific metric (the
                denominator).
              </li>
              <li className="text-[11px] text-[#727272]">
                If reporting an intensity ratio both for the energy consumed
                within the organization and outside of it, report these
                intensity ratios separately.
              </li>
            </ul>

            <p className="text-[13px] text-[#222222] mb-2">Guidance:</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Intensity ratios can be provided for, among others:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Products (such as energy consumed per unit produced)
              </li>
              <li className="text-[11px] text-[#727272]">
                Services (such as energy consumed per function or per service)
              </li>
              <li className="text-[11px] text-[#727272]">
                Sales (such as energy consumed per monetary unit of sales)
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              Organization-specific metrics (denominators) can include:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">Units of product</li>
              <li className="text-[11px] text-[#727272]">
                Production volume (such as metric tons, liters, or MWh)
              </li>
              <li className="text-[11px] text-[#727272]">
                Size (such as m floor space); m2
              </li>
              <li className="text-[11px] text-[#727272]">
                Number of full-time employees
              </li>
              <li className="text-[11px] text-[#727272]">
                Monetary units (such as revenue or sales)
              </li>
            </ul>
            <p className="text-[13px] text-[#222222] mb-2">Background:</p>
            <p className="text-[11px] text-[#727272] mb-1">
              Energy intensity ratios define energy consumption in the context
              of an organization-specific metric. These ratios express the
              energy required per unit of activity, output, or any other
              organization specific metric. Intensity ratios are often called
              normalized environmental impact data.In combination with the
              organization’s total energy consumption, reported in Disclosures
              reported in Disclosures 302-1 and 302-2, energy intensity helps to
              contextualize the organization’s efficiency, including in relation
              to other organizations.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12467&page=1",
  },
  {
    category: ["4"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 302: Energy 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 302-4 Reduction of energy consumption
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">
              Compilation requirement:
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              When compiling the information specified in Disclosure 302-4, the
              reporting organization shall:
            </p>

            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Exclude reductions resulting from reduced production capacity or
                outsourcing.
              </li>
              <li className="text-[11px] text-[#727272]">
                Describe whether energy reduction is estimated, modeled, or
                sourced from direct measurements.
              </li>
              <li className="text-[11px] text-[#727272]">
                If estimation or modeling is used, the organization shall
                disclose the methods used.
              </li>
            </ul>

            <p className="text-[13px] text-[#222222] mb-2">Recommendations::</p>
            <p className="text-[11px] text-[#727272] mb-2">
              The reporting organization can prioritize disclosing reduction
              initiatives that were implemented in the reporting period, and
              that have the potential to contribute significantly to reductions.
              The organization can describe reduction initiatives and their
              targets when reporting how it manages this topic.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Reduction initiatives can include:
            </p>
            <ul className="list-disc ml-6 mb-2">
              <li className="text-[11px] text-[#727272]">Process redesign</li>
              <li className="text-[11px] text-[#727272]">
                Conversion and retrofitting of equipment
              </li>
              <li className="text-[11px] text-[#727272]">
                Changes in behavior
              </li>
              <li className="text-[11px] text-[#727272]">
                Operational changes
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              The organization can report reductions in energy consumption by
              combining energy types, or separately for fuel, electricity,
              heating, cooling, and steam. The organization can also provide a
              breakdown of reductions in energy consumption by individual
              initiatives or groups of initiatives.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Guidance:</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Use-oriented figures can include, for example, the energy
              requirements of a car or a computer. Consumption patterns can
              include, for example, 10 percent less energy use per 100 km
              travelled or per time unit (hour, average working day)
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12467&page=1",
  },
  {
    category: ["5"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 302: Energy 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 302-5 Reductions in energy requirements of products and
            services
          </p>
          <div className="">
            <p className="text-[11px] text-[#727272] mb-2">
              The description of how the organization interacts with water can
              include information on specific catchments where water is
              withdrawn, consumed, and discharged, and information on what the
              water is used for in activities carried out by the organization
              and by entities upstream and downstream from the organization
              (e.g., for cooling, storage, incorporating in products, growing
              crops).
            </p>
            <p className="text-[11px] text-[#727272] mb-1">
              In the context of this Standard, suppliers with significant
              water-related impacts may include suppliers of water-intensive
              commodities or services, suppliers located in areas with water
            </p>
            <p className="text-[11px] text-[#727272] mb-1">
              stress, and/or suppliers with significant impacts on the local
              water environment and the related local communities.
            </p>
            <p className="text-[11px] text-[#727272] mb-1">
              If applicable, the organization can describe its environmental
              impacts caused by runoff, and how they are addressed. For example,
              runoff can carry high-nutrient and pollution loads due to the
              organization’s activities, leading to eutrophication and other
              negative impacts on local waterbodies. organization shall:
            </p>

            <p className="text-[13px] text-[#222222] mb-2">Recommendations:</p>
            <p className="text-[11px] text-[#727272] mb-2">
              When compiling the information specified in Disclosure 302-5, the
              reporting organization should:
            </p>
            <ul className="list-disc ml-6 mb-2">
              <li className="text-[11px] text-[#727272]">
                If subject to different standards and methodologies, describe
                the approach to selecting them.
              </li>
              <li className="text-[11px] text-[#727272]">
                Refer to industry use standards to obtain this information,
                where available (such as fuel consumption of cars for 100 km at
                90 km/h).
              </li>
            </ul>
            <p className="text-[13px] text-[#222222] mb-2">Guidance:</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Use-oriented figures can include, for example, the energy
              requirements of a car or a computer. Consumption patterns can
              include, for example, 10 percent less energy use per 100 km
              travelled or per time unit (hour, average working day).
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12467&page=1",
  },
  {
    category: ["6"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 306: Waste 2020
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 306-1 Waste generation and significant waste-related
            impacts
          </p>

          <div className="">
            <p className="text-[11px] text-[#727272] mb-2">
              When reporting on this disclosure, the organization can specify
              the types of inputs and outputs.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              The types of inputs and outputs can include raw materials, process
              and manufacturing materials, leaks and losses, waste, by-products,
              products, or packaging.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              The organization can assess and report whether inputs, activities,
              and outputs lead or could lead to significant waste-related
              impacts using the following criteria:
            </p>

            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Quantity of inputs used to produce the organization’s products
                or services, which will become waste after they are used for
                production.
              </li>

              <li className="text-[11px] text-[#727272]">
                Quantity of waste outputs generated in the organization’s own
                activities, or quantity of outputs it provides to entities
                downstream that will eventually become waste when they reach
                their end of life.
              </li>
              <li className="text-[11px] text-[#727272]">
                Hazardous characteristics of inputs and outputs. Properties of
                input materials or design characteristics of outputs that limit
                or prevent their recovery or limit the length of their life.
              </li>
              <li className="text-[11px] text-[#727272]">
                Known potential negative threats associated with specific
                materials when they are discarded. For example, the potential
                threat of marine pollution resulting from leakage of discarded
                plastic packaging into waterbodies.
              </li>
              <li className="text-[11px] text-[#727272]">
                Types of activities that lead to significant quantities of waste
                generation or to generation of hazardous waste.
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              The organization is required to report on inputs that it receives
              from entities upstream in its value chain, as well as outputs it
              provides to entities downstream in its value chain. For example,
              if an organization procures components with hazardous
              characteristics from a supplier and uses these in a product that
              will continue to carry these components and their hazardous
              characteristics, the organization is required to report these
              components under inputs that lead or could lead to significant
              waste-related impacts. Similarly, if an organization sells to
              consumers products that generate large quantities of packaging
              waste, it is required to report this packaging under outputs that
              lead or could lead to significant waste-related impacts.
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              If the organization has identified many inputs and outputs or many
              activities that lead or could lead to significant waste-related
              impacts, it may group these by:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                product or service category that the inputs and outputs relate
                to
              </li>
              <li className="text-[11px] text-[#727272]">
                business units or facilities that procure the inputs, or whose
                activities produce the outputs
              </li>
              <li className="text-[11px] text-[#727272]">
                categories of upstream and downstream activities that produce
                the outputs (for examples of upstream and downstream categories,
                see the guidance for Disclosure 302-2 in GRI 302: Energy 2016)
              </li>
            </ul>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12521",
  },
  {
    category: ["7"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 306: Waste 2020
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 306-2 Management of significant waste related impacts
          </p>

          <div className="">
            <p className="text-[11px] text-[#727272] mb-2">
              Actions, including circularity measures, to prevent waste
              generation and to manage significant impacts from waste generated
              can include:
            </p>

            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Input material choices and product design: Improving materials
                selection and product design through consideration for longevity
                and durability, repairability, modularity and disassembly, and
                recyclability.
              </li>
              <li className="text-[11px] text-[#727272]">
                Reducing the use of raw and finite materials by procuring
                secondary materials (e.g., used or recycled input materials) or
                renewable materials.
              </li>
              <li className="text-[11px] text-[#727272]">
                Substituting inputs that have hazardous characteristics with
                inputs that are nonhazardous.
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              Collaboration in the value chain and business model innovation:
              Setting policies for procurement from suppliers that have sound
              waste prevention and waste management criteria.
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Engaging in or setting up industrial symbiosis as a result of
                which the organization’s waste or other outputs (e.g.,
                by-products from production) become inputs for another
                organization.
              </li>

              <li className="text-[11px] text-[#727272]">
                Participating in a collective or individual extended producer
                responsibility scheme or applying product stewardship, which
                extends the producer’s responsibility for a product or service
                to its end of life.
              </li>
              <li className="text-[11px] text-[#727272]">
                Transitioning to and applying new business models, such as
                product service systems that use services instead of products to
                meet consumer demand.
              </li>
              <li className="text-[11px] text-[#727272]">
                Engaging in or setting up product take-back schemes and reverse
                logistics processes to divert products and materials from
                disposal.
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              End-of-life interventions:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Establishing and improving facilities for waste management,
                including facilities for the collection and sorting of waste.
              </li>
              <li className="text-[11px] text-[#727272]">
                Recovering products, components, and materials from waste
                through preparation for reuse and recycling.
              </li>
              <li className="text-[11px] text-[#727272]">
                Engaging with consumers to raise awareness about sustainable
                consumption practices such as reduced purchasing of products,
                product sharing, exchange, reuse, and recycling.
              </li>
            </ul>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosure 306-2b
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              This disclosure can provide insight into the level of control the
              organization assumes for waste management outsourced to a third
              party. In the context of this Standard, a third party includes a
              public or private waste management organization, or any other
              entity or group of individuals formally or informally involved in
              handling the reporting organization’s waste. Waste management by
              third parties can include the collection, transportation,
              recovery, and disposal of waste, as well as the supervision of
              such operations and the aftercare of disposal sites. The
              organization may specify agreements in a contract for the third
              party to follow when managing its waste, or rely on existing
              legislative obligations, such as local environmental laws and
              regulations, to ensure that the third party manages the waste
              adequately.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosure 306-2c
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              The processes that the organization has in place for collecting
              and monitoring waste-related data can reflect its commitment to
              managing waste-related impacts. Such processes can include online
              data entry, maintaining a centralized database, real-time
              weighbridge measurement, and annual external data validation. The
              organization can specify whether the data collection and
              monitoring processes extend beyond waste generated in its own
              activities to include waste generated upstream and downstream in
              its value chain.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12521",
  },
  {
    category: ["8"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 306: Waste 2020
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 306-3 Waste generated
          </p>

          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">
              Compilation requirement:
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              2.1 When compiling the information specified in Disclosure
              306-3-a, the reporting organization shall:
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              2.1.1 exclude effluent, unless required by national legislation to
              be reported under total waste
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              2.1.2 use 1000 kilograms as the measure for a metric ton.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              This disclosure covers waste generated in the organization’s own
              activities. The organization can separately report waste generated
              upstream and downstream in its value chain, if this information is
              available.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosure 306-3a
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              When reporting composition of the waste, the organization can
              describe:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                The type of waste, such as hazardous waste or non-hazardous
                waste;
              </li>
              <li className="text-[11px] text-[#727272]">
                The waste streams, relevant to its sector or activities (e.g.,
                tailings for an organization in the mining sector, electronic
                waste for an organization in the consumer electronics sector, or
                food waste for an organization in the agriculture or in the
                hospitality sector)
              </li>
              <li className="text-[11px] text-[#727272]">
                The materials that are present in the waste (e.g., biomass,
                metals, non-metallic minerals,plastics, textiles).
              </li>
            </ul>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosure 306-3b
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              To help understand the data, the organization can explain the
              reasons for the difference between the weight of waste generated
              and the weight of waste directed to recovery or disposal. This
              difference can be a result of precipitation or evaporation, leaks
              or losses, or other modifications to the waste. In the context of
              this Standard, leaks result from physical or technical failures
              (e.g., a trail of waste from a waste collection truck), while
              losses result from inadequate security measures or administrative
              failures (e.g., theft or lost records). To help understand how the
              data has been compiled, the organization can specify whether the
              data has been modeled or sourced from direct measurements, such as
              waste transfer notes from contracted waste collectors, external
              assurance, or audits of waste-related data.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12521",
  },
  {
    category: ["9"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 306: Waste 2020
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 306-4 Waste diverted from disposal
          </p>

          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">
              Compilation requirement:
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              2.2 When compiling the information specified in Disclosure 306-4,
              the reporting organization shall:
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              2.2.1 exclude effluent, unless required by national legislation to
              be reported under total waste
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              2.1.2 use 1000 kilograms as the measure for a metric ton.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosure 306-4a
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              When reporting composition of the waste, the organization can
              describe:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                The type of waste, such as hazardous waste or non-hazardous
                waste; the waste streams, relevant to its sector or activities
                (e.g., tailings for an organization in the mining sector,
                electronic waste for an organization in the consumer electronics
                sector, or food waste for an organization in the agriculture or
                in the hospitality sector)
              </li>
              <li className="text-[11px] text-[#727272]">
                The materials that are present in the waste (e.g., biomass,
                metals, non-metallic minerals, plastics, textiles)
              </li>
              <li className="text-[11px] text-[#727272]">
                The materials that are present in the waste (e.g., biomass,
                metals, non-metallic minerals,plastics, textiles).
              </li>
            </ul>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosures 306-4-b and 306-4-c
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              When reporting on Disclosures 306-4-b-ii and 306-4-c-ii, the
              organization can specify the type of recycling operations, such as
              downcycling, upcycling, composting, or anaerobic digestion.
              Besides preparation for reuse and recycling, the organization can
              report the other types of recovery operations it uses under
              Disclosures 306-4-b-iii and 306-4-iii, such as repurposing or
              refurbishment.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosure 306-4-d
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Reporting on the quantity and type of waste diverted from disposal
              onsite and offsite shows the extent to which the organization
              knows how its waste is managed. In the context of this Standard,
              ‘onsite’ means within the physical boundary or administrative
              control of the reporting organization, and ‘offsite’ means outside
              the physical boundary or administrative control of the reporting
              organization.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosure 306-4-e
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              To help understand the data, the organization can explain the
              reasons for the difference between the weights of waste diverted
              from disposal onsite and offsite (e.g., lack of infrastructure
              onsite to recover materials from waste). It can also describe
              sector practices, sector standards, or external regulations that
              mandate a specific recovery operation. To help understand how the
              data has been compiled, the organization can specify whether the
              data has been modeled or sourced from direct measurements, such as
              waste transfer notes from contracted waste collectors, external
              assurance, or audits of waste-related data.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12521",
  },
  {
    category: ["10"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 306: Waste 2020
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 306-5 Waste directed to disposal
          </p>

          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">
              Compilation requirement:
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              2.4. When compiling the information specified in Disclosure 306-5,
              the reporting organization shall:
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              2.4.1exclude effluent, unless required by national legislation to
              be reported under total waste;
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              2.4.2 use 1000 kilograms as the measure for a metric ton.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosure 306-5a
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              When reporting composition of the waste, the organization can
              describe:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                The type of waste, such as hazardous waste or non-hazardous
                waste
              </li>
              <li className="text-[11px] text-[#727272]">
                The waste streams, relevant to its sector or activities (e.g.,
                tailings for an organization in the mining sector, electronic
                waste for an organization in the consumer electronics sector, or
                food waste for an organization in the agriculture or in the
                hospitality sector)
              </li>
              <li className="text-[11px] text-[#727272]">
                The materials that are present in the waste (e.g., biomass,
                metals, non-metallic minerals, plastics, textiles).
              </li>
            </ul>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosures 306-5-b and 306-5-c
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Besides incineration and landfilling, the organization can specify
              the other types of disposal operations it uses under Disclosures
              306-5-b-iv and 306-5-c-iv, such as dumping, open burning, or deep
              well injection.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosure 306-5-d
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Reporting the quantity and type of waste directed to disposal
              onsite and offsite shows the extent to which the organization
              knows how its waste is managed. In the context of this Standard,
              ‘onsite’ means within the physical boundary or administrative
              control of the reporting organization, and ‘offsite’ means outside
              the physical boundary or administrative control of the reporting
              organization.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">
              Guidance for Disclosure 306-5-e
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              To help understand the data, the organization can explain the
              reasons for the difference between the weights of waste directed
              to disposal onsite and offsite (e.g., local regulations that
              prohibit landfilling of specific types of waste). It can also
              describe sector practices, sector standards, or external
              regulations that mandate a specific disposal operation. To help
              understand how the data has been compiled, the organization can
              specify whether the data has been modeled or sourced from direct
              measurements, such as waste transfer notes from contracted waste
              collectors, external assurance, or audits of waste-related data.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12521",
  },
  {
    category: ["11"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 301: Materials 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 301-1 Materials used by weight or volume
          </p>

          <div className="">
            <p className="text-[11px] text-[#222222] mb-2">
              Renewable Materials:
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              Materials that can be replenished naturally over time, such as
              Wood, Paper, Leather.
            </p>

            <p className="text-[11px] text-[#222222] mb-2">
              Non-Renewable Materials:
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              Materials that cannot be replenished naturally over time. They are
              typically formed from geological processes that take millions of
              years, such as Fossil Fuel, Glass, Fuel.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">
              Internally sourced materials{" "}
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Materials that the company makes itself.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Estimation </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Process of making an approximate calculation of something.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">
              Direct measurement
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Process of measuring something directly. For example, a company
              might directly measure the total weight or volume of materials
              used by weighing or measuring each batch of materials used.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              GRI 301-1 focuses on the materials an organization uses, measured
              by weight or volume. This data is important to understand the
              organization's resource consumption.
            </p>

            <p className="text-[11px] text-[#222222] mb-2">GRI Guidance: </p>
            <p className="text-[11px] text-[#727272] mb-2">
              The reported usage data are to reflect the material in its
              original state, and not to be presented with further data
              manipulation, such as reporting it as ‘dry weight’.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://globalreporting.org/pdf.ashx?id=12456&page=1",
  },
  {
    category: ["12"],

    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 301: Materials 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 301-2 Recycled input materials used
          </p>
          <div className="">
            <p className="text-[11px] text-[#222222] mb-2">Input materials</p>

            <p className="text-[11px] text-[#727272] mb-2">
              Materials that an organization uses to produce its products and
              services.Examples of input materials include: Raw materials (e.g.,
              wood, iron ore, cotton, agricultural products); Intermediate
              products (e.g., steel, paper, textiles); Packaging materials
              (e.g., cardboard, plastic, glass, metal)
            </p>

            <p className="text-[11px] text-[#222222] mb-2">
              Recycled input materials
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              GRI 301-2 requires organizations to report on the percentage of
              recycled input materials used to manufacture the organization's
              primary products and services.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">
              Compilation requirements:
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              When compiling the information specified in Disclosure 301-3, the
              reporting organization shall:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Use the total weight or volume of materials used as specified in
                Disclosure
              </li>
              <li className="text-[11px] text-[#727272]">
                Calculate the percentage of recycled input materials used by
                applying the following formula:
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              Percentage of recycled input materials used = [Total recycled
              input materials used/Total input materials used] * 100
            </p>

            <p className="text-[11px] text-[#222222] mb-2">GRI Guidance:</p>

            <p className="text-[11px] text-[#727272] mb-2">
              If material weight and volume measurements are stated as different
              units, the organization can convert measurements to standardized
              units.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://globalreporting.org/pdf.ashx?id=12456&page=1",
  },
  {
    category: ["13"],

    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 301: Materials 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 301-3 Reclaimed products and their packaging materials
          </p>
          <div className="">
            <p className="text-[11px] text-[#727272] mb-2">
              <b>Reclaimed products</b> are products that have been used and
              then collected, processed, and marketed for reuse. Reclaimed
              products can be reused in their original form or they can be used
              to manufacture new products.
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              GRI 301-3 requires organizations to report on the percentage of
              reclaimed products and their packaging materials for each product
              category.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">
              Compilation requirements:
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              When compiling the information specified in Disclosure 301-3, the
              reporting organization shall:
            </p>
            <ul className="list-disc ml-6 mb-1">
              <li className="text-[11px] text-[#727272]">
                Exclude rejects and recalls of products
              </li>
              <li className="text-[11px] text-[#727272]">
                Calculate the percentage of reclaimed products and their
                packaging materials
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              Percentage of reclaimed products and their packaging materials =
              [Products and their packaging materials reclaimed within the
              reporting period / Products sold within the reporting period] *
              100
            </p>
            <p className="text-[11px] text-[#222222] mb-2">GRI Guidance:</p>

            <p className="text-[11px] text-[#727272] mb-2">
              The reporting organization can also report recycling or reuse of
              packaging separately.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://globalreporting.org/pdf.ashx?id=12456&page=1",
  },
  {
    category: ["14"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 303: Water and Effluents 2018
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 303-1 Interactions with water as a shared resource
          </p>

          <div className="">
            <p className="text-[11px] text-[#727272] mb-2">
              The description of how the organization interacts with water can
              include information on specific catchments where water is
              withdrawn, consumed, and discharged, and information on what the
              water is used for in activities carried out by the organization
              and by entities upstream and downstream from the organization
              (e.g., for cooling, storage, incorporating in products, growing
              crops).
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              In the context of this Standard, suppliers with significant
              water-related impacts may include suppliers of water-intensive
              commodities or services, suppliers located in areas with water
              stress, and/or suppliers with significant impacts on the local
              water environment and the related local communities.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              If applicable, the organization can describe its environmental
              impacts caused by runoff, and how they are addressed. For example,
              runoff can carry high-nutrient and pollution loads due to the
              organization’s activities, leading to eutrophication and other
              negative impacts on local waterbodies.
            </p>
            <p className="text-[15px] text-[#0057A5] mb-2">
              Guidance for Disclosure 303-1-b
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              {" "}
              When assessing impacts, it is important that the organization
              consider its future impacts on water quality and availability, as
              these factors can change over time. Tools and methodologies for
              identifying impacts can include life cycle assessments,
              environmental impact assessments, water footprint assessments,
              scenario analysis, and stakeholder engagement. If information is
              estimated or modeled, rather than sourced from direct
              measurements, the organization can explain its estimation or
              modeling methods.
            </p>

            <p className="text-[15px] text-[#0057A5] mb-2">
              Guidance for Disclosure 303-1-c
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              {" "}
              Working with stakeholders is critical for an organization to
              steward water as a shared resource and account for the needs of
              other water users of the catchment. An organization’s stakeholders
              can include:
            </p>

            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                suppliers with significant water-related impacts
              </li>
              <li className="text-[11px] text-[#727272]">
                Users of its products and services
              </li>
              <li className="text-[11px] text-[#727272]">
                Local communities and action groups
              </li>
              <li className="text-[11px] text-[#727272]">
                Employees and other workers
              </li>
              <li className="text-[11px] text-[#727272]">
                Other water users in its sector or industry
              </li>
              <li className="text-[11px] text-[#727272]">
                Governments, regulators, and civil society organizations
              </li>
              <li className="text-[11px] text-[#727272]">
                Global initiatives, trade associations, and partnerships
              </li>
            </ul>

            <p className="text-[11px] text-[#727272] mb-2">
              The organization can describe how it participates in discussions
              with stakeholders, the frequency of this engagement, and its role
              in these discussions. Outcomes of working with stakeholders can
              include, for example, collective target-setting for water use,
              increased investment in infrastructure, policy advocacy, and
              capacity building and awareness raising. When reporting on its
              engagement with suppliers, the organization can describe How the
              organization engages with its suppliers to help them improve their
              water
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Management practices
              </li>
              <li className="text-[11px] text-[#727272]">
                The number of suppliers engaged
              </li>
              <li className="text-[11px] text-[#727272]">
                The outcomes of this engagement
              </li>
              <li className="text-[11px] text-[#727272]">
                The amount of procurement that the proportion of engaged
                suppliers represents
              </li>
              <li className="text-[11px] text-[#727272]">
                Why information is not requested from suppliers with significant
                water-related impacts
              </li>
              <li className="text-[11px] text-[#727272]">
                Future plans and goals for working with suppliers to reduce
                water-related impacts
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              Water impacts related to products and services might be addressed
              by, for example, improving product design, providing information
              and advice on the responsible use of products and services, and
              holding regular consultations with users
            </p>
            <p className="text-[15px] text-[#0057A5] mb-2">
              Guidance for Disclosure 303-1-d
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Meaningful targets for managing water-related impacts:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Account for the local context where water is withdrawn and
                discharged;
              </li>

              <li className="text-[11px] text-[#727272]">
                Are scientifically informed by sustainable thresholds and the
                social context of a given catchmen
              </li>

              <li className="text-[11px] text-[#727272]">
                Align with public sector efforts, such as the water- related
                targets of the UN Sustainable Development Goals, in particular
                Goal 6, or targets set by national and local government
                institution
              </li>
              <li className="text-[11px] text-[#727272]">
                Are informed by the advocacy of other stakeholders, such as
                civil society organizations, trade associations, and action
                groups.
              </li>
            </ul>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12488",
  },
  {
    category: ["15"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 303: Water and Effluents 2018
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 303-2 Management of water discharge related impacts
          </p>
          <div className="">
            <p className="text-[11px] text-[#727272] mb-2">
              Water quality refers to the physical, chemical, biological, and
              taste-related characteristics of water. It is a measure of water
              suitability for a given purpose or function, including its use as
              a human right. Water quality standards help uphold water quality
              in order to protect ecosystems, wildlife, and human health and
              welfare, and can be based on water properties, such as temperature
              or pH value. The specific choice of water quality standards and
              parameters can vary depending on an organization’s product,
              services, and facility locations, and can depend on national
              and/or regional regulations, as well as the profile of the
              receiving waterbody.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12488",
  },
  {
    category: ["16"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 303: Water and Effluents 2018
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 303-3 Water withdrawal
          </p>
          <div className="">
            <p className="text-[11px] text-[#222222] mb-2">
              Compilation Requirement:
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              2.1 When compiling the information specified in Disclosure 303-3,
              the reporting organization shall use publicly available and
              credible tools and methodologies for assessing water stress in an
              area.
            </p>

            <p className="text-[11px] text-[#222222] mb-2">
              Guidance for Disclosure 303-3-b
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              Water stress refers to the ability, or lack thereof, to meet the
              human and ecological demand for water. Water stress can refer to
              the availability, quality, or accessibility of water. Publicly
              available and credible tools for assessing areas with water stress
              include the World Resources Institute ‘Aqueduct Water Risk Atlas,'
              and the WWF 'Water Risk Filter'. Based on these tools, water
              stress in an area may be assessed using either of the following
              indicators and their thresholds:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                he ratio of total annual water withdrawal to total available
                annual renewable water supply (i.e., baseline water stress) is
                high (40-80%) or extremely high (&lt; 80%)
              </li>
              <li className="text-[11px] text-[#727272]">
                he ratio of water consumption-to-availability (i.e., water
                depletion) is moderate (dry-year depletion, where for at least
                10% of the time, the monthly depletion ratio is &gt;75%), high
                (seasonal depletion, where for one month of the year on average,
                the depletion ratio is &gt;75%), or very high (ongoing
                depletion, where the depletion ratio on average is &gt;75%)
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              The organization may use these indicators even though they account
              only for quantity and not the quality or accessibility of water as
              per the inclusive approach to the definition of water stress. The
              organization can complement the results from these tools with
              their own assessments, to provide more granular local-level data.
              Water stress in an area may be measured at catchment level at a
              minimum.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Background</p>
            <p className="text-[11px] text-[#727272] mb-2">
              The volume of water withdrawal from areas with water stress can
              indicate an organization’s impacts in sensitive locations. To
              learn more about locations where water-related impacts might be
              significant, and where actions to address them are most needed,
              the reporting organization can also report the information
              requested in Disclosure 303-3 for each facility in areas with
              water stress. This can give stakeholders more confidence in the
              organization’s water stewardship efforts and practices.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12488",
  },
  {
    category: ["17"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 303: Water and Effluents 2018
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 303-4 Water discharge
          </p>
          <div className="">
            <p className="text-[11px] text-[#222222] mb-2">
              Compilation Requirement:
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              2.3 When compiling the information specified in Disclosure 303-4,
              the reporting organization shall use publicly available and
              credible tools and methodologies for assessing water stress in an
              area.
            </p>

            <p className="text-[11px] text-[#222222] mb-2">
              Guidance for Disclosure 303-4-a-iv
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              An example of third-party water discharge is when an organization
              sends water and effluents to other organizations for use. In these
              instances, the organization is required to report the volume of
              this water discharge separately.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">
              Guidance for Disclosures 303-4-b and 303-4-c
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              An example of third-party water discharge is when an organization
              sends water and effluents to other organizations for use. In these
              instances, the organization is required to report the volume of
              this water discharge separately.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">
              Guidance for Disclosure 303-4-d
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              The volume of water withdrawal from areas with water stress can
              indicate an organization’s impacts in sensitive locations. To
              learn more about locations where water-related impacts might be
              significant, and where actions to address them are most needed,
              the reporting organization can also report the information
              requested in Disclosure 303-3 for each facility in areas with
              water stress. This can give stakeholders more confidence in the
              organization’s water stewardship efforts and practices.
            </p>

            <p className="text-[11px] text-[#222222] mb-2">Background</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Quantifying the volume of water discharge can help an organization
              understand its negativeimpacts on the receiving waterbody. The
              relationship between water discharge and negative impacts is not
              linear. An increase in the total volume of water discharge does
              not necessarily correspond to greater negative impacts, since
              these impacts depend on the quality of the water discharge and the
              sensitivity of the receiving waterbody. An organization with a
              high volume of water discharge, but also a high level of treatment
              and strict quality standards, can have positive impacts on the
              receiving waterbody. To learn more about locations where
              water-related impacts might be significant, and where actions to
              address them are most needed, the reporting organization can also
              report the information requested in Disclosure 303-4 for each
              facility in areas with water stress.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12488",
  },
  {
    category: ["18"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 303: Water and Effluents 2018
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 303-5 Water consumption
          </p>
          <div className="">
            <p className="text-[11px] text-[#222222] mb-2">
              Guidance for Disclosure 303-5
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              If the reporting organization cannot directly measure water
              consumption, it may calculate this using the following formula:
              Water consumption = Total water withdrawal -Total water discharge
            </p>

            <p className="text-[11px] text-[#222222] mb-2">
              Guidance for Disclosure 303-5-c
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              If the water in storage has been identified as having a
              significant water-related impact, the organization is required to
              report change in water storage. The organization may calculate
              change in water storage using the following formula: Change in
              water storage = Total water storage at the end of the reporting
              period - Total water storage at the beginning of the reporting
              period.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Background</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Water consumption measures water used by an organization such that
              it is no longer available for use by the ecosystem or local
              community in the reporting period. Reporting the volume of water
              consumption can help the organization understand the overall scale
              of its impact due to water withdrawal on downstream water
              availability.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12488",
  },
  {
    category: ["19"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 401: Employment 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 401-1:New employee hires and employee turnover
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-4">GRI Guidance:</p>
            <p className="text-[11px] text-[#727272]">
              An organization can use the following age groups:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Under 30 years old;
              </li>

              <li className="text-[11px] text-[#727272]">30-50 years old;</li>
              <li className="text-[11px] text-[#727272]">Over 50 years old.</li>
            </ul>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12543&page=1",
  },
  {
    category: ["20"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 401: Employment 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 401-2: Benefits provided to full-time employees that are not
            provided to temporary or part-time employees
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-4">Background</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Data reported under this disclosure provide a measure of an
              organization’s investment in human resources and the minimum
              benefits it offers its full-time employees. The quality of
              benefits for full-time employees is a key factor in retaining
              employees.
            </p>
            <p className="text-[13px] text-[#222222] mb-4">
              Compilation requirements
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              When compiling the information specified in Disclosure 401-2, the
              reporting organization shall exclude in-kind benefits such as
              provision of sports or child day care facilities, free meals
              during working time, and similar general employee welfare
              programs.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12543&page=1",
  },
  {
    category: ["21"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 401: Employment 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 401-3: Parental Leave
          </p>
          <div className="">
            <p className="text-[11px] text-[#727272] mb-4">
              Employees entitled to parental leave means those employees that
              are covered by organizational policies, agreements or contracts
              that contain parental leave entitlements. To determine who
              returned to work after parental leave ended and were still
              employed 12 months later, an organization can consult records from
              the prior reporting periods.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12543&page=1",
  },

  {
    category: ["22"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 403: Occupational Health and Safety 2018
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 403-4: Worker participation, consultation and communication on
            occupational health and safety
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">GRI Guidance 403-4a:</p>
            <p className="text-[11px] text-[#727272] mb-4">
              When describing the processes for worker participation in
              occupational health and safety, the reporting organization can
              include information on:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Formal participation, based on legal requirements;
              </li>

              <li className="text-[11px] text-[#727272]">
                Participation through engagement with formally recognized
                workers’ representatives;
              </li>
              <li className="text-[11px] text-[#727272]">
                Direct participation, particularly by affected workers (e.g.,
                the direct involvement of all workers in occupational health and
                safety decisions in small organizations);
              </li>
              <li className="text-[11px] text-[#727272]">
                The use of committees, and how these committees are established
                and operated;
              </li>
              <li className="text-[11px] text-[#727272]">
                Participation in the occupational health and safety management
                system (e.g., participation in identification of hazards,
                assessment of risks, application of the hierarchy of controls,
                investigation of incidents, audits, decision-making about the
                use of contractors and outsourcing);
              </li>
              <li className="text-[11px] text-[#727272]">
                How obstacles to participation are identified and removed (e.g.,
                by providing training, by protecting workers against reprisals).
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-4">
              When describing the processes for providing access to and
              communicating relevant information on occupational health and
              safety to workers, the organization can report whether it provides
              information about work-related incidents and the actions taken in
              response.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 403-4-b
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              A common form of worker participation in occupational health and
              safety is through joint management-worker health and safety
              committees. In addition to direct participation of workers from
              all job levels in these committees, workers’ representatives,
              where they exist, might also be involved in these joint
              activities, as they might be authorized to make decisions about
              occupational health and safety, among other workplace decisions.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Where formal joint management-worker health and safety committees
              exist, the organization can also describe the level at which each
              committee operates within the organization, its dispute resolution
              mechanism, its chairing responsibilities, and how the committee
              members are protected against reprisals.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Disclosure 403-4-b requires a description of whether and, if so,
              why any workers are not represented by these committees. It does
              not require information on which workers are or are not members of
              such committees.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12565&page=21",
  },
  {
    category: ["23"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 403: Occupational Health and Safety 2018
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 403-8: Workers covered by an occupational health and safety
            management system
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">GRI Guidance 403-8a:</p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure indicates what proportion of an organization’s
              employees, and workers who are not employees but whose work and/or
              workplace is controlled by the organization, are covered by an
              occupational health and safety management system based on legal
              requirements and/or recognized standards/guidelines. The list of
              legal requirements and/or recognized standards/guidelines used by
              the reporting organization in its occupational health and safety
              management system are reported using Disclosures 403-1-a-i and
              403-1-a-ii in the Topic management disclosures section. If not all
              workers are covered by the occupational health and safety
              management system, the organization can report whether any of the
              workers not covered are at high risk of work-related injury or ill
              health. In addition to the information required by this
              disclosure, the organization can report the number and percentage
              of sites covered by an occupational health and safety management
              system based on legal requirements and/or recognized
              standards/guidelines. The organization can also describe:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                The approach used for internal audits (e.g., whether they are
                carried out following an internally-developed audit standard or
                a recognized audit standard, what is the qualification of the
                auditors);
              </li>

              <li className="text-[11px] text-[#727272]">
                Whether any processes or functions have been excluded from the
                scope of the audit or certification, and how occupational health
                and safety performance is being monitored in those areas;
              </li>
              <li className="text-[11px] text-[#727272]">
                The audit or certification standard used.
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-4">
              Audits by external parties may include both second-party and
              third-party audits. Second-party audits are usually performed by
              customers or others on behalf of customers, or by any other
              external parties that have a formal interest in the organization.
              Third-party audits are performed by independent organizations such
              as registrars (i.e., certification bodies) or regulators.
            </p>
            <p className="text-[11px] text-black mb-2">GRI Guidance 403-8b:</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Types of worker can be based on criteria such as full-time,
              part-time, non-guaranteed hours, permanent or temporary basis,
              type or degree of control (e.g., control of work or workplace,
              sole or shared control), and location, among others.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12565&page=21",
  },
  {
    category: ["24"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 403: Occupational Health and Safety 2018
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 403-9: Work-related injuries
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Compilation requirements:
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              2.1 When compiling the information specified in Disclosure 403-9,
              the reporting organization shall:
            </p>

            <p className="text-[11px] text-[#727272] mb-4">
              2.1.1 exclude fatalities in the calculation of the number and rate
              of high consequence work-related injuries;
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              2.1.2 include fatalities as a result of work-related injury in the
              calculation of the number and rate of recordable work-related
              injuries;
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              2.1.3 include injuries as a result of commuting incidents only
              where the transport has been organized by the organization;
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              2.1.4calculate the rates based on either 200,000 or 1,000,000
              hours worked, using the following formulas:
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Rate of fatalities as a result of work-related injury = Number of
              fatalities as a result of work-related injury
              ______________________ Number of hours worked x [200,000 or
              1,000,000] Rate of high-consequence work-related injuries
              (excluding fatalities) = Number of high-consequence work-related
              injuries (excluding fatalities) ______________________ Number of
              hours worked x [200,000 or 1,000,000] Rate of recordable
              work-related injuries = Number of recordable work-related injuries
              ______________________ Number of hours worked x [200,000 or
              1,000,000]
            </p>
            <p className="text-[11px] text-black mb-2">GRI Guidance 403-9:</p>
            <p className="text-[11px] text-[#727272] mb-4">
              An increase in the number or rate of reported incidents does not
              necessarily mean that there have been a greater number of
              incidents than before; it can indicate an improvement in the
              recording and reporting of incidents. If an increase in the number
              or rate of reported incidents is the result of the organization’s
              actions to improve the reporting and recording of fatalities,
              injuries, and ill health, or its actions to expand the scope of
              its management system to cover more workers or workplaces, the
              reporting organization can explain this and report on these
              actions and their results. Types of work-related injury can
              include death, amputation of a limb, laceration, fracture, hernia,
              burns, loss of consciousness, and paralysis, among others. In the
              context of this Standard, work-related musculoskeletal disorders
              are covered under ill health (and not injuries) and are to be
              reported using Disclosure 403-10. If the organization operates in
              a jurisdiction where worker compensation systems classify
              musculoskeletal disorders as injuries, the organization can
              explain this and report these disorders using Disclosure 403-9.
              Injuries involving members of the public as a result of a
              work-related incident are not included in this disclosure, but the
              organization can report this information separately. For example,
              the organization can report incidents where a vehicle driven by a
              worker causes the deaths of other road users or incidents where
              visitors are injured during their visit to the organization’s
              workplace.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for reporting on high-consequence work-related injuries
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              As per the definition of recordable work-related injury, the
              organization is required to report all work-related injuries as
              part of the ‘number and rate of recordable work-related injuries’.
              In addition, the organization is required to separately report
              high-consequence work- related injuries, with a breakdown by:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Fatalities, to be reported using Disclosures 403-9-a-i and
                403-9-b-i.
              </li>

              <li className="text-[11px] text-[#727272]">
                Other injuries from which the worker cannot recover (e.g.,
                amputation of a limb), or does not or is not expected to recover
                fully to pre-injury health status within 6 months (e.g.,
                fracture with complications), to be reported using Disclosures
                403-9-a-ii and 403-9-b-ii.
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-4">
              The definition of ‘high-consequence work-related injury’ uses
              ‘recovery time’, instead of ‘lost time’, as the criterion for
              determining the severity of an injury. Lost time is an indicator
              of the loss of productivity for an organization as a result of a
              work-related injury; it does not necessarily indicate the extent
              of harm suffered by a worker.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              ‘Recovery time’, in contrast, refers to the time needed for a
              worker to recover fully to pre-injury health status; it does not
              refer to the time needed for a worker to return to work. In some
              cases, a worker might return to work before full recovery.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              In addition to reporting information on high- consequence
              work-related injuries based on recovery time as required by this
              disclosure, the organization can also report the number and rate
              of work-related injuries that resulted in lost-workday cases, the
              average number of lost days per lost-workday case, the number of
              lost workdays, and the absentee rate.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 403-9-c
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure covers work-related hazards that pose a risk of
              high-consequence injury if not controlled, even when there are
              control measures in place. The hazards might have been identified
              proactively through risk assessment, or reactively as a result of
              either a high- potential incident or a high-consequence injury.
              Examples of work-related hazards causing or contributing to
              high-consequence injuries include excessive workload demands,
              tripping hazards, or exposure to flammable materials. If the
              identified work-related hazards vary significantly across
              different locations, the organization may group or disaggregate
              these by relevant categories, such as by geographical area or
              business line. Similarly, if there are a high number of hazards,
              the organization may group or categorize them to facilitate
              reporting. When reporting how it has determined which work-
              related hazards pose a risk of high-consequence injury using
              Disclosure 403-9-c-i, the organization can describe the criteria
              or threshold used to determine which hazards pose such a risk and
              which do not. The processes to identify hazards and assess risks,
              and to apply the hierarchy of controls, are reported using
              Disclosure 403-2-a.
              <b>Disclosure 403-9-c-ii</b> does not require reporting which
              work-related hazards have caused or contributed to which
              high-consequence injuries during the reporting period; it requires
              the aggregate analysis of all work- related hazards that resulted
              in high-consequence injuries. If a work-related incident resulting
              in a high-consequence injury is still under investigation at the
              end of the reporting period, the organization can state this in
              the report. The organization can report on actions taken during
              the reporting period to eliminate hazards and minimize risks that
              were identified, or to address work- related incidents that took
              place, in prior reporting periods.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 403-9-d
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure covers any actions taken or underway to eliminate
              other work-related hazards and minimize risks (i.e., not covered
              in Disclosure 403-9-c) using the hierarchy of controls. This
              disclosure can include actions taken in response to
              non-high-consequence work- related injuries, and work-related
              incidents with low probability of causing high-consequence
              injuries.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 403-9-f
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Types of worker can be based on criteria such as employment type
              (full-time or part-time), employment contract (permanent or
              temporary), type or degree of control (e.g., control of work or
              workplace, sole or shared control), and location, among others.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 403-9-g
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              If the organization follows the ILO code of practice on Recording
              and notiflcation of occupational accidents and diseases, it can
              state this in response to Disclosure 403-9-g. If the organization
              does not follow the ILO code of practice, it can indicate which
              system of rules it applies in recording and reporting work-related
              injuries and its relationship to the ILO code of practice. If the
              organization cannot directly calculate the number of hours worked,
              it may estimate this on the basis of normal or standard hours of
              work, taking into account entitlements to periods of paid leave of
              absence from work (e.g., paid vacations, paid sick leave, public
              holidays) and explain this in the report. When the organization
              cannot directly calculate or estimate the number of hours worked
              (e.g., because the workers performed non-routine work during an
              emergency situation, or because the performed work was not paid
              for by the hour), it is required to provide a reason for this
              omission as set out in GRI 101: Foundation. See clause 3.2 in GRI
              101 for requirements on reasons for omission
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for clauses 2.2.1 and 2.2.2
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Target 8.8 of the UN Sustainable Development Goals aims to
              ‘protect labour rights and promote safe and secure working
              environments for all workers, including migrant workers, in
              particular women migrants, and those in precarious employment’.
              Some groups might be at increased risk of work-related injury due
              to demographic factors such as sex, gender, migrant status, or
              age; it can thus be beneficial to break down data on work-related
              injuries by these demographic criteria. ILO Convention 143
              ‘Migrant Workers (Supplementary Provisions) Convention’ defines
              ‘migrant worker’ as ‘a person who migrates or who has migrated
              from one country to another with a view to being employed
              otherwise than on his own account and includes any person
              regularly admitted as a migrant worker’. If the data on
              work-related injuries are driven primarily by certain types of
              injury (e.g., amputation, paralysis) or incident (e.g., explosion,
              road accident), the organization can provide a breakdown of this
              information.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for clause 2.1.3
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Clause 2.1.3 requires the organization to include injuries as a
              result of commuting incidents in cases where the transport has
              been organized by the organization (e.g., company or contracted
              bus or vehicle). The organization can report other commuting
              incidents separately; for example if this information is to be
              reported under local law.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for clause 2.1.4
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Clause 2.1.4 requires the organization to calculate the rates
              based on either 200,000 or 1,000,000 hours worked. Standardized
              rates allow for meaningful comparisons of statistics, for example
              between different periods or organizations, or help account for
              differences in the number of workers in the reference group and
              the number of hours worked by them. A rate based on 200,000 hours
              worked indicates the number of work-related injuries per 100
              full-time workers over a one-year timeframe, based on the
              assumption that one full-time worker works 2,000 hours per year.
              For example, a rate of 1.0 means that, on average, there is one
              work-related injury for every group of 100 full-time workers over
              a one-year timeframe. A rate based on 1,000,000 hours worked
              indicates the number of work-related injuries per 500 full-time
              workers over a one-year timeframe. A rate based on 200,000 hours
              worked might be more suitable for small organizations. In addition
              to standardized rates, this disclosure requires the organization
              to report absolute data (i.e., numbers), to allow information
              users to calculate the rates themselves using other methodologies
              if needed.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12565&page=21",
  },
  {
    category: ["25"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 403: Occupational Health and Safety 2018
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 403-10: Work-related ill health
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Compilation requirements:
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              When compiling the information specified in Disclosure 403-10, the
              reporting organization shall include fatalities as a result of
              work-related ill health in the calculation of the number of cases
              of recordable work-related ill health.
            </p>

            <p className="text-[11px] text-[#727272] mb-4">
              Work-related ill health can include acute, recurring, and chronic
              health problems caused or aggravated by work conditions or
              practices. They include musculoskeletal disorders, skin and
              respiratory diseases, malignant cancers, diseases caused by
              physical agents (e.g., noise-induced hearing loss,
              vibration-caused diseases), and mental illnesses (e.g., anxiety,
              post-traumatic stress disorder).
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure covers, but is not limited to, the diseases
              included in the ILO List of Occupational Diseases. In the context
              of this Standard, work-related musculoskeletal disorders are
              covered under ill health (and not injuries) and are to be reported
              using this disclosure. See references 5 and 16 in the References
              section.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure covers all cases of work-related ill health
              notified to the reporting organization or identified by the
              organization through medical surveillance, during the reporting
              period. The organization might be notified of cases of
              work-related ill health through reports by affected workers,
              compensation agencies, or healthcare professionals. The disclosure
              may include cases of work-related ill health that were detected
              during the reporting period among former workers. If the
              organization determines, for example through investigation, that
              the notified case of work-related ill health is not due to
              exposure whilst working for the organization, it can explain this
              in the report.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure covers both short-latency and long- latency
              work-related ill health. Latency refers to the time period between
              exposure and the onset of ill health. Many cases of long-latency
              work-related ill health go undetected; if detected, they might not
              necessarily be due to exposures with one employer. For example, a
              worker might be exposed to asbestos while working for different
              employers over time, or might suffer from a long-latency disease
              that turns fatal many years after the worker has left the
              organization. For this reason, data on work-related ill health are
              to be complemented with information on work-related hazards. In
              some situations, an organization might not be able to collect or
              publicly disclose data on work-related ill health. The following
              are examples of these situations:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                National or regional regulations, contractual obligations,
                health insurance provisions, and other legal requirements
                related to the privacy of workers’ health-related information,
                might prevent organizations from collecting, maintaining, and
                publicly reporting these data.
              </li>

              <li className="text-[11px] text-[#727272]">
                The nature of information on workers’ exposure to psychosocial
                factors, largely based on self-disclosure and in many instances
                protected under healthcare privacy regulations, might limit
                organizations in disclosing this information.
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-4">
              In these situations, the organization is required to provide a
              reason for omission of these data as set out in GRI 101:
              Foundation. See clause 3.2 in GRI 101 for requirements on reasons
              for omission. Cases of ill health involving members of the public
              as a result of a work-related incident are not included in this
              disclosure, but the organization can report this information
              separately. An example of such an incident is when a chemical
              substance spill causes ill health among members of a nearby
              community.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 403-10-c
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure includes exposures to the 'International Agency
              for Research on Cancer (IARC) Group 1’ (carcinogenic to humans),
              ‘IARC Group 2A’ (probably carcinogenic to humans), and ‘IARC Group
              2B’ (possibly carcinogenic to humans) agents.
            </p>

            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 403-10-d
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Types of worker can be based on criteria such as employment type
              (full-time or part-time), employment contract (permanent or
              temporary), type or degree of control (e.g., control of work or
              workplace, sole or shared control), and location, among others.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 403-10-e
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              If the organization follows the ILO code of practice on Recording
              and notiflcation of occupational accidents and diseases, it can
              state this in response to Disclosure 403-10-e. If the organization
              does not follow the ILO code of practice, it can indicate which
              system of rules it applies in recording and reporting work-related
              ill health and its relationship to the ILO code of practice.
            </p>
            <p className="text-[11px] text-black mb-2">
              Guidance for clause 2.4.1
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              If the data on work-related ill health are driven primarily by
              certain types of ill health or disease (e.g., respiratory
              diseases, skin diseases) or incident (e.g., exposure to bacteria
              or viruses), the organization can provide a breakdown of this
              information.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12565&page=21",
  },
  {
    category: ["26"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 408: Child Labor 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 408-1 Operations and suppliers at significant risk for incidents
            of child labor
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 408-1
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              The process for identifying operations and suppliers, as specified
              in Disclosure 408-1, canreflect the reporting organization’s
              approach to risk assessment on this issue. It can also drawfrom
              recognized international data sources, such as the ILO Information
              and reports on theapplication of Conventions and Recommendations
              (see reference [1] in the Bibliography).When reporting the
              measures taken, the organization can refer to the ILO ‘Tripartite
              Declarationof Principles Concerning Multinational Enterprises and
              Social Policy’ and Organisation forEconomic Co-operation and
              Development (OECD) OECD Guidelines for MultinationalEnterprises
              for further guidance.In the context of the GRI Standards, a ‘young
              worker’ is defined as a person above theapplicable minimum working
              age and younger than 18 years of age. Note that Disclosure
              408-1does not require quantitative reporting on child labor or the
              number of young workers. Rather, itasks for reporting on the
              operations and suppliers considered to have significant risk
              forincidents of child labor or young workers exposed to hazardous
              work.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12622&page=7",
  },
  {
    category: ["27"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 409: Forced or Compulsory Labor 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 409-1: Operations and suppliers at significant risk for
            incidents of forced or compulsory labor
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 409-1
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              The process for identifying operations and suppliers, as specified
              in Disclosure 409-1, can reflect the reporting organization’s
              approach to risk assessment on this issue. It can also draw from
              recognized international data sources, such as the ILO Information
              and reports on the application of Conventions and Recommendations
              (see reference [1] in the Bibliography).When reporting the
              measures taken, the organization can refer to the ILO ‘Tripartite
              Declaration of Principles Concerning Multinational Enterprises and
              Social Policy’ and Organisation for Economic Co-operation and
              Development (OECD) OECD Guidelines for Multinational Enterprises
              for further guidance
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12633&page=7",
  },
  {
    category: ["28"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 405: Diversity and Equal Opportunity 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 405-1: Diversity of governance bodies and employees
          </p>
          <div className="overflow-y-auto custom-scrollbar">
            <div className=" text-neutral-500 text-[11px] font-normal font-['Manrope'] leading-[14px] mb-5">
              Examples of governance bodies that exist within an organization
              can be the board of directors, management committee, or a similar
              body for a non-corporate organization.
              <br />
              An organization can identify any other indicators of diversity
              used in its own monitoring and recording that are relevant for
              reporting.
            </div>
          </div>
          <div className="text-neutral-800 text-[13px] font-normal font-['Manrope'] leading-none mb-5">
            Background
          </div>
          <div className=" text-neutral-500 text-[11px] font-normal font-['Manrope'] leading-[14px] mb-5">
            This disclosure provides a quantitative measure of diversity within
            an organization and can be used in conjunction with sectoral or
            regional benchmarks. Comparisons between broad employee diversity
            and management team diversity offer information on equal
            opportunity. Information reported in this disclosure also helps in
            assessing which issues can be of particular relevance to certain
            segments of the governance bodies or employees.
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12565&page=21",
  },
  {
    category: ["29"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 414: Supplier Social Assessment 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 414-1: New suppliers that were screened using social criteria
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 414-1
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Social criteria can include the topics covered in other GRI Topic
              Standards(e.g., GRI 401:Employment 2016, GRI 403: Occupational
              Health and Safety 2018, GRI 408: Child Labor 2016,GRI 409: Forced
              or Compulsory Labor 2016)
            </p>
            <p className="text-[11px] text-black mb-2">Background</p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure informs stakeholders about the percentage of
              suppliers selected or contracted subject to due diligence
              processes for social impacts. An organization is expected to
              initiate due diligence as early as possible in the development of
              a new relationship with a supplier. Impacts may be prevented or
              mitigated at the stage of structuring contracts or other
              agreements, as well as via ongoing collaboration with suppliers.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12677&page=9",
  },
  {
    category: ["30"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 414: Supplier Social Assessment 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 414-2 Negative social impacts in the supply chain and actions
            taken
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 414-2
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Negative impacts include those that are either caused or
              contributed to by an organization, or that are directly linked to
              its activities, products, or services by its relationship with a
              supplier. Assessments for social impacts can include the topics in
              the 400 series (Social topics). Assessments can be made against
              agreed performance expectations that are set and communicated to
              the suppliers prior to the assessment. Assessments can be informed
              by audits, contractual reviews, two-way engagement, and complaint
              and grievance mechanisms. Improvements can include changing an
              organization’s procurement practices, the adjustment of
              performance expectations, capacity building, training, and changes
              to processes.
            </p>
            <p className="text-[11px] text-black mb-2">Background</p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure informs stakeholders about an organization’s
              awareness of significant actual and potential negative social
              impacts in the supply chain
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12677&page=9",
  },
  {
    category: ["32"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 416: Customer Health and Safety 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 416-1 Assessment of the health and safety impacts of product and
            service categories
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Compilation Requirements
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              2.1 When compiling the information specified in Disclosure 416-2,
              the reporting organization shall:2.1.1 exclude incidents of
              non-compliance in which the organization was determined not to be
              at fault;2.1.2 exclude incidents of non-compliance related to
              labeling. Incidents related to labeling are reported in Disclosure
              417-2 of GRI 417: Marketing and Labeling;2.1.3 if applicable,
              identify any incidents of non-compliance that relate to events in
              periods prior to the reporting period.
            </p>
            <p className="text-[11px] text-black mb-2">Guidance:-</p>
            <p className="text-[11px] text-[#727272] mb-4">
              The incidents of non-compliance that occur within the reporting
              period can relate to incidents formally resolved during the
              reporting period, whether they occurred in periods prior to the
              reporting period or not.
            </p>
            <p className="text-[11px] text-black mb-2">Background</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Protection of health and safety is a recognized goal of many
              national and international regulations. Customers expect products
              and services to perform their intended functions satisfactorily,
              and not pose a risk to health and safety. Customers have a right
              to non-hazardous products. Where their health and safety is
              affected, customers also have the right to seek redress. This
              disclosure addresses the life cycle of the product or service once
              it is available for use, and therefore subject to regulations and
              voluntary codes concerning the health and safety of products and
              services.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12699&page=8",
  },
  {
    category: ["33"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 417: Marketing and Labeling 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 417-1: Requirements for product and service information and
            labeling
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">Background:</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Customers and end users need accessible and adequate information
              about the positive and negative environmental and social impacts
              of products and services. This can include information on the safe
              use of a product or service, the disposal of the product, or the
              sourcing of its components. Access to this information helps
              customers to make informed purchasing choices.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12710&page=1",
  },
  {
    category: ["34"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 418: Customer Privacy 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 418-1: Substantiated complaints concerning breaches of customer
            privacy and losses of customer data
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Compilation Requirements
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              2.1 When compiling the information specified in Disclosure 418-1,
              the reporting organization shall indicate if a substantial number
              of these breaches relate to events in preceding years.
            </p>

            <p className="text-[11px] text-black mb-2">Background</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Protection of customer privacy is a generally recognized goal in
              national regulations and organizational policies. As set out in
              the Organisation for Economic Co-operation and Development (OECD)
              OECD Guidelines for Multinational Enterprises, organizations are
              expected to ‘respect consumer privacy and take reasonable measures
              to ensure the security of personal data that they collect, store,
              process or disseminate’. To protect customer privacy, an
              organization is expected to limit its collection of personal data,
              to collect data by lawful means, and to be transparent.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12721",
  },
  {
    category: ["35"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 406: Non-discrimination 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 406-1: Incidents of discrimination and corrective actions taken
          </p>
          <h6>Compilation Requirements:</h6>
          <div className="text-[#727272] text-[11px] font-normal font-['Manrope'] leading-[14px]">
            2.1When compiling the information specified in Disclosure 406-1, the
            reporting
            <br />
            organization shall include incidents of discrimination on grounds of
            race,
            <br />
            color, sex, religion, political opinion, national extraction, or
            social origin as
            <br />
            defined by the ILO, or other relevant forms of discrimination
            involving
            <br />
            internal and/or external stakeholders across operations in the
            reporting
            <br />
            period.
            <br />
            <br />
            In the context of this disclosure, an ‘incident’ refers to a legal
            action or complaint registered with the reporting organization or
            competent authorities through a formal process, or an instance of
            non-compliance identified by the organization through established
            procedures. Established procedures to identify instances of
            non-compliance can include management system audits, formal
            monitoring programs, or grievance mechanisms.
            <br />
            An incident is no longer subject to action if it is resolved, the
            case is completed, or no further action is required by the
            organization. For example, an incident for which no further action
            is required can include cases that were withdrawn or where the
            underlying circumstances that led to the incident no longer exist.
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12677&page=9",
  },
  {
    category: ["36"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 407: Freedom of Association and Collective Bargaining 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 407-1: Operations and suppliers in which the right to freedom of
            association and collective bargaining may be at risk
          </p>
          <h6>Compilation Requirements:</h6>
          <div className="text-[#727272] text-[11px] font-normal font-['Manrope'] leading-[14px]">
            The process for identifying operations and suppliers, as specified
            in Disclosure 407-1, can reflect the reporting organization’s
            approach to risk assessment on this issue. It can also draw from
            recognized international data sources, such as the various outcomes
            of the ILO Supervisory bodies and the recommendations of the ILO
            Committee of Freedom of Association (see reference [4] in the
            Bibliography). When reporting the measures taken, the organization
            can refer to the ILO ‘Tripartite Declaration of Principles
            Concerning Multinational Enterprises and Social Policy’ and
            Organization for Economic Co-operation and Development (OECD) OECD
            Guidelines for Multinational Enterprises for further guidance
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12677&page=9",
  },
  {
    category: ["37"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 413: Local Communities 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 413-1: Operations with local community engagement, impact
            assessments, and development programs
          </p>
          <h6>Guidance for Disclosure 413-1</h6>
          <div className="text-[#727272] text-[11px] font-normal font-['Manrope'] leading-[14px]">
            A key element in managing impacts on people in local communities is
            assessment and planning in order to understand the actual and
            potential impacts, and strong engagement with local communities to
            understand their expectations and needs. There are many elements
            that can be incorporated into local community engagement, impact
            assessments, and development programs. This disclosure seeks to
            identify which elements have been consistently applied,
            organization-wide. 
            <br />
            Where possible, organizations are expected to anticipate and avoid
            negative impacts on local communities. Where this is not possible,
            or where residual impacts remain, organizations are expected to
            manage those impacts appropriately, including grievances, and to
            compensate local communities for negative impacts. 
            <br /> <br />
            Establishing a timely and effective stakeholder identification and
            engagement process is important to help organizations understand the
            vulnerability of local communities and how these might be affected
            by the organization’s activities. A stakeholder engagement process
            both in early planning stages as well as during operations, can help
            establish lines of communication between an organization’s various
            departments (planning, finance, environment, production, etc.) and
            key stakeholder interest groups in the community. This enables an
            organization to consider the views of community stakeholders in its
            decisions, and to address its potential impacts on local communities
            in a timely manner. 
            <br /> <br />
            Organizations can utilize a number of useful tools to engage
            communities, including social and human rights impact assessments,
            which include a diverse set of approaches for proper identification
            of stakeholders and community characteristics. These can be based on
            issues such as ethnic background, indigenous descent, gender, age,
            migrant status, socioeconomic status, literacy levels, disabilities,
            income level, infrastructure availability or specific human health
            vulnerabilities which may exist within stakeholder communities. 
            <br /> <br />
            An organization is expected to consider the differentiated nature of
            local communities and to take specific action to identify and engage
            vulnerable groups. This might require adopting differentiated
            measures to allow the effective participation of vulnerable groups,
            such as making information available in alternate languages or
            format for those who are not literate or who do not have access to
            printed materials. Where necessary, organizations are expected to
            establish additional or separate processes so that negative impacts
            on vulnerable or disadvantaged groups are avoided, minimized,
            mitigated or compensated
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12677&page=9",
  },
  {
    category: ["38"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 404: Training and Education 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 404-1: Average hours of training per year per employee
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 404-1
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure provides insight into the scale of an
              organization’s investment in training, and the degree to which the
              investment is made across the entire employee base. In the context
              of this Standard, ‘training’ refers to:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                all types of vocational training and instruction
              </li>
              <li className="text-[11px] text-[#727272]">
                paid educational leave provided by an organization for its
                employees
              </li>
              <li className="text-[11px] text-[#727272]">
                training or education pursued externally and paid for in whole
                or in part by an organization
              </li>
              <li className="text-[11px] text-[#727272]">
                training on specific topics.
              </li>
            </ul>
            <p className="text-[11px] text-black mb-2">
              Training does not include on-site coaching by supervisors
            </p>

            <p className="text-[11px] text-black mb-2">
              To calculate the information in Disclosure 404-1, the reporting
              organization can use the following formulas:
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Average training hours per employee = Total number of training
              hours provided to employees / Total number of employees
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Average training hours per female = Total number of training hours
              provided to female employees / Total number of female employees
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Average training hours per male =Total number of training hours
              provided to male employees / Total number of male employees
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Average training hours peremployee category =Total number of
              training hours provided to each category of employees / Total
              number of employees in category
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12576&page=7",
  },
  {
    category: ["39"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 404: Training and Education 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 404-3: Percentage of employees receiving regular performance and
            career development reviews
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">Background</p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure measures the extent to which an organization
              regularly appraises employee performance. This aids the personal
              development of individual employees. It also contributes to skills
              management and to the development of human capital within the
              organization. This disclosure also demonstrates the extent to
              which this system is applied throughout the organization, and
              whether there is inequity of access to these opportunities.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Regular performance and career development reviews can also
              enhance employee satisfaction, which correlates with improved
              organizational performance. This disclosure helps demonstrate how
              an organization works to monitor and maintain the skill sets of
              its employees. When reported in conjunction with Disclosure 404-2,
              the disclosure also helps to illustrate how the organization
              approaches skills enhancement.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12576&page=7",
  },
  {
    category: ["40"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 2-21: Annual total compensation ratio
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Guidance to 2-21-a and 2-21-b
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure covers all employees as reported under Disclosure
              2-7 in this Standard. Annual total compensation includes salary,
              bonus, stock awards, option awards, non-equity incentive plan
              compensation, change in pension value, and nonqualified deferred
              compensation earnings provided over the course of a year. When
              calculating the ratio, the organization should, depending on the
              organization’s remuneration policies and availability of data,
              consider all of the following:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Base salary, which is the sum of guaranteed, short-term, and
                non-variable cash compensation.
              </li>

              <li className="text-[11px] text-[#727272]">
                Total cash compensation, which is the sum of the base salary and
                cash allowances, bonuses, commissions, cash profit-sharing, and
                other forms of variable cash payments.
              </li>
              <li className="text-[11px] text-[#727272]">
                Direct compensation, which is the sum of total cash compensation
                and total fair value of all annual long-term incentives (e.g.,
                stock option awards, restricted stock shares or units,
                performance stock shares or units, phantom stock shares, stock
                appreciation rights, and long-term cash awards).
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-4">
              The annual total compensation ratio can be calculated using the
              following formula: (Annual total compensation for the
              organization's highest paid-individual / Median annual total
              compensation for all of the organization's employees excluding the
              highest-paid individual)
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              The change in the annual total compensation ratio can be
              calculated using the following formula: (Percentage increase in
              annual total compensation for the organization's highest-paid
              individual / Median percentage increase in annual total
              compensation for all of the organization's employees excluding the
              highest-paid individual)
            </p>
            <p className="text-[11px] text-black mb-2">Guidance to 2-21-c</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Quantitative data, such as the annual total compensation ratio,
              may not be sufficient on its own to understand pay disparity and
              its drivers. For example, pay ratios can be influenced by the size
              of the organization (e.g., revenue, number of employees), its
              sector, its employment strategy (e.g., reliance on outsourced
              workers or part-time employees, a high degree of automation), or
              currency volatility.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              The difference in pay disparity reported over the years may be the
              result of a change in the organization’s compensation policy or
              the level of compensation for its highest-paid individual or
              employees, a change in calculation methodology (e.g., selection of
              the median annual total compensation, inclusions or exclusions) or
              an improvement in data collection processes. For this reason, the
              organization is required to report contextual information to help
              information users interpret the data and understand how it has
              been compiled.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              The organization should provide the following contextual
              information:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-[11px] text-[#727272]">
                Whether any employees reported under Disclosure 2-7 in this
                Standard have been excluded.
              </li>

              <li className="text-[11px] text-[#727272]">
                Whether full-time equivalent (FTE) pay rates are used for each
                part-time employee.
              </li>
              <li className="text-[11px] text-[#727272]">
                A list of the types of compensation included.
              </li>
              <li className="text-[11px] text-[#727272]">
                The title of the highest-paid individual.
              </li>
            </ul>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12576&page=7",
  },
  {
    category: ["41"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 2-7: Employees
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <div className="">
            <p className="text-[13px] text-black mb-2">Guidance to 2-7-a</p>
            <p className="text-[11px] text-[#727272] mb-2">
              An employee is an individual who is in an employment relationship
              with the organization according to national law or practice.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Providing a breakdown of employees by gender gives insight into
              gender representation across the organization. Providing a
              breakdown of employees by region gives insight into regional
              variations. A region can refer to a country or other geographic
              locations, such as a city or a world region.
            </p>

            <p className="text-[13px] text-black mb-2">Guidance to 2-7-b</p>
            <p className="text-[11px] text-[#727272] mb-2">
              The definitions of permanent, temporary, non-guaranteed hours,
              full-time, and part-time employees differ between countries. If
              the organization has employees in more than one country, it should
              use the definitions as per the national laws of the countries
              where the employees are based to calculate country-level data. The
              country-level data should then be added up to calculate total
              numbers, disregarding differences in national legal definitions.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Non-guaranteed hours employees are employed by the organization
              without a guarantee of a minimum or fixed number of working hours.
              The employee may need to make themselves available for work as
              required, but the organization is not contractually obligated to
              offer the employee a minimum or fixed number of working hours per
              day, week, or month. Casual employees, employees with zero-hour
              contracts, and on-call employees are examples that fall under this
              category. If the organization is unable to report exact figures,
              it can report estimates of the number of employees to the nearest
              ten or, where the number of employees is greater than 1,000, to
              the nearest 100, and explain this under 2-7-c.
            </p>

            <p className="text-[13px] text-black mb-2">Guidance to 2-7-c</p>
            <p className="text-[11px] text-[#727272] mb-4">
              The organization can report the total number of employees and the
              number of permanent, temporary, non-guaranteed hours, full-time,
              and part-time employees in head count or full-time equivalent
              (FTE). Reporting these numbers in head count gives insight into
              the number of individual employees, whether full-time or part-time
              employed. Reporting these numbers in FTE gives insight into the
              hours worked. The organization can use another methodology for
              reporting these numbers. Reporting the number of employees at the
              end of the reporting period provides information for that point in
              time, without capturing fluctuations during the reporting period.
              Reporting these numbers in averages across the reporting period
              takes into account fluctuations during the reporting period.
            </p>

            <p className="text-[13px] text-black mb-2">Guidance to 2-7-d</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Quantitative data, such as the number of temporary or part-time
              employees, is unlikely to be sufficient on its own. For example, a
              high proportion of temporary or part-time employees could indicate
              lack of employment security for employees, but it could equally
              signal workplace flexibility when offered as a voluntary choice.
              For this reason, the organization is required to report contextual
              information to help information users interpret the data. The
              organization can explain the reasons for temporary employment. An
              example of such a reason is the recruitment of employees to
              undertake work on a temporary or seasonal project or event.
              Another example is the standard practice to offer a temporary
              contract (e.g., six months) to new employees before an offer of
              permanent employment is made. The organization can also explain
              the reasons for non-guaranteed hours employment.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              The organization can explain how it defines full-time employment.
              If the organization has employees in more than one country, it can
              report the definitions of full-time employment it uses for the
              regions that cover these countries. The organization can also
              explain the reasons for part-time employment. Examples of such
              reasons are to accommodate employees’ requests to work reduced
              hours, or because the organization is unable to provide full-time
              employment to all employees. If there are differences in
              permanent, temporary, non-guaranteed hours, full-time, and
              part-time employment between genders or between regions, the
              organization can explain the reasons for these differences.
            </p>

            <p className="text-[13px] text-black mb-2">Guidance to 2-7-e</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Requirement 2-7-e enables the organization to explain how the
              numbers of employees vary during the reporting period compared to
              the previous reporting periods (i.e., whether the numbers have
              increased or decreased). It can also include the reasons for the
              fluctuations. For example, an increase in the number of employees
              during the reporting period could be due to a seasonal event.
              Conversely, a decrease in the number of employees compared to the
              previous reporting period could be due to the completion of a
              temporary project.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              It is up to the organization to determine which fluctuations in
              the number of employees it considers significant to report under
              2-7-e. The organization should report its threshold for
              determining significant fluctuations. If there are no significant
              fluctuations in the number of employees during the reporting
              period or between reporting periods, a brief statement of this
              fact is sufficient to comply with the requirement.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12358",
  },
  {
    category: ["42"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 2-30: Collective bargaining agreements
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <div className="">
            <p className="text-[13px] text-black mb-2">Guidance</p>
            <p className="text-[11px] text-[#727272] mb-2">
              This disclosure provides insights into how the organization
              engages in collective bargaining with its employees. Collective
              bargaining is a fundamental right at work covered in the
              International Labour Organization (ILO) Right to Organise and
              Collective Bargaining Convention [8].
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Collective bargaining refers to negotiations that take place
              between one or more employers or employers' organizations and one
              or more workers' organizations (e.g., trade unions). The objective
              of these negotiations is to reach a collective agreement on
              working conditions and terms of employment (e.g., wages, working
              time) and to regulate relations between employers and workers. [3]
              These negotiations are an important means through which employers’
              organizations and workers’ organizations can improve working
              conditions and labor relations.
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              Collective agreements can be made at the level of the
              organization, at the level of a particular site, at the industry
              level, and at the national level in countries where this is the
              practice. Collective agreements can cover specific groups of
              workers, for example, those performing a specific activity or
              working at a specific location.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              If the organization has a statement or policy commitment on
              freedom of association and collective bargaining, this is reported
              under 2-23-b-i in this Standard or 3-3-c in GRI 3: Material Topics
              2021.
            </p>

            <p className="text-[13px] text-black mb-2">Guidance to 2-30-a</p>
            <p className="text-[11px] text-[#727272] mb-2">
              The organization is required to report the percentage of its
              employees whose working conditions and terms of employment are
              regulated by one or more collective bargaining agreements.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              The percentage of employees covered by collective bargaining
              agreements is calculated using the following formula: (Number of
              employees covered by collective bargaining agreements / Total
              number of employees reported under 2-7-a) * 100 The employees
              covered by collective bargaining agreements are those employees to
              whom the organization is obligated to apply the agreement. This
              means that if none of the employees are covered by a collective
              bargaining agreement, the percentage reported is zero. An employee
              covered by more than one collective bargaining agreement only
              needs to be counted once. This requirement does not ask for the
              percentage of employees represented by a works council or
              belonging to trade unions, which can be different. The percentage
              of employees covered by collective bargaining agreements can be
              higher than the percentage of unionized employees when the
              collective bargaining agreements apply to both union and non-union
              members. Alternatively, the percentage of employees covered by
              collective bargaining agreements can be lower than the percentage
              of unionized employees. This may be the case when there are no
              collective bargaining agreements available or when the collective
              bargaining agreements do not cover all unionized employees.
            </p>

            <p className="text-[11px] text-[#727272] mb-4">
              The organization can also provide a breakdown of the percentage of
              employees covered by collective bargaining agreements by region,
              or provide comparisons with industry benchmarks.
            </p>

            <p className="text-[13px] text-black mb-2">Guidance to 2-30-b</p>
            <p className="text-[11px] text-[#727272] mb-4">
              There may be instances where collective bargaining agreements
              cover some or none of the organization’s employees. However, the
              working conditions and terms of employment of these employees may
              be influenced or determined by the organization based on other
              collective bargaining agreements, such as agreements that cover
              other employees or agreements from other organizations. If this is
              the case, the organization is required to report it under 2-30-b.
              If this is not the case, and the working conditions and terms of
              employment of these employees are not influenced or determined
              based on other collective bargaining agreements, a brief statement
              of this fact is sufficient to comply with this requirement.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12358",
  },
  {
    category: ["43"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 305: Emissions 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <div className="">
            <p className="text-[#0056a4] text-[15px] mb-2">
              Disclosure 305-1 Direct (Scope 1) GHG emissions
            </p>
            <div className="text-[#222222] text-[13px] font-normal font-['Manrope'] leading-none my-4">
              Compilation requirements:
            </div>
            <div>
              <p className="text-[#222222] text-[13px] font-normal font-['Manrope'] leading-none my-4">
                2.1 When compiling the information specified in Disclosure
                305-1, the reporting organization shall:
              </p>
              <p className=" text-[#727272] text-[11px] font-normal font-['Manrope'] leading-[14px]">
                2.1.1 exclude any GHG trades from the calculation of gross
                direct (Scope 1) GHG emissions; <br />
                2.1.2 report biogenic emissions of CO2 from the combustion or
                biodegradation of biomass separately from the gross direct
                (Scope 1) GHG emissions. Exclude biogenic emissions of other
                types of GHG (such as CH and N O), and biogenic emissions of CO
                that occur in the life cycle of biomass other than from
                combustion or biodegradation (such as GHG emissions from
                processing or transporting biomass).
              </p>
            </div>

            <div className="text-[#0056a4] text-[15px] font-normal font-['Manrope'] leading-none my-4">
              Guidance for Disclosure 305-1:
            </div>
            <div className=" text-[#727272] text-[11px] font-normal font-['Manrope'] leading-[14px]">
              Direct (Scope 1) GHG emissions include, but are not limited to,
              the CO emissions from the fuel consumption as reported in
              Disclosure 302-1 of GRI 302: Energy 2016.Direct (Scope 1) GHG
              emissions can come from the following sources owned or controlled
              by an organization:
              <br />
              •Generation of electricity, heating, cooling and steam: these
              emissions result from
              <br />
              combustion of fuels in stationary sources, such as boilers,
              furnaces, and turbines – and from other combustion processes such
              as flaring;
              <br />• Physical or chemical processing: most of these emissions
              result from the manufacturing or processing of chemicals and
              materials, such as cement, steel, aluminum, ammonia, and waste
              processing;
              <br />• Transportation of materials, products, waste, workers, and
              passengers: these emissions result from the combustion of fuels in
              mobile combustion sources owned or controlled by the organization,
              such as trucks, trains, ships, airplanes, buses, and cars;
              <br />• Fugitive emissions: these are emissions that are not
              physically controlled but result from intentional or unintentional
              releases of GHGs. These can include equipment leaks from joints,
              seals, packing, and gaskets; methane emissions (e.g., from coal
              mines) and venting; HFC emissions from refrigeration and air
              conditioning equipment; and methane leakages (e.g., from gas
              transport).
              <br />
              If estimations are used due to a lack of default figures, the
              reporting organization can indicate the basis and assumptions on
              which figures were estimated.
              <br />
              For recalculations of prior year emissions, the organization can
              follow the approach in the ‘GHG Protocol Corporate Standard’. The
              chosen emission factors can originate from mandatory reporting
              requirements, voluntary reporting frameworks, or industry groups.
              Estimates of GWP rates change over time as scientific research
              develops.
              <br />
              <br />
              GWP rates from the Second Assessment Report of the
              Intergovernmental Panel on Climate Change (IPCC) are used as the
              basis for international negotiations under the ‘Kyoto Protocol’.
              Thus, such rates can be used for disclosing GHG emissions where it
              does not conflict with national or regional reporting
              requirements. The organization can also use the latest GWP rates
              from the most recent IPCC assessment report.
              <br />
              The organization can combine Disclosure 305-1 with Disclosures
              305-2 (energy indirect/Scope 2 GHG emissions) and 305-3 (other
              indirect/Scope 3 GHG emissions) to disclose total GHG emissions.
            </div>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12358",
  },
  {
    category: ["44"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 305: Emissions 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <div className="">
            <p className="text-[#0056a4] text-[15px] mb-2">
              Disclosure 305-2 Indirect (Scope 2) GHG emissions
            </p>
            <div className="text-[#222222] text-[13px] font-normal font-['Manrope'] leading-none my-4">
              Compilation requirements:
            </div>
            <div>
              <p className="text-[#222222] text-[13px] font-normal font-['Manrope'] leading-none my-4">
                2.3 When compiling the information specified in Disclosure
                305-2, the reporting organization shall:
              </p>
              <p className=" text-[#727272] text-[11px] font-normal font-['Manrope'] leading-[14px]">
                2.3.1 exclude any GHG trades from the calculation of gross
                energy indirect (Scope 2) GHG emissions; 2.3.2 exclude other
                indirect (Scope 3) GHG emissions that are disclosed as specified
                in Disclosure 305-3; 2.3.3 account and report energy indirect
                (Scope 2) GHG emissions based on the location- based method, if
                it has operations in markets without product or
                supplier-specific data; 2.3.4 account and report energy indirect
                (Scope 2) GHG emissions based on both the location-based and
                market-based methods, if it has any operations in markets
                providing product or supplier-specific data in the form of
                contractual instruments.
              </p>
            </div>

            <div className="text-[#727272] text-[13px] font-normal font-['Manrope'] leading-none my-4">
              Guidance for Disclosure 305-2:
            </div>
            <div className=" text-[#727272] text-[11px] font-normal font-['Manrope'] leading-[14px]">
              Energy indirect (Scope 2) GHG emissions include, but are not
              limited to, the CO2
              <br /> emissions from the generation of purchased or acquired
              electricity, heating, cooling, and steam consumed by an
              organization – disclosed as specified in Disclosure 302-1 of GRI
              302: Energy 2016. For many organizations, the energy indirect
              (Scope 2) GHG emissions that result from the generation of
              purchased electricity can be much greater than their direct (Scope
              1) GHG emissions.
              <br />
              <br />
              The market-based method calculation also includes the use of a
              residual mix, if the organization does not have specified
              emissions-intensity from its contractual instruments. This helps
              prevent double counting between consumers’ market-based method
              figures. If a residual mix is unavailable, the organization can
              disclose this and use grid-average emission factors as a<br />
              proxy (which can mean that the location-based and market- based
              are the same number until information on the residual mix is
              available).
              <br />
              <br />
              The reporting organization can apply the Quality Criteria in the
              ‘GHG Protocol Scope 2 Guidance’ so that contractual instruments
              convey GHG emission rate claims and to prevent double counting.
              See reference [18] in the Bibliography.
              <br />
              For recalculations of prior year emissions, the organization can
              follow the approach in the ‘GHG Protocol Corporate Standard’. The
              chosen emission factors can originate from mandatory reporting
              requirements, voluntary reporting frameworks, or industry groups.
              <br />
              <br />
              Estimates of GWP rates change over time as scientific research
              develops. GWP rates from the Second Assessment Report of the IPCC
              are used as the basis for international negotiations under the
              ‘Kyoto Protocol’. Thus, such rates can be used for disclosing GHG
              emissions where it does not conflict with national or regional
              reporting requirements. The organization can also use
              <br />
              the latest GWP rates from the most recent IPCC assessment report.
              <br />
              <br />
              The organization can combine Disclosure 305-2 with Disclosures
              305-1 (direct/Scope 1 GHG emissions) and 305-3 (other
              indirect/Scope 3 GHG emissions) to disclose total GHG emissions
              <br />
            </div>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12358",
  },
  {
    category: ["45"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 305: Emissions 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <div className="">
            <p className=" mb-2 text-[#0056a4] text-[15px]">
              Disclosure 305-3 Other indirect (Scope 3) GHG emissions
            </p>
            <div className="text-[#222222] text-[13px] font-normal font-['Manrope'] leading-none my-4">
              Compilation requirements:
            </div>
            <div>
              <p className="text-[#222222] text-[13px] font-normal font-['Manrope'] leading-none my-4">
                2.5 When compiling the information specified in Disclosure
                305-3, the reporting organization shall:
              </p>
              <p className=" text-[#727272] text-[11px] font-normal font-['Manrope'] leading-[14px]">
                2.5.1 exclude any GHG trades from the calculation of gross other
                indirect (Scope 3) GHG emissions; 2.5.2 exclude energy indirect
                (Scope 2) GHG emissions from this disclosure. Energy indirect
                (Scope 2) GHG emissions are disclosed as specified in Disclosure
                305-2; 2.5.3 report biogenic emissions of CO from the combustion
                or biodegradation of biomass that occur in its value chain
                separately from the gross other indirect (Scope 3) GHG
                emissions. Exclude biogenic emissions of other types of GHG
                (such as CH and N O), and biogenic emissions of CO that occur in
                the life cycle of biomass other than from combustion or
                biodegradation (such as GHG emissions from processing or
                transporting biomass).
              </p>
            </div>

            <div className="text-[#222222] text-[13px] font-normal font-['Manrope'] leading-none my-4">
              Guidance for Disclosure 305-2:
            </div>
            <div className=" text-[#727272] text-[11px] font-normal font-['Manrope'] leading-[14px]">
              Other indirect (Scope 3) GHG emissions are a consequence of an
              organization’s activities, but occur from sources not owned or
              controlled by the organization. Other indirect (Scope 3) GHG
              emissions include both upstream and downstream emissions. Some
              examples of Scope 3 activities include extracting and producing
              purchased materials; transporting purchased fuels in vehicles not
              owned or controlled by the organization; and the end use of
              products and services.
              <br />
              <br />
              Other indirect emissions can also come from the decomposing of the
              organization’s waste. Process-related emissions during the
              manufacture of purchased goods and fugitive emissions in
              facilities not owned by the organization can also produce indirect
              emissions.
              <br />
              <br />
              For some organizations, GHG emissions that result from energy
              consumption outside of theorganization can be much greater than
              their direct (Scope 1) or energy indirect (Scope 2) GHG emissions.
              <br />
              <br />
              The reporting organization can identify other indirect (Scope 3)
              GHG emissions by assessing which of its activities’ emissions:
              <br />
              •contribute significantly to the organization’s total anticipated
              other indirect (Scope 3) GHG emissions;
              <br />• offer potential for reductions the organization can
              undertake or influence;
              <br />
              •contribute to climate change-related risks, such as financial,
              regulatory, supply chain, product and customer, litigation, and
              reputational risks;
              <br />
              •are deemed material by stakeholders, such as customers,
              suppliers, investors, or civil society;
              <br />• result from outsourced activities previously performed
              in-house, or that are typically performed in-house by other
              organizations in the same sector;
              <br />• have been identified as significant for the organization’s
              sector;
              <br />
              meet any additional criteria for determining relevance, developed
              by the organization or by organizations in its sector.
            </div>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12358",
  },
  {
    category: ["46"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 205: Anti-corruption 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 205-2 Communication and training about anti-corruption
            policies and procedures
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-4">Guidance :</p>
            <p className="text-[11px] text-[#727272] mb-4">
              In the context of this GRI Standard, the term ‘business partners’
              includes, among others, suppliers, agents, lobbyists and other
              intermediaries, joint venture and consortia partners, governments,
              customers, and clients.
            </p>
            <p className="text-[13px] text-[#222222] mb-4">Background:</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Communication and training build the internal and external
              awareness and the necessary capacity to combat corruption.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12412",
  },
  {
    category: ["47"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 205: Anti-corruption 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 205-1 Operations assessed for risks related to corruption
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-4">Guidance :</p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure can include a risk assessment focused on
              corruption or the inclusion of corruption as a risk factor in
              overall risk assessments. The term ‘operation’ refers to a single
              location used by the organization for the production, storage
              and/or distribution of its goods and services, or for
              administrative purposes. Within a single operation, there can be
              multiple production lines, warehouses, or other activities. For
              example, a single factory can be used for multiple products or a
              single retail outlet can contain several different retail
              operations that are owned or managed by the organization.
            </p>
            <p className="text-[13px] text-[#222222] mb-4">Background:</p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure measures the extent of the risk assessment’s
              implementation across an organization. Risk assessments can help
              to assess the potential for incidents of corruption within and
              related to the organization, and help the organization to design
              policies and procedures to combat corruption.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12412",
  },
  {
    category: ["48"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 202: Market Presence 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 202-1 Ratios of standard entry level wage by gender
            compared to local minimum wage
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Background:</p>
            <p className="text-[11px] text-[#727272] mb-2">
              This disclosure applies to those organizations in which a
              substantial portion of their employees, and workers (excluding
              employees) performing the organization’s activities, are
              compensated in a manner or scale that is closely linked to laws or
              regulations on minimum wage. Providing wages above the minimum
              wage can help contribute to the economic well-being of workers
              performing the organization’s activities. The impacts of wage
              levels are immediate, and they directly affect individuals,
              organizations, countries and economies. The distribution of wages
              is crucial for eliminating inequalities, such as wage gap
              differences between women and men, or nationals and migrants.
              Also, entry level wages paid compared to local minimum wages show
              the competitiveness of an organization’s wages and provide
              information relevant for assessing the effect of wages on the
              local labor market. Comparing this information by gender can also
              be a measure of an organization’s approach to equal opportunity in
              the workplace.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12379",
  },
  {
    category: ["49"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 308: Supplier Environmental Assessment 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 308-1 New suppliers that were screened using
            environmental criteria
          </p>
          <div className="">
            {/* <p className="text-[11px] text-black mb-2">
              Compilation Requirements
            </p> */}
            <p className="text-[11px] text-[#727272] mb-2">
              Environmental criteria can include the topics covered in other GRI
              Topic Standards (e.g., GRI
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              302: Energy 2016, GRI 303: Water and Effluents 2018, GRI 305:
              Emissions 2016)
            </p>
            <p className="text-[11px] text-black mb-2">Background</p>
            <p className="text-[11px] text-[#727272] mb-2">
              This disclosure informs stakeholders about the percentage of
              suppliers selected or contracted subject to due diligence
              processes for environmental impacts.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              An organization is expected to initiate due diligence as early as
              possible in the development of a new relationship with a supplier.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Impacts may be prevented or mitigated at the stage of structuring
              contracts or other agreements, as well as via ongoing
              collaboration with suppliers.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12532",
  },
  {
    category: ["50"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 308: Supplier Environmental Assessment 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 308-2 Negative environmental impacts in the supply chain
            and actions taken
          </p>
          <div className="">
            <p className="text-[11px] text-black mb-2">Guidance :</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Negative impacts include those that are either caused or
              contributed to by an organization, or that are directly linked to
              its operations, products, or services by its relationship with a
              supplier. Assessments for environmental impacts can include the
              topics covered in other GRI Topic Standards (e.g., GRI 302: Energy
              2016, GRI 303: Water and Effluents 2018, GRI 305: Emissions 2016).
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Assessments can be made against agreed performance expectations
              that are set and communicated to the suppliers prior to the
              assessment. Assessments can be informed by audits, contractual
              reviews, two-way engagement, and complaint and grievance
              mechanisms.
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              Improvements can include changing an organization’s procurement
              practices, the adjustment of performance expectations, capacity
              building, training, and changes to processes
            </p>
            <p className="text-[11px] text-black mb-2">Background</p>
            <p className="text-[11px] text-[#727272] mb-4">
              This disclosure informs stakeholders about an organization’s
              awareness of significant actual and potential negative
              environmental impacts in the supply chain.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12532",
  },
  {
    category: ["51"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        Disclosure 3-3 Management of material topics
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <div className="">
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 3-3-c
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              Requirement 3-3-c entails describing the policies or commitments
              the organization has developed specifically for the topic, in
              addition to the policy commitments reported under Disclosure 2-23
              in GRI 2: General Disclosures 2021. If the organization has
              described its policies for a material topic under Disclosure 2-23,
              it can provide a reference to this information under 3-3-c and
              does not need to repeat the information. See Disclosure 2-23 in
              GRI 2 for guidance on how to report information about policies.
              When reporting its commitments regarding the material topic, the
              organization should provide a statement of intent to manage the
              topic or explain:
            </p>
            <ul className="list-disc ml-4  text-[11px] text-[#727272] mb-2">
              <li className="mb-2">the organization’s stance on the topic</li>
              <li className="mb-2">
                whether the commitment to manage the topic is based on
                regulatory compliance or extends beyond it
              </li>
              <li className="mb-2">
                compliance with authoritative intergovernmental instruments
                related to the topic.
              </li>
            </ul>
            <p className="text-[11px] text-black mb-2">Guidance to 3-3-d</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Requirement 3-3-d enables the organization to explain how it
              responds to its impacts. It does not require a detailed
              description of actions taken in relation to each impact. Instead,
              the organization can provide a high-level overview of how it
              manages its impacts.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              The organization should report how it integrates the findings from
              its identification and assessment of impacts across relevant
              internal functions and processes, including:
            </p>
            <ul className="list-disc ml-4  text-[11px] text-[#727272] mb-2">
              <li className="mb-2">
                the level and function within the organization that has been
                assigned responsibility for managing the impacts;
              </li>
              <li className="mb-2">
                the internal decision-making, budget allocation, and oversight
                processes (e.g., internal audit) to enable effective actions to
                manage the impacts.
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              Disclosure 2-12 and Disclosure 2-13 in GRI 2 require information
              on the role of the highest governance body in overseeing the
              management of the organization’s impacts and on how it delegates
              responsibility for this. The organization should also report how
              it manages actual impacts identified in previous reporting periods
              and which it continues to manage during the current reporting
              period.
            </p>
            <p className="text-[11px] text-black mb-2">Guidance to 3-3-d-i</p>
            <p className="text-[11px] text-[#727272] mb-2">
              The organization should report:
            </p>

            <ul className="list-disc ml-4  text-[11px] text-[#727272] mb-2">
              <li className="mb-2">
                examples of actions taken to prevent or mitigate potential
                negative impacts (e.g., adaptation/modification measures,
                facility upgrading, training, red-flag systems);
              </li>
              <li className="mb-2">
                approaches taken to prevent or mitigate systemic negative
                impacts; how the organization applies the precautionary
                principle, including:
              </li>
              <li className="mb-2">
                -how the organization proactively informs the public about
                potential negative impacts of its activities, products, and
                services, and how it deals with related questions and
                complaints;
              </li>
              <li className="mb-2">
                -the organization’s support or contribution to scientific
                research related to evaluating potential negative impacts of its
                activities, products, and services;
              </li>
              <li className="mb-2">
                the organization’s participation in collaborative efforts to
                share knowledge and to prevent negative impacts of its
                activities, products, and services;
              </li>
              <li className="mb-2">
                how the organization uses or increases its leverage to motivate
                its business relationships to prevent or mitigate potential
                negative impacts. For example, whether the organization usesor
                increases its leverage by enforcing contractual requirements,
                implements incentives such as future orders, provides training
                and support, or actively collaborates with other actors to
                motivate its business relationships to prevent or mitigate
                potential negative impacts; •whether the organization has
                terminated a business relationship because it lacks the leverage
                to prevent or mitigate potential negative impacts and, if so,
                whether it has assessed if terminating the relationship could
                itself result in negative impacts.
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              See Guidance to 2-23-a-iii in GRI 2 for more information on
              ‘precautionary principle’.
            </p>
            <p className="text-[11px] text-black mb-2">Guidance to 3-3-d-ii</p>
            <p className="text-[11px] text-[#727272] mb-2">
              The organization should report:
            </p>

            <ul className="list-disc ml-4  text-[11px] text-[#727272] mb-2">
              <li className="mb-2">
                examples of actions taken to remediate actual negative impacts,
                including examples of specific remedies or types of remedy
                provided;
              </li>
              <li className="mb-2">
                how grievance mechanisms or other remediation processes
                (reported under Disclosure 2- 25 in GRI 2) have made it possible
                for actual negative impacts to be remediated.
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              See Disclosure 2-25 in GRI 2 for more information on processes to
              remediate negative impacts.
            </p>
            <p className="text-[11px] text-black mb-2">Guidance to 3-3-e</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Requirement 3-3-e enables the organization to report information
              about the effectiveness of its actions to manage its impacts.
              Tracking the effectiveness of its actions is necessary for an
              organization to learn if its policies and processes are being
              implemented optimally. It is also necessary for knowing if it has
              responded effectively to its impacts and to drive continuous
              improvement.
            </p>

            <p className="text-[11px] text-[#727272] mb-2">
              The organization should also report information about the
              effectiveness of its actions to manage actual impacts from
              previous reporting periods. This applies in cases where the
              organization has assessed the effectiveness of these actions or
              derived lessons during the current reporting period
            </p>
            <p className="text-[11px] text-black mb-2">Guidance to 3-3-e-i</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Processes used to track the effectiveness of actions can include
              internal or external auditing or verification, impact assessments,
              measurement systems, stakeholder feedback, grievance mechanisms,
              external performance ratings, and benchmarking.
            </p>

            <p className="text-[11px] text-black mb-2">Guidance to 3-3-e-ii</p>
            <p className="text-[11px] text-[#727272] mb-2">
              When reporting on goals and targets, the organization should
              report:
            </p>
            <ul className="list-disc ml-4  text-[11px] text-[#727272] mb-2">
              <li className="mb-2">how the goals and targets are set;</li>
              <li className="mb-2">
                whether and how the goals and targets take into account the
                sustainability context in which the impacts take place (e.g.,
                sustainable development goals and conditions, the limits and
                demands placed on environmental resources). See the
                Sustainability context principle in GRI 1 for more information;
              </li>
              <li className="mb-2">
                whether the goals and targets are informed by expectations in
                authoritative intergovernmental instruments and, where relevant,
                by scientific consensus;
              </li>
              <li className="mb-2">
                whether goals and targets are mandatory (based on legislation)
                or voluntary. If they are mandatory, the organization can list
                the relevant legislation;
              </li>
              <li className="mb-2">
                the organization’s activities or business relationships to which
                the goals and targets apply;
              </li>
              <li className="mb-2">the baseline for the goals and targets;</li>
              <li className="mb-2">
                the timeline for achieving the goals and targets
              </li>
            </ul>
            <p className="text-[11px] text-[#727272] mb-2">
              Targets can be qualitative (e.g., implementing a management system
              by a certain date) or quantitative (e.g., reducing greenhouse gas
              [GHG] emissions by a certain percentage by a certain date).
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              The indicators used to evaluate progress can also be qualitative
              or quantitative. Quantitative indicators can bring precision and
              enable comparisons. Qualitative information is often needed to put
              quantitative information into context, enable its interpretation,
              and determine which comparisons and conclusions are likely to be
              most valid. The Topic Standards and Sector Standards include
              qualitative and quantitative indicators.
            </p>
            <p className="text-[11px] text-black mb-2">Guidance to 3-3-e-iii</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Requirement 3-3-e-iii enables the organization to show the extent
              to which the actions taken have been effective. Information on the
              effectiveness of the actions can be obtained, for example,from the
              outcomes of internal or external auditing or verification, data
              collected through measurement systems, and stakeholder feedback.
              The organization should show that there is a credible link between
              the specific action taken by the organization and the effective
              management of impacts. For example, to show the effectiveness of
              its actions to support its suppliers with improving their working
              conditions, the organization can report survey feedback from the
              suppliers’ workers showing that working conditions have improved.
              Additional information the organization can provide includes data
              showing a decrease in the number of incidents identified through
              independent audits. Similarly, to demonstrate the effectiveness of
              its actions to improve the quality of its water discharge, the
              organization can report data showing a decrease in the
              concentration of total dissolved solids (mg/L) in the water
              discharge. When reporting progress toward its goals and targets,
              the organization should report whether progress is satisfactory or
              not. If a goal or target has not been achieved, the organization
              should explain why.
            </p>
            <p className="text-[11px] text-black mb-2">Guidance to 3-3-e-iv</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Managing impacts is typically an ongoing process requiring
              continuous improvement based on learning from practice. The
              organization is not required to provide a detailed description of
              lessons learned in relation to each material topic. Instead, the
              organization can provide examples to show how it incorporates
              lessons learned to manage impacts more successfully in the future.
              For example, the organization can briefly describe lessons learned
              that have led to changes in its policies or practices (e.g.,
              training for workers, giving additional attention to the
              performance of suppliers), or that have led to plans for changes
              that will manage impacts more successfully in the future. Lessons
              learned may be derived from the organization’s own processes
              (e.g., root cause analysis), from its business relationships, or
              from stakeholder or expert feedback.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/publications/documents/english/gri-3-material-topics-2021/",
  },
  {
    category: ["52"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 410: Security Practices 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 410-1: Security personnel trained in human rights policies or
            procedures
          </p>
          <div>
            <p className="text-[11px] text-black mb-2">
              Guidance for Disclosure 410-1
            </p>
            <p className="text-[11px] text-[#727272] mb-4">
              The training can refer either to training dedicated to the subject
              of human rights or to a humanrights module within a general
              training program. Training can cover issues such as the use
              offorce, inhuman or degrading treatment or discrimination, or
              identification and registering.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12644&page=1",
  },
  {
    category: ["53"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 405: Diversity and Equal Opportunity 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            GRI 405-2: Diversity and Equal Opportunity 2016
          </p>
          <div>
            <p className="text-[11px] text-[#727272] mb-4">
              The reporting organization can draw from the information used for
              Disclosure 405-1 to identify the total number of employees in each
              employee category bygender.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12565&page=21",
  },
  {
    category: ["54"],
    header: [
      <h5 className="text-sky-600 text-[17px] font-bold">
        GRI 306: Effluents and Waste 2016
      </h5>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Disclosure 306-3 Significant Spills
          </p>
          <div>
            <p className="text-[11px] text-black mb-2">Requirements</p>
            <p className="text-[11px] text-[#727272] mb-4">
              The reporting organization shall report the following information:
            </p>
            <p className="text-[11px] text-[#727272] mb-42">
              a. Total number and total volume of recorded significant spills.
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              b. The following additional information for each spill that was
              reported in the organization’s financial statements:
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              i. Location of spill;
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              ii. Volume of spill;
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              iii. Material of spill, categorized by: oil spills (soil or water
              surfaces), fuel spills
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              (soil or water surfaces), spills of wastes (soil or water
              surfaces), spills of chemicals (mostly soil or water surfaces),
              and other (to be specified by the organization). c. Impacts of
              significant spills.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://www.globalreporting.org/pdf.ashx?id=12521",
  },
  //  sdg contet start//
  {
    category: ["sd1"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-07.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-amber-400 text-[17px] font-bold ml-2">SDG 7</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 7: Ensure access to affordable,
            reliable, sustainable and modern energy for all
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 7.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, increase substantially the share of renewable energy in
              the global energy mix
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">7.2.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Renewable energy share in the total final energy consumption
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 7.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, double the global rate of improvement in energy
              efficiency
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">7.3.1</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Energy intensity measured in terms of primary energy and GDP
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal7",
  },
  {
    category: ["sd2"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-08.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-red-900 text-[17px] font-bold ml-2">SDG 8</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 8: Promote sustained, inclusive and
            sustainable economic growth, full and productive employment and
            decent work for all
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 8.4</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Improve progressively, through 2030, global resource efficiency in
              consumption and production and endeavour to decouple economic
              growth from environmental degradation, in accordance with the
              10-Year Framework of Programmes on Sustainable Consumption and
              Production, with developed countries taking the lead Improve
              progressively, through 2030, global resource efficiency in
              consumption and production and endeavour to decouple economic
              growth from environmental degradation, in accordance with the
              10-Year Framework of Programmes on Sustainable Consumption and
              Production, with developed countries taking the lead
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.4.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Material footprint, material footprint per capita, and material
              footprint per GDP
            </p>

            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.4.2</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Domestic material consumption, domestic material consumption per
              capita, and domestic material consumption per GDP
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal8",
  },
  {
    category: ["sd3"],
    header: [
      <>
        <div className="flex w-[100px]">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-12.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-yellow-600 text-[17px] font-bold ml-2">SDG 12</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 12: Ensure sustainable consumption and
            production patterns
          </p>
          <div className="h-[617px] overflow-y-auto custom-scrollbar">
            <p className="text-[13px] text-[#222222] mb-2">Target 12.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, achieve the sustainable management and efficient use of
              natural resources
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">12.2.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Material footprint, material footprint per capita, and material
              footprint per GDP
            </p>
            <p className="text-[11px] text-[#222222] mb-2">12.2.2</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Domestic material consumption, domestic material consumption per
              capita, and domestic material consumption per GDP
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal12",
  },
  {
    category: ["sd4"],
    header: [
      <>
        <div className="flex w-[100px]">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-13.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-lime-900  text-[17px] font-bold ml-2">SDG 13</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 13: Take urgent action to combat
            climate change and its impacts
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 13.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Strengthen resilience and adaptive capacity to climate-related
              hazards and natural disasters in all countries
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">13.1.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Number of deaths, missing persons and directly affected persons
              attributed to disasters per 100,000 population
            </p>
            <p className="text-[11px] text-[#222222] mb-2">13.1.2</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Number of countries that adopt and implement national disaster
              risk reduction strategies in line with the Sendai Framework for
              Disaster Risk Reduction 2015–2030
            </p>
            <p className="text-[11px] text-[#222222] mb-2">13.1.3</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Proportion of local governments that adopt and implement local
              disaster risk reduction strategies in line with national disaster
              risk reduction strategies
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal13",
  },
  {
    category: ["sd5"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-03.png"
            className="w-[32px] h-[32px]"
          />{" "}
          <h5 className="text-[#2D9A47] text-[17px] font-bold ml-2">SDG 3</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 3: Ensure healthy lives and promote
            well-being for all at all ages
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 3.9</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, reduce the global maternal mortality ratio to less than
              70 per 100,000 live births
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">3.9</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, substantially reduce the number of deaths and illnesses
              from hazardous chemicals and air, water and soil pollution and
              contamination
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 3.a</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Strengthen the implementation of the World Health Organization
              Framework Convention on Tobacco Control in all countries, as
              appropriate
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">3.a.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Age-standardized prevalence of current tobacco use among persons
              aged 15 years and older
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 3.b</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Support the research and development of vaccines and medicines for
              the communicable and non-communicable diseases that primarily
              affect developing countries, provide access to affordable
              essential medicines and vaccines, in accordance with the Doha
              Declaration on the TRIPS Agreement and Public Health, which
              affirms the right of developing countries to use to the full the
              provisions in the Agreement on Trade-Related Aspects of
              Intellectual Property Rights regarding flexibilities to protect
              public health, and, in particular, provide access to medicines for
              all
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">3.b.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of the target population covered by all vaccines
              included in their national programme
            </p>

            <p className="text-[11px] text-[#222222] mb-2">3.b.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Total net official development assistance to medical research and
              basic health sectors
            </p>
            <p className="text-[11px] text-[#222222] mb-2">3.b.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of health facilities that have a core set of relevant
              essential medicines available and affordable on a sustainable
              basis
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 3.c</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Substantially increase health financing and the recruitment,
              development, training and retention of the health workforce in
              developing countries, especially in least developed countries and
              small island developing States
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">3.c.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Health worker density and distribution
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 3.d</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Strengthen the capacity of all countries, in particular developing
              countries, for early warning, risk reduction and management of
              national and global health risks
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal3",
  },
  {
    category: ["sd6"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-06.png"
            className="w-[32px] h-[32px]"
          />{" "}
          <h5 className="text-cyan-500 text-[17px] font-bold ml-2">SDG 6</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 6: Ensure availability and sustainable
            management of water and sanitation for all
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 6.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, improve water quality by reducing pollution, eliminating
              dumping and minimizing release of hazardous chemicals and
              materials, halving the proportion of untreated wastewater and
              substantially increasing recycling and safe reuse globally
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">6.3.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of domestic and industrial wastewater flows safely
              treated
            </p>
            <p className="text-[11px] text-[#222222] mb-2">6.3.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of bodies of water with good ambient water quality
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 6.6</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2020, protect and restore water-related ecosystems, including
              mountains, forests, wetlands, rivers, aquifers and lakes
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">6.6.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Change in the extent of water-related ecosystems over time
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 6.a</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, expand international cooperation and capacity-building
              support to developing countries in water- and sanitation-related
              activities and programmes, including water harvesting,
              desalination, water efficiency, wastewater treatment, recycling
              and reuse technologies
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">6.a.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Amount of water- and sanitation-related official development
              assistance that is part of a government-coordinated spending plan
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 6.b</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Support and strengthen the participation of local communities in
              improving water and sanitation management
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">6.b.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of local administrative units with established and
              operational policies and procedures for participation of local
              communities in water and sanitation management
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal6",
  },
  {
    category: ["sd7"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-11.png"
            className="w-[32px] h-[32px]"
          />{" "}
          <h5 className="text-[#FD9D24] text-[17px] font-bold ml-2">SDG 11</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 11: Make cities and human settlements
            inclusive, safe, resilient and sustainable
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 11.6</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, reduce the adverse per capita environmental impact of
              cities, including by paying special attention to air quality and
              municipal and other waste management
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">11.6.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of municipal solid waste collected and managed in
              controlled facilities out of total municipal waste generated, by
              cities
            </p>
            <p className="text-[11px] text-[#222222] mb-2">11.6.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Annual mean levels of fine particulate matter (e.g. PM2.5 and
              PM10) in cities (population weighted)
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal11",
  },
  {
    category: ["sd8"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-15.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-green-600 text-[17px] font-bold ml-2">SDG 15</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 15: Protect, restore and promote
            sustainable use of terrestrial ecosystems, sustainably manage
            forests, combat desertification, and halt and reverse land
            degradation and halt biodiversity loss
          </p>
          <div className="h-[544px]">
            <p className="text-[13px] text-[#222222] mb-2">Target 15</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2020, ensure the conservation, restoration and sustainable use
              of terrestrial and inland freshwater ecosystems and their
              services, in particular forests, wetlands, mountains and drylands,
              in line with obligations under international agreements
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">15.1.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Forest area as a proportion of total land area
            </p>
            <p className="text-[11px] text-[#222222] mb-2">15.1.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of important sites for terrestrial and freshwater
              biodiversity that are covered by protected areas, by ecosystem
              type
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal15",
  },
  {
    category: ["sd9"],
    header: [
      <>
        <div className="flex w-[100px]">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-12.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-yellow-600 text-[17px] font-bold ml-2">SDG 12</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 12: Ensure sustainable consumption and
            production pattern
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 12.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, achieve the sustainable management and efficient use of
              natural resources
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">12.2.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Material footprint, material footprint per capita, and material
              footprint per GDP
            </p>
            <p className="text-[11px] text-[#222222] mb-2">12.2.2</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Domestic material consumption, domestic material consumption per
              capita, and domestic material consumption per GDP
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 12.4</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2020, achieve the environmentally sound management of chemicals
              and all wastes throughout their life cycle, in accordance with
              agreed international frameworks, and significantly reduce their
              release to air, water and soil in order to minimize their adverse
              impacts on human health and the environment
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">12.4.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Number of parties to international multilateral environmental
              agreements on hazardous waste, and other chemicals that meet their
              commitments and obligations in transmitting information as
              required by each relevant agreement
            </p>
            <p className="text-[11px] text-[#222222] mb-2">12.4.2</p>
            <p className="text-[11px] text-[#727272] mb-2">
              (a) Hazardous waste generated per capita; and
            </p>
            <p className="text-[11px] text-[#727272] mb-2">
              (b) proportion of hazardous waste treated, by type of treatment
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal12",
  },
  {
    category: ["sd10"],
    header: [
      <>
        <div className="flex w-[100px]">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-03.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-green-500 text-[17px] font-bold ml-2">SDG 3</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 3: Ensure healthy lives and promote
            well-being for all at all ages
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 3.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, end preventable deaths of newborns and children under 5
              years of age, with all countries aiming to reduce neonatal
              mortality to at least as low as 12 per 1,000 live births and
              under-5 mortality to at least as low as 25 per 1,000 live births.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">3.2.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Under-five mortality rate.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">3.2.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Neonatal mortality rate.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal3",
  },
  {
    category: ["sd11"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-05.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-orange-600 text-[17px] font-bold ml-2">SDG 5</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 5: Achieve gender equality and empower
            all women and girls
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 5.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Eliminate all forms of violence against all women and girls in the
              public and private spheres, including trafficking and sexual and
              other types of exploitation.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">5.2.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of ever-partnered women and girls aged 15 years and
              older subjected to physical, sexual or psychological violence by a
              current or former intimate partner in the previous 12 months, by
              form of violence and by age.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">5.2.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of women and girls aged 15 years and older subjected to
              sexual violence by persons other than an intimate partner in the
              previous 12 months, by age and place of occurrence.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal5",
  },
  {
    category: ["sd12"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-08.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-red-900 text-[17px] font-bold ml-2">SDG 8</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 8: Promote sustained, inclusive and
            sustainable economic growth, full and productive employment and
            decent work for all
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 8.5</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, achieve full and productive employment and decent work
              for all women and men, including for young people and persons with
              disabilities, and equal pay for work of equal value.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Average hourly earnings of female and male employees, by
              occupation, age and persons with disabilities.
            </p>

            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.5.2</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Unemployment rate, by sex, age and persons with disabilities.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 8.6</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2020, substantially reduce the proportion of youth not in
              employment, education or training.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.6.1</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Proportion of youth (aged 15-24 years) not in education,
              employment or training.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal8",
  },
  {
    category: ["sd13"],
    header: [
      <>
        <div className="flex w-[100px]">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-10.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-pink-500 text-[17px] font-bold ml-2">SDG 10</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 10: Reduce inequality within and among
            countries
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 10.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Ensure equal opportunity and reduce inequalities of outcome,
              including by eliminating discriminatory laws, policies and
              practices and promoting appropriate legislation, policies and
              action in this regard.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">10.3.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of population reporting having personally felt
              discriminated against or harassed within the previous 12 months on
              the basis of a ground of discrimination prohibited under
              international human rights law.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal10",
  },
  {
    category: ["sd14"],
    header: [
      <>
        <div className="flex w-[100px]">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-03.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-green-500 text-[17px] font-bold ml-2">SDG 3</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 3: Ensure healthy lives and promote
            well-being for all at all ages
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 3.6</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2020, halve the number of global deaths and injuries from road
              traffic accidents
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">3.6.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Death rate due to road traffic injuries
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 3.9</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, substantially reduce the number of deaths and illnesses
              from hazardous chemicals and air, water and soil pollution and
              contamination.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">3.9.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Mortality rate attributed to household and ambient air pollution.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">3.9.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Mortality rate attributed to unsafe water, unsafe sanitation and
              lack of hygiene (exposure to unsafe Water, Sanitation and Hygiene
              for All (WASH) services).
            </p>
            <p className="text-[11px] text-[#222222] mb-2">3.9.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Mortality rate attributed to unintentional poisoning.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal3",
  },
  {
    category: ["sd15"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-08.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-red-900 text-[17px] font-bold ml-2">SDG 8</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 8: Decent work and economic growth
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 8.8</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Protect labour rights and promote safe and secure working
              environments for all workers, including migrant workers, in
              particular women migrants, and those in precarious employment.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.8.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Fatal and non-fatal occupational injuries per 100,000 workers, by
              sex and migrant status.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.8.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Level of national compliance with labour rights (freedom of
              association and collective bargaining) based on International
              Labour Organization (ILO) textual sources and national
              legislation, by sex and migrant status.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal8",
  },
  {
    category: ["sd16"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-16.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-blue-900 text-[17px] font-bold ml-2">SDG 16</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Promote peaceful and inclusive societies for sustainable
            development, provide access to justice for all and build effective,
            accountable and inclusive institutions at all levels
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 16.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Significantly reduce all forms of violence and related death rates
              everywhere.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Number of victims of intentional homicide per 100,000 population,
              by sex and age.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Conflict-related deaths per 100,000 population, by sex, age and
              cause.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of population subjected to (a) physical violence, (b)
              psychological violence and (c) sexual violence in the previous 12
              months.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.4</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of population that feel safe walking alone around the
              area they live after dark.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 16.7</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Ensure responsive, inclusive, participatory and representative
              decision-making at all levels.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.7.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportions of positions in national and local institutions,
              including (a) the legislatures; (b) the public service; and (c)
              the judiciary, compared to national distributions, by sex, age,
              persons with disabilities and population groups.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.7.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of population who believe decision-making is inclusive
              and responsive, by sex, age, disability and population group.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal16",
  },
  {
    category: ["sd17"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-16.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-blue-900 text-[17px] font-bold ml-2">SDG 16</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Promote peaceful and inclusive societies for sustainable
            development, provide access to justice for all and build effective,
            accountable and inclusive institutions at all levels
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 16.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Significantly reduce all forms of violence and related death rates
              everywhere.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Number of victims of intentional homicide per 100,000 population,
              by sex and age.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Conflict-related deaths per 100,000 population, by sex, age and
              cause.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of population subjected to (a) physical violence, (b)
              psychological violence and (c) sexual violence in the previous 12
              months.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.4</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of population that feel safe walking alone around the
              area they live after dark.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal16",
  },
  {
    category: ["sd18"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-08.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-red-900 text-[17px] font-bold ml-2">SDG 8</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 8: Decent work and economic growth
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 8.7</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Take immediate and effective measures to eradicate forced labour,
              end modern slavery and human trafficking and secure the
              prohibition and elimination of the worst forms of child labour,
              including recruitment and use of child soldiers, and by 2025 end
              child labour in all its forms.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.7.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion and number of children aged 5‑17 years engaged in child
              labour, by sex and age.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal8",
  },
  {
    category: ["sd19"],
    header: [
      <>
        <div className="flex w-[100px]">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-12.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-[#CD8B2A] text-[17px] font-bold ml-2">SDG 12</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Ensure sustainable consumption and production patterns
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 12.8</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, ensure that people everywhere have the relevant
              information and awareness for sustainable development and
              lifestyles in harmony with nature.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">12.8.1</p>
            <p className="text-[11px] text-[#727272] mb-1">Extent to which</p>
            <p className="text-[11px] text-[#727272] mb-1">
              (i) global citizenship education and
            </p>
            <p className="text-[11px] text-[#727272] mb-1">
              (ii) education for sustainable development are mainstreamed in
            </p>
            <p className="text-[11px] text-[#727272] mb-1">
              (a) national education policies; (b) curricula; (c) teacher
              education; and (d) student assessment.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal12",
  },
  {
    category: ["sd20"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-16.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-blue-900 text-[17px] font-bold ml-2">SDG 16</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Promote peaceful and inclusive societies for sustainable
            development, provide access to justice for all and build effective,
            accountable and inclusive institutions at all levels
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 16.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Promote the rule of law at the national and international levels
              and ensure equal access to justice for all.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.3.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of victims of violence in the previous 12 months who
              reported their victimization to competent authorities or other
              officially recognized conflict resolution mechanisms.
            </p>

            <p className="text-[11px] text-[#222222] mb-2">16.3.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Unsentenced detainees as a proportion of overall prison
              population.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">16.3.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of the population who have experienced a dispute in the
              past two years and who accessed a formal or informal dispute
              resolution mechanism, by type of mechanism.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal16",
  },
  {
    category: ["sd21"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-04.png"
            className="w-[32px] h-[32px]"
          />{" "}
          <h5 className="text-[#C22033] text-[17px] font-bold ml-2">SDG 4</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Ensure inclusive and equitable quality education and promote
            lifelong learning opportunities for all
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 4.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, ensure equal access for all women and men to affordable
              and quality technical, vocational and tertiary education,
              including university.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">4.3.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Participation rate of youth and adults in formal and non-formal
              education and training in the previous 12 months, by sex.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 4.4</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, substantially increase the number of youth and adults who
              have relevant skills, including technical and vocational skills,
              for employment, decent jobs and entrepreneurship.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">4.4.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of youth and adults with information and communications
              technology (ICT) skills, by type of skill.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 4.5</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, eliminate gender disparities in education and ensure
              equal access to all levels of education and vocational training
              for the vulnerable, including persons with disabilities,
              indigenous peoples and children in vulnerable situations.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">4.5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Parity indices (female/male, rural/urban, bottom/top wealth
              quintile and others such as disability status, indigenous peoples
              and conflict-affected, as data become available) for all education
              indicators on this list that can be disaggregated.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal4",
  },
  {
    category: ["sd22"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-05.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-orange-600 text-[17px] font-bold ml-2">SDG 5</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 5: Achieve gender equality and empower
            all women and girls
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              End all forms of discrimination against all women and girls
              everywhere
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">5.1.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Whether or not legal frameworks are in place to promote, enforce
              and monitor equality and non‑discrimination on the basis of sex
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal5",
  },
  {
    category: ["sd23"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-08.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-red-900 text-[17px] font-bold ml-2">SDG 8</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 8: Decent work and economic growth
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 8.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Achieve higher levels of economic productivity through
              diversification, technological upgrading and innovation, including
              through a focus on high-value added and labour-intensive sectors
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.2.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Annual growth rate of real GDP per employed person
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 8.5</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, achieve full and productive employment and decent work
              for all women and men, including for young people and persons with
              disabilities, and equal pay for work of equal value
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Average hourly earnings of female and male employees, by
              occupation, age and persons with disabilities
            </p>
            <p className="text-[11px] text-[#222222] mb-2">8.5.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Unemployment rate, by sex, age and persons with disabilities
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal8",
  },
  {
    category: ["sd24"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-14.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-[#007dbc] text-[17px] font-bold ml-2">SDG 14</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Conserve and sustainably use the oceans, seas and marine resources
            for sustainable development
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 14.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Minimize and address the impacts of ocean acidification, including
              through enhanced scientific cooperation at all levels
            </p>

            <div class="">
              <span class="text-[#727272] text-[10px] font-bold leading-[13px]">
                Indicators
                <br />
              </span>
              <span class="text-[#222222] text-[11px] font-normal leading-[14px]">
                14.3.1
                <br />
              </span>
              <span class="text-[#727272] text-[11px] font-normal leading-[14px]">
                Average marine acidity (pH) measured at agreed suite of
                representative sampling stations
                <br />
              </span>
            </div>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal14",
  },
  {
    category: ["sd25"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-16.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-blue-900 text-[17px] font-bold ml-2">SDG 16</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Promote peaceful and inclusive societies for sustainable
            development, provide access to justice for all and build effective,
            accountable and inclusive institutions at all levels
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 16.5</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Substantially reduce corruption and bribery in all their forms
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of persons who had at least one contact with a public
              official and who paid a bribe to a public official, or were asked
              for a bribe by those public officials, during the previous 12
              months
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.5.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of businesses that had at least one contact with a
              public official and that paid a bribe to a public official, or
              were asked for a bribe by those public officials during the
              previous 12 months
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal16",
  },
  {
    category: ["sd26"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-01.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-[#EA1D2D] text-[17px] font-bold ml-2">SDG 1</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 1: End poverty in all its forms
            everywhere
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 1.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, eradicate extreme poverty for all people everywhere,
              currently measured as people living on less than $1.25 a day
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">1.2.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of population living below the national poverty line,
              by sex and age
            </p>
            <p className="text-[11px] text-[#222222] mb-2">1.2.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of men, women and children of all ages living in
              poverty in all its dimensions according to national definitions
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal1",
  },
  {
    category: ["sd27"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-05.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-orange-600 text-[17px] font-bold ml-2">SDG 5</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 5: Gender equality
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 5.4</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Recognize and value unpaid care and domestic work through the
              provision of public services, infrastructure and social protection
              policies and the promotion of shared responsibility within the
              household and the family as nationally appropriate.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">5.4.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of time spent on unpaid domestic and care work, by sex,
              age and location.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal5",
  },
  {
    category: ["sd28"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-08.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-red-900 text-[17px] font-bold ml-2">SDG 8</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 8: Promote sustained, inclusive and
            sustainable economic growth, full and productive employment and
            decent work for all
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 8.5</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, achieve full and productive employment and decent work
              for all women and men, including for young people and persons with
              disabilities, and equal pay for work of equal value.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Average hourly earnings of female and male employees, by
              occupation, age and persons with disabilities.
            </p>

            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.5.2</p>
            <p className="text-[11px] text-[#727272] mb-2">
              Unemployment rate, by sex, age and persons with disabilities.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal8",
  },
  {
    category: ["sd29"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-16.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-blue-900 text-[17px] font-bold ml-2">SDG 16</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Promote peaceful and inclusive societies for sustainable
            development, provide access to justice for all and build effective,
            accountable and inclusive institutions at all levels
          </p>
          <div>
            <p className="text-[13px] text-[#222222] mb-2">Target 16.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Significantly reduce all forms of violence and related death rates
              everywhere.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Number of victims of intentional homicide per 100,000 population,
              by sex and age.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Conflict-related deaths per 100,000 population, by sex, age and
              cause.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of population subjected to (a) physical violence, (b)
              psychological violence and (c) sexual violence in the previous 12
              months.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.1.4</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of population that feel safe walking alone around the
              area they live after dark.
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal16",
  },
  {
    category: ["sd30"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-16.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-blue-900 text-[17px] font-bold ml-2">SDG 16</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Promote peaceful and inclusive societies for sustainable
            development, provide access to justice for all and build effective,
            accountable and inclusive institutions at all levels
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 16.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              End abuse, exploitation, trafficking and all forms of violence
              against and torture of children
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.2.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of children aged 1–17 years who experienced any
              physical punishment and/or psychological aggression by caregivers
              in the past month
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.2.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Number of victims of human trafficking per 100,000 population, by
              sex, age and form of exploitation
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">16.2.3</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of young women and men aged 18–29 years who experienced
              sexual violence by age 18
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal16",
  },
  {
    category: ["sd31"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-05.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-orange-600 text-[17px] font-bold ml-2">SDG 5</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 5: Achieve gender equality and empower
            all women and girls
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              End all forms of discrimination against all women and girls
              everywhere
            </p>

            <p className="text-[13px] text-[#222222] mb-2">Target 5.4</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Recognize and value unpaid care and domestic work through the
              provision of public services, infrastructure and social protection
              policies and the promotion of shared responsibility within the
              household and the family as nationally appropriate
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">5.4.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of time spent on unpaid domestic and care work, by sex,
              age and location
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 5.5</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Ensure women’s full and effective participation and equal
              opportunities for leadership at all levels of decision-making in
              political, economic and public life
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">5.5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of seats held by women in (a) national parliaments and
              (b) local governments
            </p>
            <p className="text-[11px] text-[#727272] mb-2">5.5.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of women in managerial positions
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal5",
  },
  {
    category: ["sd32"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-05.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-orange-600 text-[17px] font-bold ml-2">SDG 5</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 5: Achieve gender equality and empower
            all women and girls
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              End all forms of discrimination against all women and girls
              everywhere
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">5.1.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Whether or not legal frameworks are in place to promote, enforce
              and monitor equality and non‑discrimination on the basis of sex
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 5.4</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Achieve gender equality and empower all women and girls
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">5.4.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of time spent on unpaid domestic and care work, by sex,
              age and location
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 5.5</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Ensure women’s full and effective participation and equal
              opportunities for leadership at all levels of decision-making in
              political, economic and public lifeEnsure women’s full and
              effective participation and equal opportunities for leadership at
              all levels of decision-making in political, economic and public
              life
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#727272] mb-2">5.5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of seats held by women in (a) national parliaments and
              (b) local governments
            </p>
            <p className="text-[11px] text-[#727272] mb-2">5.5.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Proportion of seats held by women in (a) national parliaments and
              (b) local governments
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal5",
  },
  {
    category: ["sd33"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-08.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-red-900 text-[17px] font-bold ml-2">SDG 8</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
            Sustainable Development Goal 8: Decent work and economic growth
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 8.5</p>
            <p className="text-[11px] text-[#727272] mb-4">
              By 2030, achieve full and productive employment and decent work
              for all women and men, including for young people and persons with
              disabilities, and equal pay for work of equal value
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">8.5.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Average hourly earnings of female and male employees, by
              occupation, age and persons with disabilities
            </p>

            <p className="text-[11px] text-[#222222] mb-2">8.5.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Unemployment rate, by sex, age and persons with disabilities
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal8",
  },
  {
    category: ["sd34"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-06.png"
            className="w-[32px] h-[32px]"
          />{" "}
          <h5 className="text-cyan-500 text-[17px] font-bold ml-2">SDG 6</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
          Sustainable Development Goal 6: Ensure availability and sustainable management of water and sanitation for all
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 6.6</p>
            <p className="text-[11px] text-[#727272] mb-4">
            By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers and lakes.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">6.6.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
            Change in the extent of water-related ecosystems over time.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Target 6.a</p>
            <p className="text-[11px] text-[#727272] mb-4">
            By 2030, expand international cooperation and capacity-building support to developing countries in water- and sanitation-related activities and programmes, including water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">6.a.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
            Amount of water- and sanitation-related official development assistance that is part of a government-coordinated spending plan.
            </p>
            <p className="text-[13px] text-[#222222] mb-2">Target 6.b</p>
            <p className="text-[11px] text-[#727272] mb-4">
            Support and strengthen the participation of local communities in improving water and sanitation management.
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">6.b.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
            Proportion of local administrative units with established and operational policies and procedures for participation of local communities in water and sanitation management.
            </p>
           
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal6",
  },
  {
    category: ["sd35"],
    header: [
      <>
        <div className="flex w-[100px]">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-12.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-yellow-600 text-[17px] font-bold ml-2">SDG 12</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5">
          <p className="text-[15px] text-[#0057A5] mb-4">
          Sustainable Development Goal 12: Ensure sustainable consumption and production pattern
          </p>
          <div className="">
            <p className="text-[13px] text-[#222222] mb-2">Target 12.4</p>
            <p className="text-[11px] text-[#727272] mb-4">
            By 2020, achieve the environmentally sound management of chemicals and all wastes throughout their life cycle, in accordance with agreed international frameworks, and significantly reduce their release to air, water and soil in order to minimize their adverse impacts on human health and the environment
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">12.4.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
            Number of parties to international multilateral environmental agreements on hazardous waste, and other chemicals that meet their commitments and obligations in transmitting information as required by each relevant agreement
            </p>
          
            <p className="text-[11px] text-[#222222] mb-2">12.4.2</p>
            <p className="text-[11px] text-[#727272] mb-2">
            (a) Hazardous waste generated per capita; and (b) proportion of hazardous waste treated, by type of treatment
            </p>
          
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal12",
  },
  {
    category: ["sd36"],
    header: [
      <>
        <div className="flex">
          <img
            src="https://sustainextstorage1.blob.core.windows.net/media/images/sdg/E-WEB-Goal-15.png"
            className="w-[32px] h-[32px]"
          />
          <h5 className="text-green-600 text-[17px] font-bold ml-2">SDG 15</h5>
        </div>
      </>,
    ],
    data: [
      <>
        <div className="p-2 pt-5 pb-4 ">
          <p className="text-[15px] text-[#0057A5] mb-4">
          Sustainable Development Goal 15: Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss
          </p>
          <div className="h-[544px]">
            <p className="text-[13px] text-[#222222] mb-2">Target 15.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
            By 2020, ensure the conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems and their services, in particular forests, wetlands, mountains and drylands, in line with obligations under international agreements
            </p>
            <p className="text-[11px] text-[#222222] mb-2">Indicators</p>
            <p className="text-[11px] text-[#222222] mb-2">15.1.1</p>
            <p className="text-[11px] text-[#727272] mb-4">
              Forest area as a proportion of total land area
            </p>
            <p className="text-[11px] text-[#222222] mb-2">15.1.2</p>
            <p className="text-[11px] text-[#727272] mb-4">
            Proportion of important sites for terrestrial and freshwater biodiversity that are covered by protected areas, by ecosystem type
            </p>
          </div>
        </div>
      </>,
    ],
    link: "https://sdgs.un.org/goals/goal15",
  },
];
