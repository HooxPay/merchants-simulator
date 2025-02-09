import { forwardRef } from 'react';

import {
  StyledBudgetMonthly,
  StyledBudgetMonthlySkeleton,
  StyledBudgetSummaryContainer,
  StyledBudgetTotal,
  StyledBudgetTotalSkeleton,
  StyledContainer,
  StyledTitle,
  StyledUpliftAmount,
  StyledUpliftContainer,
  StyledUpliftContentContainer,
  StyledUpliftSkeleton,
  StyledUpliftTitle,
} from './SimulatorOutputSection.styles';

const SimulatorOutputSection = forwardRef(
  ({ isLoading, outputData}, ref) => {
    const renderUplift = (name, value) => {
      return (
        <StyledUpliftContentContainer>
          <StyledUpliftTitle>{name}</StyledUpliftTitle>
          {isLoading ? (
            <StyledUpliftSkeleton
              variant='rectangular'
              width={70}
              height={20}
            />
          ) : (
            <StyledUpliftAmount>{value}</StyledUpliftAmount>
          )}
        </StyledUpliftContentContainer>
      );
    };
    return (
      <StyledContainer ref={ref}>
        <StyledTitle>
          Estimated annual Sales Uplift:
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
              {outputData?.estimatedAnnualSalesUplift || 0}
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
              {outputData?.estimatedAnnualSalesUpliftPerMonth || 0}/month
            </StyledBudgetMonthly>
          )}
        </StyledBudgetSummaryContainer>
        <StyledUpliftContainer>
          {renderUplift('Conversion uplift', outputData?.conversionUplift || 0)}
          {renderUplift('AOV uplift', outputData?.aovUplift || 0)}
          {renderUplift('Sponsored by issuers', outputData?.sponseredByIssuer || 0)}
        </StyledUpliftContainer>
      </StyledContainer>
    );
  }
);

SimulatorOutputSection.displayName = 'SimulatorOutputSection';

export default SimulatorOutputSection;
