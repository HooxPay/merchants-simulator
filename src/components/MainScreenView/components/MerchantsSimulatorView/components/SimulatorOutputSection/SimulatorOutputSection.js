import { forwardRef } from 'react';

import {
  StyledBudgetMonthly,
  StyledBudgetMonthlySkeleton,
  StyledBudgetSummaryContainer,
  StyledBudgetTotal,
  StyledBudgetTotalSkeleton,
  StyledContainer,
  StyledSkeleton,
  StyledTitle,
  StyledUpliftAmount,
  StyledUpliftContainer,
  StyledUpliftContentContainer,
  StyledUpliftSkeleton,
  StyledUpliftTitle,
} from './SimulatorOutputSection.styles';

const SimulatorOutputSection = forwardRef(({ isLoading, outputData }, ref) => {
  const renderUplift = (name, value) => {
    return (
      <StyledUpliftContentContainer>
        <StyledUpliftTitle>{name}</StyledUpliftTitle>
        {isLoading ? (
          <StyledUpliftSkeleton variant='rectangular' width={85} height={20} />
        ) : (
          <StyledUpliftAmount>{value}</StyledUpliftAmount>
        )}
      </StyledUpliftContentContainer>
    );
  };
  return (
    <StyledContainer ref={ref}>
      <StyledTitle>
        Estimated annual budget we will deploy from card issuers:
      </StyledTitle>
      <StyledBudgetSummaryContainer>
        {isLoading ? (
          <StyledBudgetTotalSkeleton
            variant='rectangular'
            width={260}
            height={50}
          />
        ) : (
          <StyledBudgetTotal>
            {outputData?.estimatedAnnualBudget}
          </StyledBudgetTotal>
        )}
        {isLoading ? (
          <StyledBudgetMonthlySkeleton
            variant='rectangular'
            width={190}
            height={20}
          />
        ) : (
          <StyledBudgetMonthly>
            {outputData?.estimatedAnnualBudgetPerMonth}/month
          </StyledBudgetMonthly>
        )}
      </StyledBudgetSummaryContainer>
      <StyledUpliftContainer>
        {renderUplift('Conversion uplift', outputData?.conversionUplift)}
        {renderUplift('AOV uplift', outputData?.aovUplift)}
        {renderUplift('Sales uplift', outputData?.salesUplift)}
      </StyledUpliftContainer>
    </StyledContainer>
  );
});

SimulatorOutputSection.displayName = 'SimulatorOutputSection';

export default SimulatorOutputSection;
