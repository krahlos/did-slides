---
layout: code
source: Lorem ipsum
---
## Folientyp code

```python
def fibonacci(n: int) -> list[int]:
    """Die ersten n Fibonacci-Zahlen."""
    folge = [0, 1]
    while len(folge) < n:
        folge.append(folge[-1] + folge[-2])
    return folge[:n]

print(fibonacci(8))  # [0, 1, 1, 2, 3, 5, 8, 13]
```

- Codeblock mit Sprache, z. B. `python`
- Hervorhebung beim Bauen, kein JavaScript
- Text rechts daneben ist optional

Note:
Musterfolie **code**: der erste ```-Block wird zum Code-Kasten, weiterer Text steht rechts. Sprachen u. a. `bash`, `python`, `cpp`, `rust`.
