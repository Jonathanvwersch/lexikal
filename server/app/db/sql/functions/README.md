# SQL Functions

This directory contains SQL functions used in the application.

## match_chunks

Located in `match_chunks.sql`

Purpose: Performs semantic similarity search on document chunks using pgvector.

Parameters:

- query_embedding: vector(1536) - The embedding vector to search against
- context_ids: text[] - Array of context IDs to search within
- match_threshold: float (default: 0.78) - Similarity threshold for matches
- match_count: int (default: 5) - Maximum number of matches to return

Returns:

- id: bigint - Chunk ID
- content: text - Chunk content
- context_id: text - Associated context ID
- metadata: jsonb - Chunk metadata
- similarity: float - Similarity score
