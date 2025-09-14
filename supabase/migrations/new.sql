-- career_pathways table to store course/career options and metadata
create table if not exists career_pathways (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text,
  description text,
  streams text[],             -- e.g. {'Science (PCM)','Commerce'}
  tags text[],                -- keywords for matching e.g. {'engineering','tech','coding'}
  course_level text,          -- 'after_10th' | 'after_12th' | 'higher_studies'
  course_type text,           -- 'degree' | 'diploma' | 'certificate' etc
  duration text,
  entrance_exams jsonb,       -- { "JEE": "2025", "NEET": true } or array form
  specializations text[],
  immediate_jobs jsonb,
  higher_studies jsonb,
  roadmap_steps jsonb,        -- structured steps for roadmap (array of steps)
  created_at timestamptz default now()
);
