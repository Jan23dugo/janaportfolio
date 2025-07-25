import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent 
} from '@mui/material';
import { 
  TrendingUp, 
  Refresh, 
  Visibility, 
  CalendarToday, 
  DateRange, 
  BarChart as BarChartIcon 
} from '@mui/icons-material';
import styled from 'styled-components';

const AnalyticsSection = styled(Paper)`
  && {
    padding: 0;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    overflow: hidden;
  }
`;

const SectionHeader = styled(Box)`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(to right, #fafafa, #ffffff);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled(Typography)`
  && {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const MetricsContainer = styled(Box)`
  padding: 2rem;
`;

const AnalyticsCard = styled(Card)`
  && {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    transition: all 0.2s;
    cursor: default;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
  }
`;

const CardIconContainer = styled(Box)`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: linear-gradient(135deg, #D71768, #e91e63);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
`;

const MetricValue = styled(Typography)`
  && {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }
`;

const MetricLabel = styled(Typography)`
  && {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
  }
`;

const ChartSection = styled(Box)`
  padding: 2rem;
  border-top: 1px solid #e2e8f0;
`;

const ChartTitle = styled(Typography)`
  && {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1e293b;
  }
`;

const ChartContainer = styled(Box)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BarChart = styled(Box)`
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 120px;
  gap: 8px;
  width: 100%;
`;

const ChartBar = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Bar = styled(Box)`
  background: linear-gradient(135deg, #D71768, #e91e63);
  width: 100%;
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  transition: all 0.2s;
  
  &:hover {
    filter: brightness(1.1);
  }
`;

const DayLabel = styled(Typography)`
  && {
    margin-top: 8px;
    font-size: 0.75rem;
    color: #94a3b8;
  }
`;

const CountLabel = styled(Typography)`
  && {
    font-size: 0.7rem;
    color: #64748b;
    font-weight: 500;
  }
`;

const RefreshButton = styled(Button)`
  && {
    background: #64748b;
    color: white;
    text-transform: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-weight: 500;
    transition: all 0.2s;
    
    &:hover {
      background: #475569;
      transform: translateY(-1px);
    }
  }
`;

const EmptyState = styled(Box)`
  text-align: center;
  color: #94a3b8;
  padding: 2rem;
`;

const AnalyticsDashboard = ({ analytics = [], onRefresh }) => {
  // Calculate metrics
  const calculateMetrics = () => {
    if (!analytics || analytics.length === 0) {
      return {
        today: 0,
        week: 0,
        month: 0,
        total: 0
      };
    }

    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const todayData = analytics.find(item => item.date === today);
    const todayVisits = todayData ? todayData.visit_count : 0;

    const weekData = analytics.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= sevenDaysAgo;
    });
    const weekVisits = weekData.reduce((sum, item) => sum + item.visit_count, 0);

    const monthData = analytics.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= thirtyDaysAgo;
    });
    const monthVisits = monthData.reduce((sum, item) => sum + item.visit_count, 0);

    const totalVisits = analytics.reduce((sum, item) => sum + item.visit_count, 0);

    return {
      today: todayVisits,
      week: weekVisits,
      month: monthVisits,
      total: totalVisits
    };
  };

  const renderChart = () => {
    if (!analytics || analytics.length === 0) {
      return (
        <EmptyState>
          <Typography variant="body2">
            No analytics data available yet.
          </Typography>
        </EmptyState>
      );
    }

    // Get last 7 days of data
    const chartData = analytics.slice(0, 7).sort((a, b) => new Date(a.date) - new Date(b.date));
    const maxVisits = Math.max(...chartData.map(item => item.visit_count), 1);

    return (
      <BarChart>
        {chartData.map(item => {
          const height = (item.visit_count / maxVisits) * 100;
          const date = new Date(item.date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          return (
            <ChartBar key={item.date}>
              <Bar 
                style={{ height: `${height}%` }}
                title={`${item.visit_count} visits on ${item.date}`}
              />
              <DayLabel>{dayName}</DayLabel>
              <CountLabel>{item.visit_count}</CountLabel>
            </ChartBar>
          );
        })}
      </BarChart>
    );
  };

  const metrics = calculateMetrics();

  const metricsData = [
    {
      icon: <Visibility />,
      value: metrics.today.toLocaleString(),
      label: "Today's Visits"
    },
    {
      icon: <CalendarToday />,
      value: metrics.week.toLocaleString(),
      label: "This Week"
    },
    {
      icon: <DateRange />,
      value: metrics.month.toLocaleString(),
      label: "This Month"
    },
    {
      icon: <BarChartIcon />,
      value: metrics.total.toLocaleString(),
      label: "Total Visits"
    }
  ];

  return (
    <AnalyticsSection>
      <SectionHeader>
        <SectionTitle>
          <TrendingUp />
          Analytics
        </SectionTitle>
        <RefreshButton
          onClick={onRefresh}
          startIcon={<Refresh />}
        >
          Refresh
        </RefreshButton>
      </SectionHeader>

      <MetricsContainer>
        <Grid container spacing={3}>
          {metricsData.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <AnalyticsCard>
                <CardContent>
                  <CardIconContainer>
                    {metric.icon}
                  </CardIconContainer>
                  <MetricValue>{metric.value}</MetricValue>
                  <MetricLabel>{metric.label}</MetricLabel>
                </CardContent>
              </AnalyticsCard>
            </Grid>
          ))}
        </Grid>
      </MetricsContainer>

      <ChartSection>
        <ChartTitle>
          📊 Recent Activity (Last 7 Days)
        </ChartTitle>
        <ChartContainer>
          {renderChart()}
        </ChartContainer>
      </ChartSection>
    </AnalyticsSection>
  );
};

export default AnalyticsDashboard; 