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
          <div className="h-[350px] overflow-y-auto custom-scrollbar">
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
          <div>
            <a
              className="text-[14px] text-[#2196F3] pt-1 flex"
              href="https://www.globalreporting.org/pdf.ashx?id=12467&page=1"
              target="_blank"
            >
              Learn more <MdChevronRight className="text-lg pt-1" />
            </a>
          </div>
        </div>
      </>,
    ],
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
          <div className="h-[350px] overflow-y-auto custom-scrollbar">
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
          <div>
            <a
              className="text-[14px] text-[#2196F3] pt-5 inline-flex"
              href="https://www.globalreporting.org/pdf.ashx?id=12467&page=1"
              target="_blank"
            >
              Learn more <MdChevronRight />
            </a>
          </div>
        </div>
      </>,
    ],
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
          <div className="h-[350px] overflow-y-auto custom-scrollbar">
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
          <div>
            <a
              className="text-[14px] text-[#2196F3] pt-5 inline-flex"
              href="https://www.globalreporting.org/pdf.ashx?id=12467&page=1"
              target="_blank"
            >
              Learn more <MdChevronRight />
            </a>
          </div>
        </div>
      </>,
    ],
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
          <div className="h-[350px] overflow-y-auto custom-scrollbar">
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
          <div>
            <a
              className="text-[14px] text-[#2196F3] pt-5 inline-flex"
              href="https://www.globalreporting.org/pdf.ashx?id=12467&page=1"
              target="_blank"
            >
              Learn more <MdChevronRight />
            </a>
          </div>
        </div>
      </>,
    ],
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
          <div className="h-[350px] overflow-y-auto custom-scrollbar">
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
          <div>
            <a
              className="text-[14px] text-[#2196F3] pt-5 inline-flex"
              href="https://www.globalreporting.org/pdf.ashx?id=12467&page=1"
              target="_blank"
            >
              Learn more <MdChevronRight />
            </a>
          </div>
        </div>
      </>,
    ],
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

          <div className="h-[350px] overflow-y-auto custom-scrollbar">
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
          <div>
            <a
              className="text-[14px] text-[#2196F3] pt-5 inline-flex"
              href="https://www.globalreporting.org/pdf.ashx?id=12521"
              target="_blank"
            >
              Learn more <MdChevronRight />
            </a>
          </div>
        </div>
      </>,
    ],
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

          <div className="h-[350px] overflow-y-auto custom-scrollbar">
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
          <div>
            <a
              className="text-[14px] text-[#2196F3] pt-5 inline-flex"
              href="https://www.globalreporting.org/pdf.ashx?id=12521"
              target="_blank"
            >
              Learn more <MdChevronRight />
            </a>
          </div>
        </div>
      </>,
    ],
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

          <div className="h-[350px] overflow-y-auto custom-scrollbar">
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
          <div>
            <a
              className="text-[14px] text-[#2196F3] pt-5 inline-flex"
              href="https://www.globalreporting.org/pdf.ashx?id=12521"
              target="_blank"
            >
              Learn more <MdChevronRight />
            </a>
          </div>
        </div>
      </>,
    ],
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

          <div className="h-[350px] overflow-y-auto custom-scrollbar">
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
          <div>
            <a
              className="text-[14px] text-[#2196F3] pt-5 inline-flex"
              href="https://www.globalreporting.org/pdf.ashx?id=12521"
              target="_blank"
            >
              Learn more <MdChevronRight />
            </a>
          </div>
        </div>
      </>,
    ],
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

          <div className="h-[350px] overflow-y-auto custom-scrollbar">
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
          <div>
            <a
              className="text-[14px] text-[#2196F3] pt-5 inline-flex"
              href="https://www.globalreporting.org/pdf.ashx?id=12521"
              target="_blank"
            >
              Learn more <MdChevronRight />
            </a>
          </div>
        </div>
      </>,
    ],
  },
];