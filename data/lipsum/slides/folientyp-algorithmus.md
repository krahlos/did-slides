---
layout: code
source: Euklid, Elemente, Buch VII
---
## Folientyp code: Pseudocode

```algo Euklidischer Algorithmus
procedure Euklid(a, b)
    while b != 0 do
        r <- a mod b    ▷ Rest der Division
        a <- b
        b <- r
    end while
    return a           ▷ größter gemeinsamer Teiler
end procedure
```

- Codeblock `algo Titel`, wie `algorithmic` in LaTeX
- Zeilennummern, fette Schlüsselwörter
- `<-` wird ←, `!=` wird ≠
- Schlüsselwörter auch deutsch: *wenn, dann, solange, gib … zurück*

Note:
Musterfolie **Pseudocode**: Die Algorithmen werden pro Vortrag durchnummeriert. Kommentare nach ▷ oder //.
