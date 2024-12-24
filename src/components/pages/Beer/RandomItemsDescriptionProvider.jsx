import React, { createContext } from 'react'
export const RandomItemContext = createContext();

export const RandomItemsDescriptionProvider = () => {
    const barItemGroups = [
        "Most Sold Items",
        "Least Sold Items",
        "High-Profit Margin Items",
        "Low-Profit Margin Items",
        "Seasonal Items",
        "Specialty or Signature Items",
        "Promotional or Discounted Items",
        "Slow-Moving Stock (Aging Inventory)",
        "Customer Favorite Items",
        "Upsell or Add-on Items",
        "Trendy or New Items",
        "Low Inventory (High Demand) Items",
        "High Waste Items",
        "Bundled Items (Combo Offers)",
        "VIP or Exclusive Items"
    ];

    const randomIndex = Math.floor(Math.random() * barItemGroups.length);
    return barItemGroups[randomIndex];
}

