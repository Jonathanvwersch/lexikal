-- Create the match_chunks function for semantic similarity search
-- This must be created in Supabase
-- Create the match_chunks function for semantic similarity search
-- This must be created in Supabase
create or replace function match_chunks(
    query_embedding vector(1024),
    context_ids text[],
    match_threshold float default 0.5,
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
        1 - (chunks.embedding <=> query_embedding) as similarity
    from chunks
    where 
        chunks.context_id = any(context_ids::uuid[])
        and (1 - (chunks.embedding <=> query_embedding)) > match_threshold
    order by similarity desc
    limit match_count;
end;
$$;