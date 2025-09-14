// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { supabase } from '@/integrations/supabase/client';
// import JobRecommendations from './JobRecommendations';
// import CareerRoadmap from './CareerRoadmap';
// import {
//   Trophy,
//   TrendingUp,
//   BookOpen,
//   Download,
//   RotateCcw,
//   Sparkles,
//   GraduationCap,
//   MapPin,
//   Star
// } from 'lucide-react';

// interface QuizResults {
//   topCategory: string;
//   scores: {
//     builder: number;
//     analyst: number;
//     creator: number;
//     helper: number;
//   };
// }

// interface QuizResultsProps {
//   results: QuizResults;
//   onStartOver: () => void;
//   onExploreCourses: () => void;
// }

// interface CareerPathway {
//   id: string;
//   pathway_name: string;
//   stream: string;
//   degree_program: string;
//   description: string;
//   duration: string;
//   immediate_jobs: any;
//   higher_studies: any;
//   govt_jobs: any;
//   roadmap_steps: any;
//   cluster_id?: string;
//   colleges?: any;
//   created_at?: string;
// }

// interface CareerCluster {
//   name: string;
//   description: string;
//   icon: any;
//   color: string;
//   streams: string[];
//   careers: string[];
//   colleges: string[];
// }

// const careerClusters: Record<string, CareerCluster> = {
//   builder: {
//     name: "The Builder",
//     description: "You love creating tangible solutions and leading projects to completion",
//     icon: Trophy,
//     color: "from-orange-500 to-red-500",
//     streams: ["Science (PCM)", "Commerce", "Vocational"],
//     careers: ["Engineer", "Architect", "Project Manager", "Entrepreneur", "Civil Services"],
//     colleges: ["Govt. Engineering College", "Polytechnic Institute", "Commerce College"]
//   },
//   analyst: {
//     name: "The Analyst",
//     description: "You excel at problem-solving and working with data and systems",
//     icon: BookOpen,
//     color: "from-blue-500 to-purple-500",
//     streams: ["Science (PCM/PCB)", "Commerce with Math"],
//     careers: ["Data Scientist", "CA/CS", "Research Scientist", "Banking Professional", "Statistician"],
//     colleges: ["Science College", "Statistics Institute", "Commerce College"]
//   },
//   creator: {
//     name: "The Creator",
//     description: "You bring imagination to life through art, design, and innovation",
//     icon: Sparkles,
//     color: "from-pink-500 to-violet-500",
//     streams: ["Arts", "Fine Arts", "Mass Communication"],
//     careers: ["Graphic Designer", "Writer", "Filmmaker", "Marketing Professional", "Teacher"],
//     colleges: ["Arts College", "Fine Arts Institute", "Mass Comm College"]
//   },
//   helper: {
//     name: "The Helper",
//     description: "You find fulfillment in supporting and caring for others",
//     icon: GraduationCap,
//     color: "from-green-500 to-teal-500",
//     streams: ["Arts", "Science (PCB)", "Social Work"],
//     careers: ["Doctor", "Psychologist", "Social Worker", "Counselor", "Public Administration"],
//     colleges: ["Medical College", "Arts College", "Social Work Institute"]
//   }
// };

// const QuizResults: React.FC<QuizResultsProps> = ({ results, onStartOver, onExploreCourses }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [animationStep, setAnimationStep] = useState(0);
//   const [careerPathways, setCareerPathways] = useState<CareerPathway[]>([]);
//   const [selectedPathway, setSelectedPathway] = useState<CareerPathway | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setIsVisible(true);
//     const timer = setInterval(() => {
//       setAnimationStep(prev => (prev + 1) % 4);
//     }, 800);

//     fetchCareerPathways();

//     return () => clearInterval(timer);
//   }, [results.topCategory]);

//   const fetchCareerPathways = async () => {
//     try {
//       setLoading(true);

//       // Get cluster ID for the top category
//       const { data: clusters } = await supabase
//         .from('career_clusters')
//         .select('id')
//         .eq('name', results.topCategory.charAt(0).toUpperCase() + results.topCategory.slice(1))
//         .single();

