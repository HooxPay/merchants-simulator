import React from 'react';
import { NumericFormat } from 'react-number-format';

import {
  StyledBudgetMonthly,
  StyledBudgetSummaryContainer,
  StyledBudgetTotal,
  StyledContainer,
  StyledTitle,
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
  const renderBudgetSummary = () => {
    return (
      <Box>
        <StyledBudgetTotal>
          {formatThousandsNumber(data.budgetTotal)}
        </StyledBudgetTotal>
        <StyledBudgetMonthly>
          {formatThousandsNumber(data.budgetMonthly, '/month')}
        </StyledBudgetMonthly>
      </Box>
    );
  };

  const renderUplift = (name, value) => {
    return (
      <StyledUpliftContentContainer>
        <StyledUpliftTitle>{name}</StyledUpliftTitle>
        <StyledUpliftSubtitle>
          {name === 'Sales uplift'
            ? formatThousandsNumber(value)
            : formatDecimalNumber(value)}
        </StyledUpliftSubtitle>
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
          <Skeleton>{renderBudgetSummary()}</Skeleton>
        ) : (
          renderBudgetSummary()
        )}
      </StyledBudgetSummaryContainer>
      <StyledUpliftContainer>
        {isLoading ? (
          <Skeleton>{renderUplift(null, 0)}</Skeleton>
        ) : (
          renderUplift('Conversion uplift', data.conversionUplift)
        )}
        {isLoading ? (
          <Skeleton>{renderUplift(null, 0)}</Skeleton>
        ) : (
          renderUplift('AOV uplift', data.AOVUplift)
        )}
        {isLoading ? (
          <Skeleton>{renderUplift(null, 0)}</Skeleton>
        ) : (
          renderUplift('Sales uplift', data.salesUplift)
        )}
      </StyledUpliftContainer>
    </StyledContainer>
  );
};

export default SimulatorOutputSection;
