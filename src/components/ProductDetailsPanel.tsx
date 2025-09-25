import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  X,
  Package,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  ArrowLeft,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface ProductDetails {
  id?: string;
  name: string;
  category?: string;
  premium?: number;
  revenue?: number;
  policies?: number;
  value?: number; // This comes from the chart data
  color: string;
  percentage?: number;
  description?: string;
  clientBreakdown?: {
    Corporate: { premium: number; revenue: number; policies: number };
    Retail: { premium: number; revenue: number; policies: number };
    Affinity: { premium: number; revenue: number; policies: number };
  };
}

interface ProductDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetails | null;
  valueUnit: string;
}

export function ProductDetailsPanel({
  isOpen,
  onClose,
  product,
  valueUnit,
}: ProductDetailsPanelProps) {
  if (!product) return null;

  const getFormattedValue = (value: number) => {
    if (valueUnit === "Cr") {
      return `₹${(value / 10000000).toFixed(2)}`;
    } else if (valueUnit === "L") {
      return `₹${(value / 100000).toFixed(2)}`;
    } else if (valueUnit === "K") {
      return `₹${(value / 1000).toFixed(2)}`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  // Executive-grade color palette
  const colorPalette = {
    softBlue: "#4C9AFF",
    tealGreen: "#00C7B7",
    coralOrange: "#FF715B",
    skyBlue: "#73C2FB",
    warmYellow: "#FFCE56",
    lightPurple: "#A480CF",
    mintGreen: "#5ADBB5",
    slateGray: "#6B7B8C",
    lavenderBlue: "#B4C5E4",
    peachBeige: "#F4A896",
    paleAqua: "#A3F7BF",
    deepLilac: "#8566AA",
    seafoamGray: "#B5D2CB",
    dustyRose: "#D58A94",
    coolTaupe: "#A9A9B2",
  };

  // Prepare client breakdown data for charts - with fallback if clientBreakdown is missing
  const getClientBreakdownData = () => {
    // If clientBreakdown exists, use it
    if (
      product.clientBreakdown &&
      typeof product.clientBreakdown === "object"
    ) {
      return Object.entries(product.clientBreakdown).map(
        ([clientType, data]) => ({
          name: clientType,
          premium: data.premium,
          revenue: data.revenue,
          policies: data.policies,
          color:
            clientType === "Corporate"
              ? colorPalette.softBlue
              : clientType === "Retail"
              ? colorPalette.tealGreen
              : colorPalette.lightPurple,
        })
      );
    }

    // Otherwise, create mock breakdown based on product.value (assuming it's premium)
    const totalPremium = product.value || 0;
    const estimatedRevenue = totalPremium * 0.15; // Assume 15% commission rate
    const estimatedPolicies = Math.floor(totalPremium / 2000); // Assume ₹2000 average premium per policy

    return [
      {
        name: "Corporate",
        premium: Math.round(totalPremium * 0.52),
        revenue: Math.round(estimatedRevenue * 0.52),
        policies: Math.floor(estimatedPolicies * 0.52),
        color: colorPalette.softBlue,
      },
      {
        name: "Retail",
        premium: Math.round(totalPremium * 0.35),
        revenue: Math.round(estimatedRevenue * 0.35),
        policies: Math.floor(estimatedPolicies * 0.35),
        color: colorPalette.tealGreen,
      },
      {
        name: "Affinity",
        premium: Math.round(totalPremium * 0.13),
        revenue: Math.round(estimatedRevenue * 0.13),
        policies: Math.floor(estimatedPolicies * 0.13),
        color: colorPalette.lightPurple,
      },
    ];
  };

  const clientData = getClientBreakdownData();

  // Get the premium value (fallback to value if premium is not available)
  const premiumValue = product.premium || product.value || 0;
  const revenueValue = product.revenue || premiumValue * 0.15; // Assume 15% commission if revenue not available
  const policiesValue = product.policies || Math.floor(premiumValue / 2000); // Estimate policies if not available

  // Sample historical performance data
  const performanceData = [
    {
      period: "Q1 2023",
      premium: premiumValue * 0.8,
      revenue: revenueValue * 0.8,
      policies: Math.floor(policiesValue * 0.8),
    },
    {
      period: "Q2 2023",
      premium: premiumValue * 0.9,
      revenue: revenueValue * 0.9,
      policies: Math.floor(policiesValue * 0.9),
    },
    {
      period: "Q3 2023",
      premium: premiumValue * 0.95,
      revenue: revenueValue * 0.95,
      policies: Math.floor(policiesValue * 0.95),
    },
    {
      period: "Q4 2023",
      premium: premiumValue,
      revenue: revenueValue,
      policies: policiesValue,
    },
  ];

  // Sample geographic distribution
  const geographicData = [
    {
      region: "Mumbai",
      premium: premiumValue * 0.35,
      policies: Math.floor(policiesValue * 0.35),
    },
    {
      region: "Delhi",
      premium: premiumValue * 0.25,
      policies: Math.floor(policiesValue * 0.25),
    },
    {
      region: "Bangalore",
      premium: premiumValue * 0.15,
      policies: Math.floor(policiesValue * 0.15),
    },
    {
      region: "Chennai",
      premium: premiumValue * 0.12,
      policies: Math.floor(policiesValue * 0.12),
    },
    {
      region: "Others",
      premium: premiumValue * 0.13,
      policies: Math.floor(policiesValue * 0.13),
    },
  ];

  // Sample insurer partnerships for this product
  const insurerData = [
    {
      name: "ICICI Lombard",
      premium: premiumValue * 0.3,
      policies: Math.floor(policiesValue * 0.3),
      commission: 15,
    },
    {
      name: "HDFC ERGO",
      premium: premiumValue * 0.25,
      policies: Math.floor(policiesValue * 0.25),
      commission: 14,
    },
    {
      name: "Bajaj Allianz",
      premium: premiumValue * 0.2,
      policies: Math.floor(policiesValue * 0.2),
      commission: 13,
    },
    {
      name: "Others",
      premium: premiumValue * 0.25,
      policies: Math.floor(policiesValue * 0.25),
      commission: 12,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg backdrop-blur-sm">
          <p className="font-medium text-gray-700 text-sm">{data.name}</p>
          <p
            className="font-medium text-sm"
            style={{ color: data.color || colorPalette.softBlue }}
          >
            {getFormattedValue(data.premium)} {valueUnit}s
          </p>
          <p className="text-gray-500 text-xs">
            {formatNumber(data.policies)} policies
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (entry: any) => {
    const percentage = (entry.premium / premiumValue) * 100;
    return percentage >= 10 ? `${percentage.toFixed(1)}%` : "";
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => {
            console.log("Backdrop clicked, calling onClose");
            onClose();
          }}
          aria-hidden="true"
        />
      )}

      {/* Right-side panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          width: "100vw",
          maxWidth: "100vw",
          transition: "transform 3.5s ease-in-out",
        }}
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-8 pb-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log("ArrowLeft button clicked, calling onClose");
                onClose();
              }}
              className="h-10 w-10 p-0 rounded-lg transition-all duration-200 hover:bg-white/50"
              title="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600" />
            </Button>
            <div
              className="p-3 rounded-xl shadow-sm"
              style={{ backgroundColor: `${product.color}20` }}
            >
              <Package className="w-7 h-7" style={{ color: product.color }} />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                Comprehense business records and performance analytics for{" "}
                {product.category || "insurance"} product
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              className="text-base px-6 py-2 font-medium"
              style={{
                backgroundColor: `${product.color}20`,
                color: product.color,
                border: `1px solid ${product.color}40`,
              }}
            >
              {product.category || "Insurance"} Product
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log("X button clicked, calling onClose");
                onClose();
              }}
              className="h-10 w-10 p-0 rounded-lg transition-all duration-200 hover:bg-white text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto h-full">
          {/* Added bottom padding for better scrolling */}
          <div className="p-8 space-y-10 pb-16">
            {/* Key Metrics Overview - Enhanced Grid */}
            <div className="grid grid-cols-4 gap-8">
              <Card
                className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundColor: `${colorPalette.softBlue}10` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${colorPalette.softBlue}20` }}
                  >
                    <DollarSign
                      className="w-6 h-6"
                      style={{ color: colorPalette.softBlue }}
                    />
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    Total Premium
                  </span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {getFormattedValue(premiumValue)}
                </p>
                <p className="text-base text-gray-600">{valueUnit}s</p>
              </Card>

              <Card
                className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundColor: `${colorPalette.tealGreen}10` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${colorPalette.tealGreen}20` }}
                  >
                    <Target
                      className="w-6 h-6"
                      style={{ color: colorPalette.tealGreen }}
                    />
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    Total Revenue
                  </span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {getFormattedValue(revenueValue)}
                </p>
                <p className="text-base text-gray-600">{valueUnit}s</p>
              </Card>

              <Card
                className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundColor: `${colorPalette.lightPurple}10` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${colorPalette.lightPurple}20` }}
                  >
                    <Users
                      className="w-6 h-6"
                      style={{ color: colorPalette.lightPurple }}
                    />
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    Total Policies
                  </span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {formatNumber(policiesValue)}
                </p>
                <p className="text-base text-gray-600">active policies</p>
              </Card>

              <Card
                className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundColor: `${colorPalette.warmYellow}10` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${colorPalette.warmYellow}20` }}
                  >
                    <BarChart3
                      className="w-6 h-6"
                      style={{ color: colorPalette.warmYellow }}
                    />
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    Avg. Premium
                  </span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {getFormattedValue(
                    policiesValue > 0 ? premiumValue / policiesValue : 0
                  )}
                </p>
                <p className="text-base text-gray-600">per policy</p>
              </Card>
            </div>

            {/* Two-Column Layout for Charts */}
            <div className="grid grid-cols-2 gap-10">
              {/* Client Type Breakdown */}
              <Card className="p-10 shadow-lg">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${colorPalette.mintGreen}20` }}
                  >
                    <PieChart
                      className="w-6 h-6"
                      style={{ color: colorPalette.mintGreen }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Client Type Distribution
                    </h3>
                    <p className="text-base text-gray-600 mt-1">
                      Premium and policy breakdown by client segments
                    </p>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="mb-8">
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={clientData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={150}
                          dataKey="premium"
                          label={renderCustomLabel}
                          labelLine={false}
                          strokeWidth={3}
                          stroke="#ffffff"
                        >
                          {clientData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Client Details */}
                <div className="space-y-4">
                  {clientData.map((client, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: client.color }}
                        ></div>
                        <span className="text-xl font-semibold text-gray-900">
                          {client.name}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <p className="text-gray-600 mb-1 text-base">
                            Premium
                          </p>
                          <p className="text-xl font-semibold text-gray-900">
                            {getFormattedValue(client.premium)} {valueUnit}s
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1 text-base">
                            Revenue
                          </p>
                          <p className="text-xl font-semibold text-gray-900">
                            {getFormattedValue(client.revenue)} {valueUnit}s
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1 text-base">
                            Policies
                          </p>
                          <p className="text-xl font-semibold text-gray-900">
                            {formatNumber(client.policies)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Historical Performance */}
              <Card className="p-10 shadow-lg">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${colorPalette.skyBlue}20` }}
                  >
                    <TrendingUp
                      className="w-6 h-6"
                      style={{ color: colorPalette.skyBlue }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Historical Performance
                    </h3>
                    <p className="text-base text-gray-600 mt-1">
                      Quarterly trend analysis
                    </p>
                  </div>
                </div>

                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="period" stroke="#888" fontSize={14} />
                      <YAxis stroke="#888" fontSize={14} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          fontSize: "14px",
                          padding: "12px",
                        }}
                      />
                      <Bar
                        dataKey="premium"
                        fill={colorPalette.softBlue}
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Bottom Row - Geographic Distribution and Insurer Partnerships */}
            <div className="grid grid-cols-2 gap-10">
              {/* Geographic Distribution */}
              <Card className="p-10 shadow-lg">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${colorPalette.coralOrange}20` }}
                  >
                    <MapPin
                      className="w-6 h-6"
                      style={{ color: colorPalette.coralOrange }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Geographic Distribution
                    </h3>
                    <p className="text-base text-gray-600 mt-1">
                      Regional performance breakdown
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {geographicData.map((region, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: colorPalette.coralOrange }}
                        ></div>
                        <span className="text-xl font-semibold text-gray-900">
                          {region.region}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold text-gray-900">
                          {getFormattedValue(region.premium)} {valueUnit}s
                        </p>
                        <p className="text-base text-gray-600">
                          {formatNumber(region.policies)} policies
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Insurer Partnerships */}
              <Card className="p-10 shadow-lg">
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${colorPalette.deepLilac}20` }}
                  >
                    <Building2
                      className="w-6 h-6"
                      style={{ color: colorPalette.deepLilac }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Insurer Partnerships
                    </h3>
                    <p className="text-base text-gray-600 mt-1">
                      Partner performance for this product
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-4 px-6 text-lg font-semibold text-gray-900">
                          Insurer
                        </th>
                        <th className="text-right py-4 px-6 text-lg font-semibold text-gray-900">
                          Premium
                        </th>
                        <th className="text-right py-4 px-6 text-lg font-semibold text-gray-900">
                          Policies
                        </th>
                        <th className="text-right py-4 px-6 text-lg font-semibold text-gray-900">
                          Commission %
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {insurerData.map((insurer, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6 text-lg font-medium text-gray-900">
                            {insurer.name}
                          </td>
                          <td className="text-right py-4 px-6 text-lg text-gray-900">
                            {getFormattedValue(insurer.premium)} {valueUnit}s
                          </td>
                          <td className="text-right py-4 px-6 text-lg text-gray-900">
                            {formatNumber(insurer.policies)}
                          </td>
                          <td className="text-right py-4 px-6 text-lg font-semibold text-gray-900">
                            {insurer.commission}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