//       if (clusters) {
//         // Fetch pathways for this cluster
//         const { data: pathways } = await supabase
//           .from('career_pathways')
//           .select('*')
//           .eq('cluster_id', clusters.id);

//         if (pathways) {
//           setCareerPathways(pathways as CareerPathway[]);
//           setSelectedPathway(pathways[0] as CareerPathway || null);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching career pathways:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cluster = careerClusters[results.topCategory];
//   const secondaryScores = Object.entries(results.scores)
//     .filter(([key]) => key !== results.topCategory)
//     .sort(([,a], [,b]) => (b as number) - (a as number))
//     .slice(0, 2);

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className={`text-center mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
//           <div className="inline-flex items-center space-x-2 mb-4">
//             <Sparkles className="w-8 h-8 text-primary animate-glow-pulse" />
//             <span className="text-lg text-muted-foreground">Your Results Are Ready!</span>
//           </div>
//           <h1 className="text-5xl font-bold text-gradient mb-4">
//             Amazing Discovery!
//           </h1>
//           <p className="text-xl text-muted-foreground">
//             Here's what we learned about your unique talents
//           </p>
//         </div>

//         {/* Main Result Card */}
//         <Card className={`glass-card p-8 mb-8 ${animationStep >= 1 ? 'animate-scale-in' : 'opacity-0'}`}>
//           <div className="text-center mb-8">
//             <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${cluster.color} flex items-center justify-center animate-glow-pulse shadow-float`}>
//               <cluster.icon className="w-12 h-12 text-white" />
//             </div>

//             <h2 className="text-4xl font-bold text-gradient mb-4">
//               You are {cluster.name}!
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//               {cluster.description}
//             </p>
//           </div>

//           {/* Personality Breakdown */}
//           <div className="grid md:grid-cols-3 gap-6 mb-8">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-primary mb-2">
//                 {Math.round((results.scores[results.topCategory] / 5) * 100)}%
//               </div>
//               <div className="text-sm text-muted-foreground">Primary Match</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-accent mb-2">
//                 {cluster.careers.length}+
//               </div>
//               <div className="text-sm text-muted-foreground">Career Paths</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-secondary mb-2">
//                 {cluster.colleges.length}+
//               </div>
//               <div className="text-sm text-muted-foreground">College Types</div>
//             </div>
//           </div>
//         </Card>

//         {/* Recommended Streams */}
//         <Card className={`glass-card p-8 mb-8 ${animationStep >= 2 ? 'animate-slide-up' : 'opacity-0'}`}>
//           <h3 className="text-2xl font-bold text-gradient mb-6 flex items-center">
//             <TrendingUp className="w-6 h-6 mr-2" />
//             Recommended Streams for You
//           </h3>
//           <div className="grid md:grid-cols-3 gap-4">
//             {cluster.streams.map((stream, index) => (
//               <div key={index} className="quiz-option p-4" style={{ animationDelay: `${index * 0.1}s` }}>
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium">{stream}</span>
//                   <Star className="w-4 h-4 text-primary" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Career Pathways Selection */}
//         {!loading && careerPathways.length > 0 && (
//           <div className="mt-8">
//             <h3 className="text-xl font-semibold text-center mb-4 text-gradient">
//               🎯 Recommended Career Pathways
//             </h3>
//             <div className="flex flex-wrap justify-center gap-3 mb-6">
//               {careerPathways.map((pathway) => (
//                 <Button
//                   key={pathway.id}
//                   variant={selectedPathway?.id === pathway.id ? "default" : "outline"}
//                   onClick={() => setSelectedPathway(pathway)}
//                   className="transition-all duration-300 hover:scale-105"
//                 >
//                   {pathway.pathway_name}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Job Recommendations and Roadmap */}
//         {selectedPathway && (
//           <div className="mt-8 space-y-8">
//             <JobRecommendations
//               immediateJobs={selectedPathway.immediate_jobs || {}}
//               higherStudies={selectedPathway.higher_studies || {}}
//               govtJobs={selectedPathway.govt_jobs || {}}
//               pathwayName={selectedPathway.pathway_name}
//             />

