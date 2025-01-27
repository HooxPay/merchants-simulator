import { computeNumberOfOffers } from '../UIDataSource/dataSource.js';
import { hooxConstants } from './hooxConstants.js';
import { formatCurrency } from './dataUtils.js';
import { getIndustryByDisplayName } from './dataUtils.js';
i;
const computeConversionUplift = (
  cvrInput,
  cvrIndustry,
  conversionUpliftIndustry
) => {
  const converisonUplift =
    (cvrInput / cvrIndustry) * conversionUpliftIndustry * 100;
  return `+${converisonUplift.toFixed(1)}%`;
};

const computeAOVUplift = (aovInput, aovIndustry, aovUpliftIndustry) => {
  const aovUpliftComputed = (aovInput / aovIndustry) * aovUpliftIndustry * 100;
  return `+${aovUpliftComputed.toFixed(1)}%`;
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
    originalTotalSales * hooxConstants.hooxShare;

  const coversionUplift = computeConversionUplift(
    cvrInput,
    cvrIndustry,
    conversionUpliftIndustry
  );

  const aovUplift = computeAOVUplift(aovInput, aovIndustry, aovUpliftIndustry);

  const salesInHooxTransactions =
    originalSalesInHooxTransactions * coversionUplift * aovUplift;

  const salesUplift = Math.round(
    salesInHooxTransactions - originalSalesInHooxTransactions
  );
  return formatCurrency(salesUplift);
};

const computeEstimatedAnnualBudget = (
  monthlyTrafficInput,
  cvrInput,
  avgDiscount
) => {
  const numberOfOffers = computeNumberOfOffers(monthlyTrafficInput, cvrInput);
  return formatCurrency(numberOfOffers * avgDiscount * 12);
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
    estimatedAnnualBudget, //Formatted currency
    estimatedAnnualBudgetPerMonth, //Formatted currency
    conversionUplift,
    aovUplift,
    salesUplift,
  };
};
