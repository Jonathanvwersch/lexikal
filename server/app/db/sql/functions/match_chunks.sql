-- Create the match_chunks function for semantic similarity search
-- This must be created in Supabase
create or replace function match_chunks(
    query_embedding vector(1536),
    context_ids text[],
    match_threshold float default 0.78,
    match_count int default 5
)
returns table (
    id uuid,
    content text,
    context_id uuid,
    metadata jsonb,
    similarity float
)
language plpgsql
as $$
begin
    return query
    select 
        chunks.id,
        chunks.content,
        chunks.context_id,
        chunks.metadata,
        (chunks.embedding <=> query_embedding) as similarity
    from chunks
    where 
        chunks.context_id = any(context_ids::uuid[]) -- Casting text[] to uuid[]
        and (chunks.embedding <=> query_embedding) < 1 - match_threshold
    order by chunks.embedding <=> query_embedding
    limit least(match_count, 200);
end;
$$;


