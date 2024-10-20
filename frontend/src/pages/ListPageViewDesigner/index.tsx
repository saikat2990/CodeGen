import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import ListViewDesignerPage from './Designer';
import ListViewPage from './View';
import { useMoodToggle } from '@/hooks/useMoodToggle';

const ListPage = () => {
  const { mood } = useMoodToggle();

  return (
    <div>
      {mood === 'zen' ? <ListViewDesignerPage /> : <ListViewPage />}
    </div>
  );
};

export default ListPage;
