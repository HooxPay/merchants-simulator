import React from 'react';
import { NumericFormat } from 'react-number-format';

import {
  StyledBudgetMonthly,
  StyledBudgetSummaryContainer,
  StyledBudgetTotal,
  StyledContainer,
  StyledSkeleton,
  StyledTitle,
  StyledUpliftAmount,
  StyledUpliftContainer,
  StyledUpliftContentContainer,
  StyledUpliftSubtitle,
  StyledUpliftTitle,
} from './SimulatorOutputSection.styles';
import { Box, Skeleton } from '@mui/material';

const data = {
  budgetTotal: 297168,
  budgetMonthly: 24764,
  conversionUplift: 7.8,
  AOVUplift: 2.5,
  salesUplift: 38308,
};

const formatDecimalNumber = (value) => {
  const safeValue = value || 0;
  return (
    <NumericFormat
      value={safeValue}
      displayType='text'
      decimalScale={1}
      prefix={'+'}
      suffix={'%'}
    />
  );
};

const formatThousandsNumber = (value, suffix = '') => {
  const safeValue = value || 0;
  return (
    <NumericFormat
      value={safeValue}
      displayType='text'
      thousandSeparator
      prefix={'$'}
      suffix={suffix}
    />
  );
};

const SimulatorOutputSection = ({ isLoading }) => {
  const renderUplift = (name, value) => {
    return (
      <StyledUpliftContentContainer>
        <StyledUpliftTitle>{name}</StyledUpliftTitle>
        {isLoading ? (
          <StyledSkeleton
            variant='rectangular'
            width={100}
            height={20}
          />
        ) : (
          <StyledUpliftAmount>
            {name === 'Sales uplift'
              ? formatThousandsNumber(value)
              : formatDecimalNumber(value)}
          </StyledUpliftAmount>
        )}
      </StyledUpliftContentContainer>
    );
  };
  return (
    <StyledContainer>
      <StyledTitle>
        Estimated annual budget we will deploy from card issuers:
      </StyledTitle>
      <StyledBudgetSummaryContainer>
        {isLoading ? (
          <StyledSkeleton
            variant='rectangular'
            width={260}
            height={60}
          />
        ) : (
          <StyledBudgetTotal>
            {formatThousandsNumber(data.budgetTotal)}
          </StyledBudgetTotal>
        )}
        {isLoading ? (
          <StyledSkeleton
            variant='rectangular'
            width={190}
            height={20}
          />
        ) : (
          <StyledBudgetMonthly>
            {formatThousandsNumber(data.budgetMonthly, '/month')}
          </StyledBudgetMonthly>
        )}
      </StyledBudgetSummaryContainer>
      <StyledUpliftContainer>
        {renderUplift('Conversion uplift', data.conversionUplift)}
        {renderUplift('AOV uplift', data.AOVUplift)}
        {renderUplift('Sales uplift', data.salesUplift)}
      </StyledUpliftContainer>
    </StyledContainer>
  );
};

export default SimulatorOutputSection;