//             <CareerRoadmap
//               steps={Array.isArray(selectedPathway.roadmap_steps) ? selectedPathway.roadmap_steps : []}
//               pathwayName={selectedPathway.pathway_name}
//             />
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
//           <Button
//             onClick={onExploreCourses}
//             className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-lg transform hover:scale-105 transition-all duration-300"
//             size="lg"
//           >
//             <MapPin className="w-5 h-5 mr-2" />
//             Explore Courses
//           </Button>

//           <Button
//             variant="outline"
//             className="border-primary/30 hover:bg-primary/10 shadow-md transform hover:scale-105 transition-all duration-300"
//             size="lg"
//           >
//             <Download className="w-5 h-5 mr-2" />
//             Download Report
//           </Button>

//           <Button
//             onClick={onStartOver}
//             variant="secondary"
//             className="shadow-md transform hover:scale-105 transition-all duration-300"
//             size="lg"
//           >
//             <RotateCcw className="w-5 h-5 mr-2" />
//             Take Quiz Again
//           </Button>
//         </div>

//         {/* Encouraging Message */}
//         <div className="text-center mt-8 p-6 bg-gradient-to-r from-success/10 to-primary/10 rounded-2xl border border-success/20">
//           <Sparkles className="w-8 h-8 text-success mx-auto mb-3" />
//           <p className="text-lg font-medium text-success mb-2">
//             Your journey to success starts here! 🚀
//           </p>
//           <p className="text-muted-foreground">
//             Remember, every expert was once a beginner. Take the first step with confidence!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizResults;
// QuizResults.tsx
// QuizResults.tsx
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import JobRecommendations from "./JobRecommendations";
import CareerRoadmap from "./CareerRoadmap";
import {
  Trophy,
  TrendingUp,
  BookOpen,
  RotateCcw,
  Sparkles,
  GraduationCap,
  MapPin,
  Download,
} from "lucide-react";

/**
 * QuizResults.tsx — Updated
 *
 * - Fetches cluster info and candidate career_pathways from Supabase
 *   based on the quiz results (results.topCategory + inferred keywords).
 * - Primary strategy:
 *   1) fetch cluster by name (e.g. "Helper" for topCategory "helper")
 *   2) fetch career_pathways where cluster_id = cluster.id (best results)
 *   3) if not enough results, look for overlaps on tags/streams
 *   4) fallback to text search on name/description
 *   5) if nothing found, generate friendly fallback pathways (local)
 *
 * - Keeps hero animation visible (mounted state) and does not re-hide it.
 *
 * Note: This file assumes your `career_clusters` and `career_pathways`
 * tables exist and are populated as discussed. Adjust column names if your
 * schema differs.
 */

/* ---------------------- Types ---------------------- */
type QuizResultsShape = {
  topCategory: "builder" | "analyst" | "creator" | "helper" | string;
  scores: Record<string, number>;
};

type QuizResultsProps = {
  results: QuizResultsShape;
  onStartOver: () => void;
  onExploreCourses: () => void;
  userId?: string | null;
};

type CareerPathwayRow = {
  id?: string;
  cluster_id?: string | null;
  pathway_name?: string;
  description?: string;
  stream?: string | null;
  streams?: string[]; // sometimes stored as array
  tags?: string[]; // optional
  degree_program?: string | null;
  duration?: string | null;
  immediate_jobs?: any;
  higher_studies?: any;
  govt_jobs?: any;
  roadmap_steps?: any;
  colleges?: any;
};

/* ---------------------- Local fallback clusters (for copy & UI) ---------------------- */
const careerClustersLocal: Record<
  string,
  {
    name: string;
    description: string;
    icon: any;
    color: string;
    streams: string[];
    careers: string[];
    colleges: string[];
    exampleTags?: string[];
  }
