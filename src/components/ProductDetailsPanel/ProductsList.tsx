import React, { useState, useMemo } from "react";
import { Package, TrendingUp, TrendingDown } from "lucide-react";
import { productsListStyles } from "./style";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface Product {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface ProductsListProps {
  products: Product[];
  valueUnit: string;
  getFormattedValue: (value: number) => string;
  onProductClick?: (product: Product) => void;
  className?: string;
}

type SortState = 'none' | 'desc' | 'asc';
type SortColumn = 'policies' | 'amount' | 'revenue';

export function ProductsList({
  products,
  valueUnit,
  getFormattedValue,
  onProductClick,
  className = "",
}: ProductsListProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortState, setSortState] = useState<SortState>('none');

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

  // Handle sort click
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Cycle through states: none -> desc -> asc -> none
      if (sortState === 'none') {
        setSortState('desc');
      } else if (sortState === 'desc') {
        setSortState('asc');
      } else {
        setSortState('none');
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortState('desc');
    }
  };

  // Sort products based on current sort state
  const sortedProducts = useMemo(() => {
    if (!sortColumn || sortState === 'none') {
      return products;
    }

    return [...products].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortColumn) {
        case 'policies':
          aValue = getPolicyCount(products.indexOf(a));
          bValue = getPolicyCount(products.indexOf(b));
          break;
        case 'amount':
        case 'revenue':
          aValue = a.value;
          bValue = b.value;
          break;
        default:
          return 0;
      }

      if (sortState === 'desc') {
        return bValue - aValue; // High to low
      } else {
        return aValue - bValue; // Low to high
      }
    });
  }, [products, sortColumn, sortState]);

  // Get SVG color based on sort state
  const getSvgColor = (column: SortColumn) => {
    if (sortColumn !== column) return 'currentColor';
    if (sortState === 'desc') return '#22c55e'; // Green for high to low
    if (sortState === 'asc') return '#ef4444'; // Red for low to high
    return 'currentColor'; // Default
  };

  // Get SVG rotation based on sort state
  const getSvgRotation = (column: SortColumn) => {
    if (sortColumn !== column || sortState === 'none') return '';
    if (sortState === 'asc') return 'rotate-180';
    return '';
  };

  return (
    <Card className={productsListStyles.container}>
      <div className="h-120 overflow-auto relative">
        {/* Sticky Table Header */}
        <div
          className={`${productsListStyles.table.headerRow} sticky top-0 z-20 bg-white`}
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
        >
          {/* Sticky Product Header */}
          <div className={`${productsListStyles.table.headerCell} sticky flex items-center justify-center`}>
            Product
          </div>
          
          {/* Sortable Headers */}
          <div 
            className={`${productsListStyles.table.headerCellCenter} cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors flex items-center justify-center`}
            onClick={() => handleSort('policies')}
          >
            <span className="mr-1">No. of Policies</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('policies')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('policies')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
          
          <div 
            className={`${productsListStyles.table.headerCellRight} cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors justify-center`}
            onClick={() => handleSort('amount')}
          >
            <span className="mr-1">Amount</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('amount')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('amount')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
          
          <div 
            className={`${productsListStyles.table.headerCellRight} cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors justify-center`}
            onClick={() => handleSort('revenue')}
          >
            <span className="mr-1">Revenue</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('revenue')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('revenue')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        {/* Table Body */}
        <div className={productsListStyles.table.body}>
          {sortedProducts.map((product, index) => {
            const originalIndex = products.findIndex(p => p.id === product.id);
            const policyCount = getPolicyCount(originalIndex);

            return (
              <div
                key={product.id}
                onClick={() => onProductClick?.(product)}
                className={productsListStyles.productRow.container}
                style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
              >
                {/* Sticky Product Column */}
                <div className={`${productsListStyles.productRow.productColumn} sticky`}>
                  <div
                    className={productsListStyles.productRow.colorIndicator}
                    style={{ backgroundColor: product.color }}
                  />
                  <div className={productsListStyles.productRow.productInfo}>
                    <div className={productsListStyles.productRow.productName}>
                      {product.name}
                    </div>
                    <div className={productsListStyles.productRow.productDescription}>
                      {product.description}
                    </div>
                  </div>
                </div>

                {/* No. of Policies Column */}
                <div className={productsListStyles.productRow.centerColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {policyCount.toLocaleString()}
                  </div>
                </div>

                {/* Amount Column */}
                <div className={productsListStyles.productRow.rightColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {getFormattedValue(product.value)}
                  </div>
                </div>

                {/* Revenue Column */}
                <div className={productsListStyles.productRow.rightColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {getFormattedValue(product.value)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
