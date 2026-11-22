---
layout: code
source: Lorem ipsum
---
## Folientyp code: Rust

```rust
use std::collections::HashMap;

/// Zählt, wie oft jedes Wort vorkommt.
fn woerter_zaehlen(text: &str) -> HashMap<&str, usize> {
    let mut anzahl = HashMap::new();
    for wort in text.split_whitespace() {
        *anzahl.entry(wort).or_insert(0) += 1;
    }
    anzahl
}

fn main() {
    let n = woerter_zaehlen("lorem ipsum lorem");
    println!("{:?}", n.get("lorem")); // Some(2)
}
```

Note:
Musterfolie **code** mit ` ```rust `.
