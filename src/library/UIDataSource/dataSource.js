import {
  getIndustriesDisplayNamesArray,
  getIndustryByDisplayName,
} from '../industryData/dataUtils';
import { generateDefaultsForIndustry } from '../industryData/dataUtils';
import { caclulateUIOutputs } from '../industryData/calculateOutputs';

//*Get the Indutries display names array to populate the Industries dropdown
export const getIndustriesNamesArray = () => {
  return getIndustriesDisplayNamesArray();
};

//* Get the default values for all UI controls for the selected industry
/**
 *
 * @param {String || Null} industryDisplayName - The display name of the industry or null. If null - the avg object is returned.
 * @returns {Object} The default values for all UI controls
 * @example
 * {
    cvr: {
      //Avg Conversion Rate as a percent value
      value: 2.59
      min: 1.3,
      max: 3.8,
    },
    aov: {
      //Avg Order Value as a number (no currency symbol added)
      value: 219,
      min: 40,
      max: 470,
    },
    avgDiscount: {
      //Avg Discount as a percent value
      value: 11.1,
      min: 1.01,
      max: 17.2,
    },
    monthlyTraffic: {
      //Monthly Traffic as a number (need formatting wit commas)
      value: 100000,
      min: 10000,
      max: 5000000,
    },
  };
 */
export const getUIDefaultsForIndustry = (industryDisplayName) => {
  return generateDefaultsForIndustry(industryDisplayName);
};
//* Get the UI computed outputs for the selected industry
//* Called when the user changed UI controls values
/**
 *
 * @param {Number || Null} monthlyTraffic
 * @param {Number || Null} avgDiscount
 * @param {Number || Null} avgConversion
 * @param {Number || Null} avgOrder
 * @param {Number || Null} industryDisplayName
 * @returns {Object} The computed UI outputs formatted as strings
 * @example
 * {
 *   estimatedAnnualBudget,         //$297,321
 *   estimatedAnnualBudgetPerMonth, //$24,777
 *   conversionUplift,              //+65%
 *   aovUplift,                     //+1.5%
 *   salesUplift,                   //+65%
 * }
 */

export const getUIOutputs = (
  monthlyTraffic,
  avgDiscount,
  avgConversion,
  avgOrder,
  industryDisplayName
) => {
  const industry = getIndustryByDisplayName(industryDisplayName);
  const monthlyTrafficValue = monthlyTraffic || industry.monthlyTraffic;
  const avgDiscountValue = avgDiscount || industry.avgDiscount;
  const avgConversionValue = avgConversion || industry.cvr;
  const avgOrderValue = avgOrder || industry.aov;

  return caclulateUIOutputs(
    monthlyTrafficValue,
    avgDiscountValue,
    avgConversionValue,
    avgOrderValue,
    industryDisplayName
  );
};
