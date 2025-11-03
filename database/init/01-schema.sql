-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    preferences JSONB DEFAULT '{}',
    current_tech_stack TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job listings table
CREATE TABLE IF NOT EXISTS job_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_url TEXT NOT NULL,
    title VARCHAR(500) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    description_text TEXT,
    required_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    preferred_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
    salary_min INTEGER,
    salary_max INTEGER,
    description_embedding vector(384), -- Embedding dimension for all-MiniLM-L6-v2
    posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES job_listings(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'interested', -- interested, applied, interviewing, offer, rejected
    application_date TIMESTAMP,
    deadline TIMESTAMP,
    notes TEXT,
    outcome TEXT,
    shortcomings TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skill topics table
CREATE TABLE IF NOT EXISTS skill_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    topic_name VARCHAR(255) NOT NULL,
    source_job_id UUID REFERENCES job_listings(id) ON DELETE SET NULL,
    is_mastered BOOLEAN DEFAULT FALSE,
    progress INTEGER DEFAULT 0, -- 0-100
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Study content table
CREATE TABLE IF NOT EXISTS study_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID REFERENCES skill_topics(id) ON DELETE CASCADE,
    interview_q_a JSONB, -- Array of {question, answer}
    explanations_text TEXT,
    examples_code TEXT,
    embedding vector(384),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat history table
CREATE TABLE IF NOT EXISTS chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES skill_topics(id) ON DELETE CASCADE,
    message_role VARCHAR(20) NOT NULL, -- user, ai
    message_text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_listings_posted_date ON job_listings(posted_date DESC);
CREATE INDEX IF NOT EXISTS idx_job_listings_company ON job_listings(company);
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_skill_topics_user_id ON skill_topics(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_topic_id ON chat_history(topic_id);

-- Vector similarity search index (IVFFlat for faster searches)
CREATE INDEX IF NOT EXISTS idx_job_listings_embedding ON job_listings USING ivfflat (description_embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_study_content_embedding ON study_content USING ivfflat (embedding vector_cosine_ops);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skill_topics_updated_at BEFORE UPDATE ON skill_topics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional, for development)
INSERT INTO users (email, password_hash, name, current_tech_stack) VALUES
    ('demo@example.com', '$2b$10$rKYW3.kB5Zx7.J6lW5M5qeU3FJ5KQZXJ9X7Z.K5M5qeU3FJ5KQZXJ', 'Demo User', ARRAY['JavaScript', 'React', 'Node.js', 'Python'])
ON CONFLICT (email) DO NOTHING;
