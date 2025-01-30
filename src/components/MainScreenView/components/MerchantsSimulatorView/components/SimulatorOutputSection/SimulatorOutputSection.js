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
  ({ isLoading, outputData, isEmailImage = false }, ref) => {
    const renderUplift = (name, value) => {
      return (
        <StyledUpliftContentContainer>
          <StyledUpliftTitle>{name}</StyledUpliftTitle>
          {isLoading ? (
            <StyledUpliftSkeleton
              variant='rectangular'
              width={85}
              height={20}
            />
          ) : (
            <StyledUpliftAmount>{value}</StyledUpliftAmount>
          )}
        </StyledUpliftContentContainer>
      );
    };
    return (
      <StyledContainer ref={ref} isEmailImage={isEmailImage}>
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
              {outputData?.estimatedAnnualBudget || 0}
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
              {outputData?.estimatedAnnualBudgetPerMonth || 0}/month
            </StyledBudgetMonthly>
          )}
        </StyledBudgetSummaryContainer>
        <StyledUpliftContainer>
          {renderUplift('Conversion uplift', outputData?.conversionUplift || 0)}
          {renderUplift('AOV uplift', outputData?.aovUplift || 0)}
          {renderUplift('Sales uplift', outputData?.salesUplift || 0)}
        </StyledUpliftContainer>
      </StyledContainer>
    );
  }
);

SimulatorOutputSection.displayName = 'SimulatorOutputSection';

export default SimulatorOutputSection;