> = {
  builder: {
    name: "The Builder",
    description:
      "You love creating tangible solutions and leading projects to completion.",
    icon: Trophy,
    color: "from-orange-500 to-red-500",
    streams: ["Science (PCM)", "Commerce", "Vocational"],
    careers: ["Engineer", "Architect", "Project Manager"],
    colleges: ["Govt. Engineering College", "Polytechnic Institute"],
    exampleTags: ["engineering", "mechanical", "civil"],
  },
  analyst: {
    name: "The Analyst",
    description:
      "You excel at problem-solving and working with data and systems.",
    icon: BookOpen,
    color: "from-blue-500 to-purple-500",
    streams: ["Science (PCM)", "Science (PCB)", "Commerce with Math"],
    careers: ["Data Scientist", "CA/CS", "Research Scientist"],
    colleges: ["Science College", "Statistics Institute"],
    exampleTags: ["data", "analytics", "finance"],
  },
  creator: {
    name: "The Creator",
    description:
      "You bring imagination to life through art, design, and innovation.",
    icon: Sparkles,
    color: "from-pink-500 to-violet-500",
    streams: ["Arts", "Design", "Mass Communication"],
    careers: ["Graphic Designer", "Writer", "Filmmaker"],
    colleges: ["Arts College", "Fine Arts Institute"],
    exampleTags: ["design", "art", "creative"],
  },
  helper: {
    name: "The Helper",
    description: "You find fulfillment in supporting and caring for others.",
    icon: GraduationCap,
    color: "from-green-500 to-teal-500",
    streams: ["Science (PCB)", "Nursing", "Social Work"],
    careers: ["Doctor", "Psychologist", "Social Worker"],
    colleges: ["Medical College", "Social Work Institute"],
    exampleTags: ["medical", "nursing", "psychology"],
  },
};

/* ---------------------- Helpers ---------------------- */

// Uppercase first letter: "helper" -> "Helper"
const clusterNameFromKey = (k: string) =>
  !k ? "" : k.charAt(0).toUpperCase() + k.slice(1).toLowerCase();

// build keywords from local cluster tags + category name
function extractKeywords(results: QuizResultsShape): string[] {
  const clusterKey = results.topCategory || "creator";
  const local = careerClustersLocal[clusterKey];
  const tags = local?.exampleTags || [];
  const combined = [clusterKey, ...tags];
  return Array.from(new Set(combined.map((t) => (t || "").toLowerCase())));
}

function generateFallbackPathways(clusterKey: string): CareerPathwayRow[] {
  const local =
    careerClustersLocal[clusterKey] || careerClustersLocal["creator"];
  const out: CareerPathwayRow[] = [];
  for (let i = 0; i < 3; i++) {
    const career = local.careers[i % local.careers.length];
    const stream = local.streams[i % local.streams.length];
    out.push({
      pathway_name: `${career} — ${stream}`,
      description: `${local.description} Path to become a ${career} (focus: ${stream}).`,
      streams: [stream],
      tags: local.exampleTags || [],
      immediate_jobs: {
        title: "Immediate Jobs",
        items: [{ title: `${career} (entry)`, salary: "Varies", skills: [] }],
      },
      higher_studies: {
        title: "Higher Studies",
        items: [{ title: "Relevant masters / pro degrees" }],
      },
      govt_jobs: { title: "Government Opportunities", items: [] },
      roadmap_steps: [
        {
          step: 1,
          title: "Choose stream",
          duration: "1 year",
          detail: "Focus fundamentals",
        },
        {
          step: 2,
          title: "Undergrad / Diploma",
          duration: "2-4 years",
          detail: "Specialize & projects",
        },
        {
          step: 3,
          title: "Internships & jobs",
          duration: "6-12 months",
          detail: "Gain experience",
        },
      ],
    });
  }
  return out;
}

