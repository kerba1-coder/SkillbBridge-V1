/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { Explore } from './pages/Explore';
import { Projects } from './pages/Projects';
import { Passport } from './pages/Passport';
import { Insights } from './pages/Insights';
import { Scoping } from './pages/Scoping';
import { ScopingReview } from './pages/ScopingReview';
import { Dispute } from './pages/Dispute';
import { GigDetails } from './pages/GigDetails';
import { ApplicationFlow } from './pages/ApplicationFlow';
import { ApplicationStatus } from './pages/ApplicationStatus';
import { ProjectDashboard } from './pages/ProjectDashboard';
import { LearnerHealth } from './pages/LearnerHealth';
import { SkillOpportunities } from './pages/SkillOpportunities';
import { MarketRegistry } from './pages/MarketRegistry';
import { ActiveProjects } from './pages/ActiveProjects';
import { PosterDashboard } from './pages/PosterDashboard';
import { AIGuidance } from './pages/AIGuidance';

const AuthenticatedApp = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-secondary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<div className="flex-1 animate-pulse bg-surface-container rounded-3xl h-96"></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/passport" element={<Passport />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/scoping" element={<Scoping />} />
            <Route path="/scoping/review" element={<ScopingReview />} />
            <Route path="/dispute" element={<Dispute />} />
            <Route path="/gig/:id" element={<GigDetails />} />
            <Route path="/gig/:id/apply" element={<ApplicationFlow />} />
            <Route path="/application/:id/status" element={<ApplicationStatus />} />
            <Route path="/application/:id/dashboard" element={<ProjectDashboard />} />
            <Route path="/health" element={<LearnerHealth />} />
            <Route path="/opportunities/:skillName" element={<SkillOpportunities />} />
            <Route path="/registry" element={<MarketRegistry />} />
            <Route path="/active-projects" element={<ActiveProjects />} />
            <Route path="/poster-dashboard" element={<PosterDashboard />} />
            <Route path="/ai-guidance" element={<AIGuidance />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}
