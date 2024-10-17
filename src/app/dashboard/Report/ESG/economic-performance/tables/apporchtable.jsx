"use client";
import { useState, useRef, useEffect } from "react";

const currencySymbols = {
    USD: "$",    // US Dollar
    CAD: "$",    // Canadian Dollar
    EUR: "€",    // Euro
    AED: "د.إ",  // UAE Dirham
    AFN: "؋",    // Afghan Afghani
    ALL: "L",    // Albanian Lek
    AMD: "֏",    // Armenian Dram
    ARS: "$",    // Argentine Peso
    AUD: "$",    // Australian Dollar
    AZN: "₼",    // Azerbaijani Manat
    BAM: "KM",   // Bosnia-Herzegovina Convertible Mark
    BDT: "৳",    // Bangladeshi Taka
    BGN: "лв",   // Bulgarian Lev
    BHD: ".د.ب", // Bahraini Dinar
    BIF: "FBu",  // Burundian Franc
    BND: "$",    // Brunei Dollar
    BOB: "Bs.",  // Bolivian Boliviano
    BRL: "R$",   // Brazilian Real
    BWP: "P",    // Botswanan Pula
    BYN: "Br",   // Belarusian Ruble
    BZD: "BZ$",  // Belize Dollar
    CDF: "FC",   // Congolese Franc
    CHF: "CHF",  // Swiss Franc
    CLP: "$",    // Chilean Peso
    CNY: "¥",    // Chinese Yuan
    COP: "$",    // Colombian Peso
    CRC: "₡",    // Costa Rican Colón
    CVE: "$",    // Cape Verdean Escudo
    CZK: "Kč",   // Czech Koruna
    DJF: "Fdj",  // Djiboutian Franc
    DKK: "kr",   // Danish Krone
    DOP: "RD$",  // Dominican Peso
    DZD: "دج",   // Algerian Dinar
    EEK: "kr",   // Estonian Kroon (no longer in use, replaced by Euro)
    EGP: "£",    // Egyptian Pound
    ERN: "Nfk",  // Eritrean Nakfa
    ETB: "Br",   // Ethiopian Birr
    GBP: "£",    // British Pound
    GEL: "₾",    // Georgian Lari
    GHS: "₵",    // Ghanaian Cedi
    GNF: "FG",   // Guinean Franc
    GTQ: "Q",    // Guatemalan Quetzal
    HKD: "$",    // Hong Kong Dollar
    HNL: "L",    // Honduran Lempira
    HRK: "kn",   // Croatian Kuna (replaced by Euro in 2023)
    HUF: "Ft",   // Hungarian Forint
    IDR: "Rp",   // Indonesian Rupiah
    ILS: "₪",    // Israeli New Shekel
    INR: "₹",    // Indian Rupee
    IQD: "ع.د",  // Iraqi Dinar
    IRR: "﷼",    // Iranian Rial
    ISK: "kr",   // Icelandic Króna
    JMD: "J$",   // Jamaican Dollar
    JOD: "د.ا",  // Jordanian Dinar
    JPY: "¥",    // Japanese Yen
    KES: "KSh",  // Kenyan Shilling
    KHR: "៛",    // Cambodian Riel
    KMF: "CF",   // Comorian Franc
    KRW: "₩",    // South Korean Won
    KWD: "د.ك",  // Kuwaiti Dinar
    KZT: "₸",    // Kazakhstani Tenge
    LBP: "ل.ل",  // Lebanese Pound
    LKR: "Rs",   // Sri Lankan Rupee
    LTL: "Lt",   // Lithuanian Litas (replaced by Euro in 2015)
    LVL: "Ls",   // Latvian Lats (replaced by Euro in 2014)
};


const Apporchtable = ({ col, values, currency,headerKeyMap  }) => {
  // Fallback to currency code if symbol is not found
  const currencySymbol = currencySymbols[currency] || currency;

  return (
    <div    style={{
      display: "block",
      overflowX: "auto",
      maxWidth: "100%",
      minWidth: "100%",
      width: "40vw",
    }}
    className="mb-2 table-scrollbar">
    <table className="w-full border border-gray-200 rounded-md overflow-hidden">
      <thead className="gradient-background">
        <tr className="text-[12px] font-semibold">
          {col.map((header, index) => (
            <th key={index} className="border-t border-r border-gray-200 p-4 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map((row, rowIndex) => (
          <tr key={rowIndex} className="text-[12px]">
            {col.map((header, headerIndex) => {
              const key = headerKeyMap[header]; // Match the header with object keys
              return (
                <td
                  key={headerIndex}
                  className="border-t border-r border-gray-200 p-4 text-center"
                >
                  {row[key]}{" "}
                  {(header === "Revenues from third party sales" || header === "Corporate income tax paid on a cash basis") 
                    ? currencySymbol 
                    : ""}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Apporchtable;