/* ---------------------- Core DB fetch logic ---------------------- */
async function fetchPathwaysFromDB(results: QuizResultsShape, maxResults = 6) {
  const clusterName = clusterNameFromKey(results.topCategory);
  const keywords = extractKeywords(results);

  try {
    // 1) attempt to load the cluster row
    const { data: clusterRows } = await supabase
      .from("career_clusters")
      .select("*")
      .ilike("name", clusterName) // case-insensitive match
      .limit(1);

    const cluster = (clusterRows && clusterRows[0]) || null;
    const candidates: CareerPathwayRow[] = [];

    // 2) if we have a cluster, fetch pathways for it (best match)
    if (cluster?.id) {
      const { data: clusterPaths } = await supabase
        .from("career_pathways")
        .select("*")
        .eq("cluster_id", cluster.id)
        .limit(maxResults);
      if (clusterPaths && clusterPaths.length) {
        candidates.push(...(clusterPaths as CareerPathwayRow[]));
      }
    }

    // 3) If not enough, try tag overlap (if tags column exists). This query will silently fail if tags doesn't exist,
    //    so we wrap in try/catch and continue to next strategy on failure.
    if (candidates.length < 4) {
      try {
        const { data: tagMatches } = await supabase
          .from("career_pathways")
          .select("*")
          .overlaps("tags", keywords)
          .limit(100);
        if (tagMatches && tagMatches.length) {
          // push unique
          const seen = new Set(candidates.map((c) => c.id));
          for (const r of tagMatches as CareerPathwayRow[]) {
            if (!seen.has(r.id)) {
              candidates.push(r);
              seen.add(r.id);
            }
          }
        }
      } catch (e) {
        // likely column 'tags' doesn't exist or DB didn't allow overlaps — ignore and continue
        // console.warn("tags overlap failed", e);
      }
    }

    // 4) If still not enough, try streams overlap (if 'streams' is an array column)
    if (candidates.length < 4) {
      try {
        const { data: streamMatches } = await supabase
          .from("career_pathways")
          .select("*")
          .overlaps("streams", keywords)
          .limit(100);
        if (streamMatches && streamMatches.length) {
          const seen = new Set(candidates.map((c) => c.id));
          for (const r of streamMatches as CareerPathwayRow[]) {
            if (!seen.has(r.id)) {
              candidates.push(r);
              seen.add(r.id);
            }
          }
        }
      } catch (e) {
        // ignore and continue
        // console.warn("streams overlap failed", e);
      }
    }

    // 5) If still not enough, fallback to simple text search (name/description)
    if (candidates.length < maxResults) {
      // build small OR query using first few keywords
      const kw = keywords.slice(0, 6);
      const orClauses = kw
        .map((k) => `pathway_name.ilike.%${k}%`)
        .concat(kw.map((k) => `description.ilike.%${k}%`))
        .join(",");
      if (orClauses.length) {
        try {
          const { data: textMatches } = await supabase
            .from("career_pathways")
            .select("*")
            .or(orClauses)
            .limit(200);
          if (textMatches && textMatches.length) {
            const seen = new Set(candidates.map((c) => c.id));
            for (const t of textMatches as CareerPathwayRow[]) {
              if (!seen.has(t.id)) {
                candidates.push(t);
                seen.add(t.id);
              }
            }
          }
        } catch (e) {
          // ignore and continue
          // console.warn("text match failed", e);
        }
      }
    }

    // 6) Deduplicate and return up to maxResults
    const unique: CareerPathwayRow[] = [];
    const seenIds = new Set<string | undefined>();
    for (const c of candidates) {
      const key = c.id || c.pathway_name;
      if (!key) continue;
      if (seenIds.has(key)) continue;
      seenIds.add(key);
      unique.push(c);
      if (unique.length >= maxResults) break;
    }

    if (unique.length > 0) return unique;

    // 7) final fallback — local generated pathways
    return generateFallbackPathways(results.topCategory);
  } catch (err) {
    console.error("fetchPathwaysFromDB error:", err);
    return generateFallbackPathways(results.topCategory);
  }
}

