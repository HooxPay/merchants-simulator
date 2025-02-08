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
  avgHooxIncentive
) => {
  const numberOfOffers = computeNumberOfOffers(monthlyTrafficInput, cvrInput);
  return numberOfOffers * avgHooxIncentive * 12;
};

const computeEstimatedAnnualBudgetPerMonth = (estimatedAnnualBudget) => {
  return formatCurrency(estimatedAnnualBudget / 12);
};

export const caclulateUIOutputs = (
  monthlyTrafficInput,
  avgDiscountInput,
  cvrInput,
  avgOrderInput,
  industryDisplayName
) => {
  const industryData = getIndustryByDisplayName(industryDisplayName);
  const cvrIndustry = industryData.cvr;
  const hooxConversionUplift = industryData.hooxConversionUplift;
  const aovIndustry = industryData.aov;
  const hooxIncentiveInIndustry = industryData.hooxDiscount;
  const estimatedAnnualBudget = computeEstimatedAnnualBudget(
    monthlyTrafficInput,
    cvrInput,
    hooxIncentiveInIndustry
  );

  const formattedEstimatedAnnualBudget = formatCurrency(estimatedAnnualBudget);
  const estimatedAnnualBudgetPerMonth = computeEstimatedAnnualBudgetPerMonth(
    estimatedAnnualBudget
  );

  const conversionUplift = computeConversionUplift(
    cvrInput,
    cvrIndustry,
    hooxConversionUplift
  );

  const aovUplift = computeAOVUplift(
    avgOrderInput,
    aovIndustry,
    hooxConversionUplift
  );

  const salesUplift = computeSalesUplift(
    cvrInput,
    cvrIndustry,
    hooxConversionUplift,
    monthlyTrafficInput,
    avgOrderInput,
    aovIndustry,
    avgDiscountInput
  );
  return {
    estimatedAnnualBudget: formattedEstimatedAnnualBudget, //Formatted currency
    estimatedAnnualBudgetPerMonth, //Formatted currency
    conversionUplift: `+${conversionUplift.toFixed(1)}%`,
    aovUplift: `+${aovUplift.toFixed(1)}%`,
    salesUplift,
  };
};
