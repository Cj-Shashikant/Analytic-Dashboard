import React, { useState } from "react";
import { Button } from "../ui/button";
import { insurersListStyles } from "./style";
import { Badge } from "../ui/badge";
import { TrendingUp, TrendingDown, Building2 } from "lucide-react";

interface Insurer {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
  description: string;
  trend?: {
    direction: "up" | "down";
    percentage: number;
  };
}

interface InsurersListProps {
  insurers: Insurer[];
  valueUnit: string;
  getFormattedValue: (value: number) => string;
  onInsurerClick?: (insurer: Insurer) => void;
  className?: string;
  selectedReportType?: string;
}

export function InsurersList({
  insurers,
  valueUnit,
  getFormattedValue,
  onInsurerClick,
  className = "",
}: InsurersListProps) {
  // Generate mock policy numbers for each product
  const getPolicyCount = (index: number) => {
    const baseCounts = [
      33300, 27360, 23040, 16740, 12780, 8950, 7200, 6100, 5400, 4800, 4200,
      3600, 3100, 2700, 2300,
    ];
    return (
      baseCounts[index % baseCounts.length] ||
      Math.floor(Math.random() * 10000) + 1000
    );
  };

  return (
    <div className={`${insurersListStyles.container} ${className}`}>
      <div className={insurersListStyles.header.wrapper}>
        <div className="flex items-center gap-2">
          {" "}
          <Building2 className={insurersListStyles.header.icon} />
          <h3 className={insurersListStyles.header.title}>Insurer Breakdown</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-xs text-gray-600">
              Company
            </Button>
            <Button
              variant="ghost"
              size="xs"
              className="h-8 px-2 text-xs bg-blue-100 text-blue-700 hover:text-blue-700 hover:underline hover:decoration-blue-700"
            >
              Polic
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-down w-3 h-3 ml-1"
                aria-hidden="true"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </Button>
            <Button
              variant="outline"
              className="h-8 px-2 text-xs bg-blue-100 text-blue-700"
            >
              Amount
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-down w-3 h-3 ml-1"
                aria-hidden="true"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </Button>
            <Button
              variant="outline"
              className="h-8 px-2 text-xs bg-blue-100 text-blue-700"
            >
              Revenue
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-down w-3 h-3 ml-1"
                aria-hidden="true"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {/* Table Header */}
        <div
          className={insurersListStyles.table.headerRow}
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
        >
          <div className={insurersListStyles.table.headerCell}>Insurer</div>
          <div className={insurersListStyles.table.headerCellCenter}>
            No. of Policies
          </div>
          <div className={insurersListStyles.table.headerCellRight}>Amount</div>
          <div className={insurersListStyles.table.headerCellRight}>
            Revenue
          </div>
        </div>

        {/* Table Body */}
        <div className={insurersListStyles.table.body}>
          {insurers.map((insurer, index) => {
            const policyCount = getPolicyCount(index);

            return (
              <div
                key={insurer.id}
                onClick={() => onInsurerClick?.(insurer)}
                className={insurersListStyles.productRow.container}
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
              >
                {/* Insurer Column */}
                <div className={insurersListStyles.productRow.productColumn}>
                  <div
                    className={insurersListStyles.productRow.colorIndicator}
                    style={{ backgroundColor: insurer.color }}
                  />
                  <div className={insurersListStyles.productRow.productInfo}>
                    <div className={insurersListStyles.productRow.productName}>
                      {insurer.name}
                    </div>
                    <div
                      className={
                        insurersListStyles.productRow.productDescription
                      }
                    >
                      {insurer.description}
                    </div>
                  </div>
                </div>

                {/* No. of Policies Column */}
                <div className={insurersListStyles.productRow.centerColumn}>
                  <div className={insurersListStyles.productRow.cellValue}>
                    {policyCount.toLocaleString()}
                  </div>
                </div>

                {/* Amount Column */}
                <div className={insurersListStyles.productRow.rightColumn}>
                  <div className={insurersListStyles.productRow.cellValue}>
                    {getFormattedValue(insurer.value)}
                  </div>
                </div>

                {/* Revenue Column */}
                <div className={insurersListStyles.productRow.rightColumn}>
                  <div className={insurersListStyles.productRow.cellValue}>
                    {getFormattedValue(insurer.value)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/*       
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-600 text-center">
          {products.length} products shown
        </div>
      </div> */}
      </div>
    </div>
  );
}