/* ---------------------- Component ---------------------- */
const QuizResults: React.FC<QuizResultsProps> = ({
  results,
  onStartOver,
  onExploreCourses,
}) => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pathways, setPathways] = useState<CareerPathwayRow[]>([]);
  const [selected, setSelected] = useState<CareerPathwayRow | null>(null);

  useEffect(() => {
    // keep hero animation visible once (do not hide after)
    setMounted(true);

    let alive = true;
    (async () => {
      setLoading(true);
      const fetched = await fetchPathwaysFromDB(results, 6);
      if (!alive) return;
      setPathways(fetched);
      setSelected(fetched && fetched.length ? fetched[0] : null);
      setLoading(false);
    })();

    return () => {
      alive = false;
    };
    // run when results.topCategory changes (new quiz)
  }, [results.topCategory]);

  const clusterLocal =
    careerClustersLocal[results.topCategory] || careerClustersLocal["creator"];

  const primaryPercent = Math.round(
    ((results.scores?.[results.topCategory] ?? 3) / 5) * 100
  );

  return (
    <div className="min-h-screen p-6 bg-[#070712]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            <span className="text-lg text-slate-400">
              Your Results Are Ready!
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Amazing Discovery!
          </h1>
          <p className="text-lg text-slate-300">
            Here's what we learned about your unique talents
          </p>
        </div>

        {/* Main Card */}
        <Card className="glass-card p-6 mb-6">
          <div className="text-center mb-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-indigo-700/80 flex items-center justify-center">
              <clusterLocal.icon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-1">
              You are {clusterLocal.name}!
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {clusterLocal.description}
            </p>
          </div>

          {/* quick stats */}
          <div className="grid grid-cols-3 gap-4 text-center mt-6">
            <div>
              <div className="text-2xl font-bold text-indigo-400">
                {primaryPercent}%
              </div>
              <div className="text-sm text-slate-400">Primary Match</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">
                {clusterLocal.careers.length}+
              </div>
              <div className="text-sm text-slate-400">Career Paths</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-violet-400">
                {clusterLocal.colleges.length}+
              </div>
              <div className="text-sm text-slate-400">College Types</div>
            </div>
          </div>
        </Card>

        {/* Streams */}
        <Card className="glass-card p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" /> Recommended Streams for You
          </h3>
          <div className="flex flex-wrap gap-3">
            {clusterLocal.streams.map((s, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/6 rounded-full text-sm text-white"
              >
                {s}
              </span>
            ))}
          </div>
        </Card>

        {/* Pathway selectors */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white text-center mb-4">
            🎯 Recommended Career Pathways
          </h3>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {loading && (
              <div className="text-slate-400">Loading suggestions…</div>
            )}
            {!loading &&
              pathways.map((p, idx) => (
                <Button
                  key={p.id || p.pathway_name || idx}
                  variant={
                    selected?.pathway_name === p.pathway_name
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setSelected(p)}
                  className="transition-transform hover:scale-105"
                >
                  {p.pathway_name}
                </Button>
              ))}
          </div>
        </div>

        {/* Details: Job recommendations + Roadmap */}
        {selected && (
          <div className="mt-8 space-y-8">
            <JobRecommendations
              immediateJobs={selected.immediate_jobs || {}}
              higherStudies={selected.higher_studies || {}}
              govtJobs={selected.govt_jobs || {}}
              pathwayName={selected.pathway_name || ""}
            />

            <CareerRoadmap
              steps={
                Array.isArray(selected.roadmap_steps)
                  ? selected.roadmap_steps
                  : []
              }
              pathwayName={selected.pathway_name || ""}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={() => onExploreCourses()}
            className="bg-indigo-600 hover:bg-indigo-700"
            size="lg"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Explore Courses
          </Button>

          <Button variant="outline" className="border-white/10" size="lg">
            <Download className="w-5 h-5 mr-2" />
            Download Report
          </Button>

          <Button onClick={onStartOver} variant="secondary" size="lg">
            <RotateCcw className="w-5 h-5 mr-2" />
            Take Quiz Again
          </Button>
        </div>

        {/* Encouraging message */}
        <div className="text-center mt-8 p-6 bg-white/5 rounded-2xl border border-white/6">
          <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <p className="text-lg font-medium text-white mb-2">
            Your journey to success starts here! 🚀
          </p>
          <p className="text-slate-300">
            Remember, every expert was once a beginner. Take the first step with
            confidence!
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
