import { industriesDataObject } from './industryData';
import { hooxConstants } from './hooxConstants';
export const getIndustryByKeyName = (keyName) => {
  if (keyName in industriesDataObject) {
    return industriesDataObject[keyName];
  }

  return industriesDataObject.avg;
};

export const getIndustryByDisplayName = (displayName) => {
  const industry = Object.values(industriesDataObject).find(
    (industry) => industry.displayName === displayName
  );

  if (industry) {
    return industry;
  }

  return industriesDataObject.avg;
};

export const getIndustriesDisplayNamesArray = () => {
  return Object.values(industriesDataObject).map(
    (industry) => industry.displayName
  );
};

export const getCVRbyIndustryDisplayName = (displayName) => {
  return getIndustryByDisplayName(displayName).cvr;
};

export const getAOVbyIndustryDisplayName = (displayName) => {
  return getIndustryByDisplayName(displayName).aov;
};

export const getAvgDiscountbyIndustryDisplayName = (displayName) => {
  return getIndustryByDisplayName(displayName).avgDiscount;
};

export const getHooxDiscountbyIndustryDisplayName = (displayName) => {
  return getIndustryByDisplayName(displayName).hooxDiscount;
};

export const getHooxConversionUpliftbyIndustryDisplayName = (displayName) => {
  return getIndustryByDisplayName(displayName).hooxConversionUplift;
};

export const getAOVUpliftbyIndustryDisplayName = (displayName) => {
  return getIndustryByDisplayName(displayName).aovUplift;
};

export const generateDefaultsForIndustry = (industryDisplayName) => {
  const industry = industryDisplayName || industriesDataObject.avg.displayName;
  const industryData = getIndustryByDisplayName(industry);
  return getInputValues(industryData);
};

const getInputValues = (industryData) => {
  return {
    cvr: {
      //Avg Conversion Rate
      value: industryData.cvr * 100,
      min: parseFloat((industryData.cvrMin * 100).toFixed(1)),
      max: parseFloat((industryData.cvrMax * 100).toFixed(1)),
    },
    aov: {
      //Avg Order Value
      value: industryData.aov,
      min: industryData.aovMin,
      max: industryData.aovMax,
    },
    avgDiscount: {
      value: parseFloat((industryData.avgDiscount * 100).toFixed(1)),
      min: parseFloat((industryData.avgDiscountMin * 100).toFixed(1)),
      max: parseFloat((industryData.avgDiscountMax * 100).toFixed(1)),
    },
    monthlyTraffic: {
      value: industryData.monthlyTraffic,
      min: industryData.monthlyTrafficMin,
      max: industryData.monthlyTrafficMax,
    },
  };
};

export const computeNumberOfOffers = (monthlyTrafficInput, cvrInput) => {
  const hooxShare = hooxConstants.hooxShareInOffers;
  return monthlyTrafficInput * hooxShare * cvrInput;
};

export const formatCurrency = (amount) => {
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};
