# Crawl Path Blueprints

This repository contains tested crawl paths that can be used by neume network
users to cookie-cut an indexing strategy.

## Differences: Blueprints vs. Strategies

- A blueprint is a possible step in the neume network crawl path that invokes a
  strategy.
- A blueprint doesn't use any third-party dependencies via npm albeit using the
  nodejs standard library is fine.
- A blueprint's purpose is to separate a strategy's configuration from its
  business logic. But a blueprint shouldn't implement business logic.
- Blueprints are end to end tested such that neume network users can quickly
  download them to set up their crawl.
- Blueprints are independent steps, they aren't a sequence of steps.
