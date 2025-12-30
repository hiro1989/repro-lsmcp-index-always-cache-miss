# repro-lsmcp-index-always-cache-miss

Repro for [lsmcp indexing always results in cache miss since tsgo 7.0.0-dev.20251119.1 · Issue #78 · mizchi/lsmcp](https://github.com/mizchi/lsmcp/issues/78)

## Conclusion

- In tsgo ver. `7.0.0-dev.20251118.1`, lsmcp indexing works as expected.
- In tsgo ver. `7.0.0-dev.20251119.1` or later, lsmcp indexing always results in cache miss and no symbols are indexed.
  - Also, it seems that the processing takes much longer.
- I tried several versions as follows and confirmed success or failure as follows.
  - `7.0.0-dev.20251101.1`: ✅ Success
  - `7.0.0-dev.20251115.1`: ✅ Success
  - `7.0.0-dev.20251118.1`: ✅ Success
  - `7.0.0-dev.20251119.1`: ❌ Failure
  - `7.0.0-dev.20251120.1`: ❌ Failure
  - `7.0.0-dev.20251201.1`: ❌ Failure
  - `7.0.0-dev.20251228.1`: ❌ Failure
- Therefore, I think the boundary between success and failure lies between `7.0.0-dev.20251118.1` and `7.0.0-dev.20251119.1`.

### Workaround

- Use tsgo version `7.0.0-dev.20251118.1`.

## Setup and Available Scripts

```sh
# Install dependencies
pnpm i

# Run type check
pnpm tsgo

# Run lsmcp index
pnpm lsmcp-index

# Read the indexed results (.lsmcp/cache/symbols.db)
pnpm read-symbols-db
```

## Repro

### ✅ "@typescript/native-preview": "7.0.0-dev.20251118.1" (The latest version where indexing succeeds)

**1st time index (when `symbols.db` does not exist)**

```sh
# Run lsmcp index (FYI: It took 0m 13s)
$ pnpm lsmcp-index

> repro-lsmcp-index-always-cache-miss@1.0.0 lsmcp-index /Users/biz/work/study/repro-lsmcp-index-always-cache-miss
> tsgo -v && lsmcp index

Version 7.0.0-dev.20251118.1
Indexing files...
Patterns: **/*.ts, **/*.tsx, **/*.d.ts
(node:68703) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Found 2 files to index
Starting tsgo for indexing...
No existing cache found. Performing full index...

✅ Full indexing complete in 226ms
   Total files: 2
   Total symbols: 1

✓ LSP server stopped

# Read the indexed results
$ pnpm read-symbols-db

> repro-lsmcp-index-always-cache-miss@1.0.0 read-symbols-db /Users/biz/work/study/repro-lsmcp-index-always-cache-miss
> tsx ./src/read-symbols-db.ts

Found 1 rows in symbols table:

Row 1: {
  id: 1,
  filePath: 'src/index.ts',
  namePath: 'Human',
  kind: 5,
  containerName: null,
  startLine: 0,
  startCharacter: 0,
  endLine: 3,
  endCharacter: 2,
  lastModified: 1767061696767.3486,
  projectRoot: '/Users/biz/work/study/repro-lsmcp-index-always-cache-miss'
}
```

**2nd time index (when `symbols.db` exists)**

```sh
# Run lsmcp index (FYI: It took 0m 12s)
$ pnpm lsmcp-index

> repro-lsmcp-index-always-cache-miss@1.0.0 lsmcp-index /Users/biz/work/study/repro-lsmcp-index-always-cache-miss
> tsgo -v && lsmcp index

Version 7.0.0-dev.20251118.1
Indexing files...
Patterns: **/*.ts, **/*.tsx, **/*.d.ts
(node:74319) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Found 2 files to index
Starting tsgo for indexing...
Performing incremental update...

✅ Incremental update complete in 19ms
   Total files: 1
   Total symbols: 1

⚠️  1 files had errors:
   - incremental: No previous git hash found

✓ LSP server stopped

# Read the indexed results
$ pnpm read-symbols-db

> repro-lsmcp-index-always-cache-miss@1.0.0 read-symbols-db /Users/biz/work/study/repro-lsmcp-index-always-cache-miss
> tsx ./src/read-symbols-db.ts

Found 1 rows in symbols table:

Row 1: {
  id: 1,
  filePath: 'src/index.ts',
  namePath: 'Human',
  kind: 5,
  containerName: null,
  startLine: 0,
  startCharacter: 0,
  endLine: 3,
  endCharacter: 2,
  lastModified: 1767061696767.3486,
  projectRoot: '/Users/biz/work/study/repro-lsmcp-index-always-cache-miss'
}
```

### ❌ "@typescript/native-preview": "7.0.0-dev.20251228.1" (Latest as of 2025-12-29)

**1st time index (when `symbols.db` does not exist)**

```sh
# Run lsmcp index (FYI: It took 1m 12s)
$ pnpm lsmcp-index

> repro-lsmcp-index-always-cache-miss@1.0.0 lsmcp-index /Users/biz/work/study/repro-lsmcp-index-always-cache-miss
> tsgo -v && lsmcp index

Version 7.0.0-dev.20251228.1
Indexing files...
Patterns: **/*.ts, **/*.tsx, **/*.d.ts
(node:58983) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Found 2 files to index
Starting tsgo for indexing...
No existing cache found. Performing full index...

✅ Full indexing complete in 30227ms
   Total files: 0
   Total symbols: 0

✓ LSP server stopped

# Read the indexed results
$ pnpm read-symbols-db

> repro-lsmcp-index-always-cache-miss@1.0.0 read-symbols-db /Users/biz/work/study/repro-lsmcp-index-always-cache-miss
> tsx ./src/read-symbols-db.ts

Found 0 rows in symbols table:
```

**2nd time index (when `symbols.db` exists)**

```sh
# Run lsmcp index (FYI: It took 1m 12s)
$ pnpm lsmcp-index

> repro-lsmcp-index-always-cache-miss@1.0.0 lsmcp-index /Users/biz/work/study/repro-lsmcp-index-always-cache-miss
> tsgo -v && lsmcp index

Version 7.0.0-dev.20251228.1
Indexing files...
Patterns: **/*.ts, **/*.tsx, **/*.d.ts
(node:63393) ExperimentalWarning: SQLite is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Found 2 files to index
Starting tsgo for indexing...
No existing cache found. Performing full index...

✅ Full indexing complete in 30217ms
   Total files: 0
   Total symbols: 0

✓ LSP server stopped

# Read the indexed results
$ pnpm read-symbols-db

> repro-lsmcp-index-always-cache-miss@1.0.0 read-symbols-db /Users/biz/work/study/repro-lsmcp-index-always-cache-miss
> tsx ./src/read-symbols-db.ts

Found 0 rows in symbols table:
```
