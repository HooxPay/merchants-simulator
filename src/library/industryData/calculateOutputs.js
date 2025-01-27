import { computeNumberOfOffers } from './dataUtils.js';
import { hooxConstants } from './hooxConstants.js';
import { formatCurrency } from './dataUtils.js';
import { getIndustryByDisplayName } from './dataUtils.js';

const computeConversionUplift = (
  cvrInput,
  cvrIndustry,
  conversionUpliftIndustry
) => {
  const converisonUplift =
    (cvrInput / cvrIndustry) * conversionUpliftIndustry * 100;
  return converisonUplift;
};

const computeAOVUplift = (aovInput, aovIndustry, aovUpliftIndustry) => {
  const aovUpliftComputed = (aovInput / aovIndustry) * aovUpliftIndustry * 100;
  return aovUpliftComputed;
};

const computeSalesUplift = (
  cvrInput,
  cvrIndustry,
  conversionUpliftIndustry,
  monthlyTrafficInput,
  aovInput,
  aovIndustry,
  avgDiscountInput
) => {
  const originalTotalSales =
    monthlyTrafficInput * cvrInput * aovInput * (1 - avgDiscountInput);

  const originalSalesInHooxTransactions =
    originalTotalSales * hooxConstants.hooxShareInOffers;

  const coversionUplift = computeConversionUplift(
    cvrInput,
    cvrIndustry,
    conversionUpliftIndustry
  );

  const aovUplift = computeAOVUplift(
    aovInput,
    aovIndustry,
    conversionUpliftIndustry
  );

  const salesInHooxTransactions =
    originalSalesInHooxTransactions *
    (1 + coversionUplift / 100) *
    (1 + aovUplift / 100);

  const salesUplift = salesInHooxTransactions - originalSalesInHooxTransactions;
  return formatCurrency(salesUplift);
};

const computeEstimatedAnnualBudget = (
  monthlyTrafficInput,
  cvrInput,
  avgDiscount
) => {
  const numberOfOffers = computeNumberOfOffers(monthlyTrafficInput, cvrInput);
  return numberOfOffers * avgDiscount * 12;
};

const computeEstimatedAnnualBudgetPerMonth = (estimatedAnnualBudget) => {
  return formatCurrency(estimatedAnnualBudget / 12);
};

export const caclulateUIOutputs = (
  monthlyTraffic,
  avgDiscount,
  avgConversion,
  avgOrder,
  industryDisplayName
) => {
  const industryData = getIndustryByDisplayName(industryDisplayName);
  const cvrIndustry = industryData.cvr;
  const hooxConversionUplift = industryData.hooxConversionUplift;
  const aovIndustry = industryData.aov;

  const estimatedAnnualBudget = computeEstimatedAnnualBudget(
    monthlyTraffic,
    avgConversion,
    avgDiscount
  );

  const formattedEstimatedAnnualBudget = formatCurrency(estimatedAnnualBudget);
  const estimatedAnnualBudgetPerMonth = computeEstimatedAnnualBudgetPerMonth(
    estimatedAnnualBudget
  );

  const conversionUplift = computeConversionUplift(
    avgConversion,
    cvrIndustry,
    hooxConversionUplift
  );

  const aovUplift = computeAOVUplift(
    avgOrder,
    aovIndustry,
    hooxConversionUplift
  );

  const salesUplift = computeSalesUplift(
    avgConversion,
    cvrIndustry,
    hooxConversionUplift,
    monthlyTraffic,
    avgOrder,
    aovIndustry,
    avgDiscount
  );
  return {
    estimatedAnnualBudget: formattedEstimatedAnnualBudget, //Formatted currency
    estimatedAnnualBudgetPerMonth, //Formatted currency
    conversionUplift: `+${conversionUplift.toFixed(1)}%`,
    aovUplift: `+${aovUplift.toFixed(1)}%`,
    salesUplift,
  };
};
