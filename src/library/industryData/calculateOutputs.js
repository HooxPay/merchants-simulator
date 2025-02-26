import { computeNumberOfOffers } from './dataUtils.js';
import { hooxConstants } from './hooxConstants.js';
import { formatCurrency } from './dataUtils.js';
import { getIndustryByDisplayName } from './dataUtils.js';

const computeConversionUplift = (
  cvrInput,
  cvrIndustry,
  hooxConversionUpliftIndustry
) => {
  const converisonUplift =
    (cvrIndustry / cvrInput) * hooxConversionUpliftIndustry * 100;
  return converisonUplift;
};

const computeAOVUplift = (aovInput, aovIndustry, aovUpliftIndustry) => {
  const aovUpliftComputed = (aovIndustry / aovInput) * aovUpliftIndustry * 100;
  return aovUpliftComputed;
};

const computeSalesUplift = (
  cvrInput,
  cvrIndustry,
  hooxConversionUpliftIndustry,
  monthlyTrafficInput,
  aovInput,
  aovIndustry,
  avgDiscountInput,
  aovUpliftByIndustry
) => {
  const hooxSharesInOffers = hooxConstants.hooxShareInOffers;

  const originalTotalSales =
    monthlyTrafficInput *
    cvrInput *
    aovInput *
    (1 - avgDiscountInput) *
    hooxSharesInOffers;

  const salesInHooxTransactions =
    originalTotalSales *
    (1 + (cvrIndustry / cvrInput) * hooxConversionUpliftIndustry) *
    (1 + (aovIndustry / aovInput) * aovUpliftByIndustry);

  const salesUplift = (salesInHooxTransactions - originalTotalSales) * 12;
  return salesUplift;
};

const computeEstimatedAnnualBudget = (
  monthlyTrafficInput,
  cvrInput,
  avgHooxIncentive
) => {
  const numberOfOffers = computeNumberOfOffers(monthlyTrafficInput, cvrInput);
  return numberOfOffers * avgHooxIncentive;
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
  const hooxConversionUpliftIndustry = industryData.hooxConversionUplift;
  const aovIndustry = industryData.aov;
  const hooxIncentiveInIndustry = industryData.hooxDiscount;
  const estimatedAnnualBudget = computeEstimatedAnnualBudget(
    monthlyTrafficInput,
    cvrInput,
    hooxIncentiveInIndustry
  );
  const aovUpliftByIndustry = industryData.aovUplift;
  const sponseredByIssuers =
    estimatedAnnualBudget * hooxConstants.hooxConversion * 12;
  const formattedSponseredByIssuers = formatCurrency(sponseredByIssuers);

  const conversionUplift = computeConversionUplift(
    cvrInput,
    cvrIndustry,
    hooxConversionUpliftIndustry
  );

  const aovUplift = computeAOVUplift(
    avgOrderInput,
    aovIndustry,
    aovUpliftByIndustry
  );

  const annualSalesUplift = computeSalesUplift(
    cvrInput,
    cvrIndustry,
    hooxConversionUpliftIndustry,
    monthlyTrafficInput,
    avgOrderInput,
    aovIndustry,
    avgDiscountInput,
    aovUpliftByIndustry
  );

  const formattedSalesUplift = formatCurrency(annualSalesUplift);
  const formattedSalesUpliftPerMonth = formatCurrency(annualSalesUplift / 12);
  return {
    estimatedAnnualSalesUplift: formattedSalesUplift, //Changed From estimatedAnnualBudget
    estimatedAnnualSalesUpliftPerMonth: formattedSalesUpliftPerMonth, //Formatted currency
    conversionUplift: `+${conversionUplift.toFixed(1)}%`,
    aovUplift: `+${aovUplift.toFixed(1)}%`,
    sponseredByIssuer: formattedSponseredByIssuers, //Changed from salesUplift
  };
};
