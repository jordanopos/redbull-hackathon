"use client";

import React from 'react';
import { BarChart } from './ui/bar-chart';
import { PieChart } from './ui/pie-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

// Dummy data for the charts
const satisfactionData = [
  { name: 'Very Satisfied', value: 42 },
  { name: 'Satisfied', value: 28 },
  { name: 'Neutral', value: 15 },
  { name: 'Dissatisfied', value: 10 },
  { name: 'Very Dissatisfied', value: 5 },
];

const feedbackCategoryData = [
  { name: 'Mentorship', value: 35 },
  { name: 'Resources', value: 25 },
  { name: 'Organization', value: 20 },
  { name: 'Challenges', value: 15 },
  { name: 'Other', value: 5 },
];

export function FeedbackCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Participant Satisfaction</CardTitle>
          <CardDescription>Overall satisfaction ratings from participants</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart 
            data={satisfactionData} 
            height={280}
            colors={["#ffbd00"]}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Feedback Categories</CardTitle>
          <CardDescription>Distribution of feedback by category</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <PieChart 
            data={feedbackCategoryData} 
            height={280}
            innerRadius={60}
            outerRadius={90}
            colors={["#ffbd00", "#ffcf40", "#ffd966", "#ffe699", "#fff2cc"]}
          />
        </CardContent>
      </Card>
    </div>
  );
} 