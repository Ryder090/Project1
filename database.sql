CREATE TABLE public.audits (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL,
    company_name TEXT,
    form_data JSONB NOT NULL,
    results JSONB NOT NULL,
    ai_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);


ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.audits FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous reads" ON public.audits FOR SELECT TO anon USING (true);
